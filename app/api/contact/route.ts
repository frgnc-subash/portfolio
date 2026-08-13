import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4_000;
const MAX_BODY_BYTES = 12 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const SUBMISSION_ID_PATTERN = /^[a-zA-Z0-9_-]{8,128}$/;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  submissionId?: unknown;
};

const cleanField = (value: unknown, maxLength: number) =>
  typeof value === "string"
    ? value.trim().replace(/\r\n/g, "\n").slice(0, maxLength)
    : "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

const isRateLimited = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const identifier = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isRateLimited(request)) {
    return Response.json(
      { error: "Too many messages. Please try again in 15 minutes." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = cleanField(body.name, MAX_NAME_LENGTH);
  const email = cleanField(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const message = cleanField(body.message, MAX_MESSAGE_LENGTH);
  const website = cleanField(body.website, 200);
  const submissionId = cleanField(body.submissionId, 128);

  // A filled hidden field indicates a bot. Return success so it cannot tune retries.
  if (website) return Response.json({ success: true });

  if (!name || !email || !message) {
    return Response.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return Response.json(
      { error: "Message must be at least 10 characters." },
      { status: 400 },
    );
  }
  if (!SUBMISSION_ID_PATTERN.test(submissionId)) {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const receiveEmail = process.env.RECEIVE_EMAIL;
  const senderName = process.env.SENDER_NAME || "Subash Lama Tamang";

  if (!apiKey || !senderEmail || !receiveEmail) {
    console.error("Contact email environment variables are not configured.");
    return Response.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeSubjectName = name
    .replace(/[\r\n]/g, " ")
    .slice(0, MAX_NAME_LENGTH);
  const siteUrl = "https://subashlamatamang.com.np";

  const emailShell = (content: string) => `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f5f5f5;color:#171717;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
          ${content}
          <p style="margin:20px 0 0;color:#737373;font-size:12px;line-height:18px;text-align:center;">Sent from the contact form on <a href="${siteUrl}" style="color:#525252;">subashlamatamang.com.np</a></p>
        </div>
      </body>
    </html>`;

  const ownerEmailHtml = emailShell(`
    <div style="overflow:hidden;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;">
      <div style="padding:24px 28px;background:#171717;color:#ffffff;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#bdbdbd;">New enquiry</p>
        <h1 style="margin:0;font-size:25px;line-height:32px;">A visitor sent you a message</h1>
      </div>
      <div style="padding:28px;">
        <p style="margin:0 0 20px;font-size:16px;line-height:24px;"><strong style="color:#171717;">${safeName}</strong> would like to hear from you.</p>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 22px;font-size:14px;line-height:20px;">
          <tr><td style="width:76px;padding:10px 0;border-top:1px solid #e5e5e5;color:#737373;">Name</td><td style="padding:10px 0;border-top:1px solid #e5e5e5;color:#171717;font-weight:600;">${safeName}</td></tr>
          <tr><td style="width:76px;padding:10px 0;border-top:1px solid #e5e5e5;color:#737373;">Email</td><td style="padding:10px 0;border-top:1px solid #e5e5e5;color:#171717;font-weight:600;">${safeEmail}</td></tr>
        </table>
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#737373;">Message</p>
        <div style="padding:16px 18px;border-left:3px solid #171717;background:#f5f5f5;border-radius:0 8px 8px 0;font-size:15px;line-height:24px;">${safeMessage}</div>
        <p style="margin:24px 0 0;color:#525252;font-size:14px;line-height:20px;">Use your email client’s Reply action to respond directly to ${safeName}.</p>
      </div>
    </div>`);

  const autoReplyHtml = emailShell(`
    <div style="overflow:hidden;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;">
      <div style="padding:24px 28px;background:#171717;color:#ffffff;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#bdbdbd;">Message received</p>
        <h1 style="margin:0;font-size:25px;line-height:32px;">Thanks for getting in touch, ${safeName}.</h1>
      </div>
      <div style="padding:28px;font-size:16px;line-height:25px;">
        <p style="margin:0 0 16px;">I’ve received your message and will reply within 1–2 business days.</p>
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#737373;">Your message</p>
        <div style="padding:16px 18px;border-left:3px solid #171717;background:#f5f5f5;border-radius:0 8px 8px 0;">${safeMessage}</div>
        <p style="margin:24px 0 0;">Best regards,<br /><strong>Subash Lama Tamang</strong></p>
      </div>
    </div>`);

  try {
    const { error } = await resend.emails.send(
      {
        from: `${senderName} <${senderEmail}>`,
        to: [receiveEmail],
        replyTo: email,
        subject: `Portfolio message from ${safeSubjectName}`,
        text: `NEW WEBSITE ENQUIRY\n\nFrom: ${name}\nEmail: ${email}\n\nMESSAGE\n${message}\n\nReply directly to this email to respond.`,
        html: ownerEmailHtml,
      },
      { idempotencyKey: `contact-owner-${submissionId}` },
    );

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Contact notification email failed:", error);
    return Response.json(
      { error: "Unable to send your message right now." },
      { status: 502 },
    );
  }

  // This is intentionally best-effort: a failed acknowledgement must not hide a
  // successfully delivered contact message from the visitor.
  if (process.env.SEND_AUTO_REPLY !== "false") {
    const { error } = await resend.emails.send(
      {
        from: `${senderName} <${senderEmail}>`,
        to: [email],
        subject: `Thanks for contacting ${senderName}`,
        text: `Hi ${name},\n\nThanks for getting in touch. I've received your message and will reply within 1–2 business days.\n\nYour message:\n${message}\n\nBest regards,\nSubash Lama Tamang`,
        html: autoReplyHtml,
        headers: {
          "Auto-Submitted": "auto-replied",
          "X-Auto-Response-Suppress": "All",
        },
      },
      { idempotencyKey: `contact-reply-${submissionId}` },
    );

    if (error) console.error("Contact auto-reply failed:", error.message);
  }

  return Response.json({ success: true });
}
