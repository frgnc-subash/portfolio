import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

app.set("trust proxy", 1);
app.disable("x-powered-by");

const DEFAULT_CLIENT_ORIGINS = [
  "https://subashlamatamang.com.np",
  "https://www.subashlamatamang.com.np",
  "http://localhost:5173",
];

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME || "Portfolio";
const RECEIVE_EMAIL = process.env.RECEIVE_EMAIL;
const SEND_AUTO_REPLY = process.env.SEND_AUTO_REPLY !== "false";
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const getPositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const SEND_TIMEOUT_MS = getPositiveNumber(process.env.SEND_TIMEOUT_MS, 10000);

const allowedOrigins = new Set(
  (process.env.CLIENT_ORIGINS || DEFAULT_CLIENT_ORIGINS.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has("*") || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "12kb" }));

app.use((err, req, res, next) => {
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Message is too large." });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body." });
  }

  next(err);
});

const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: getPositiveNumber(process.env.CONTACT_RATE_LIMIT_MAX, 8),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again in 15 minutes." },
});

const cleanField = (value, maxLength) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
};

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

const stripHeaderChars = (value) => value.replace(/[\r\n]/g, " ").trim();

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email provider timed out.")), timeoutMs);
    }),
  ]);

const validateContactPayload = (body = {}) => {
  const name = cleanField(body.name, MAX_NAME_LENGTH);
  const email = cleanField(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const message = cleanField(body.message, MAX_MESSAGE_LENGTH);
  const website = cleanField(body.website, 200);

  if (website) {
    return { spam: true };
  }

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { error: "Message must be at least 10 characters." };
  }

  return { value: { name, email, message } };
};

const buildEmails = ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeSubjectName = stripHeaderChars(name).slice(0, MAX_NAME_LENGTH);
  const emails = [
    {
      from: `Portfolio <${SENDER_EMAIL}>`,
      to: RECEIVE_EMAIL,
      reply_to: email,
      subject: `Message from ${safeSubjectName}`,
      text: `New portfolio message\n\nFrom: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="margin-top: 0;">New Message</h2>
          <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${safeMessage}</p>
        </div>
      `,
    },
  ];

  if (SEND_AUTO_REPLY) {
    emails.push({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: email,
      subject: `Received your message, ${safeSubjectName}!`,
      text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nBest regards,\nSubash`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden;">
          <div style="padding: 32px 20px; text-align: center; border-bottom: 1px solid #eaeaea; background-color: #fafafa;">
            <h1 style="font-size: 24px; margin: 0;">${escapeHtml(SENDER_NAME)}</h1>
          </div>
          <div style="padding: 30px;">
            <p>Hi ${safeName},</p>
            <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
            <p>Best regards,<br /><strong>Subash</strong></p>
          </div>
        </div>
      `,
    });
  }

  return emails;
};

app.get("/", (req, res) => res.json({ ok: true, service: "portfolio-api" }));
app.get("/healthz", (req, res) => res.json({ ok: true }));

app.options("/api/send", cors(corsOptions));

app.post("/api/send", contactLimit, async (req, res) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing.");
    return res.status(503).json({ error: "Email service is not configured." });
  }

  if (!SENDER_EMAIL || !RECEIVE_EMAIL) {
    console.error("SENDER_EMAIL or RECEIVE_EMAIL is missing.");
    return res.status(503).json({ error: "Email service is not configured." });
  }

  const validation = validateContactPayload(req.body);

  if (validation.spam) {
    return res.status(200).json({ success: true });
  }

  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const result = await withTimeout(
      resend.batch.send(buildEmails(validation.value)),
      SEND_TIMEOUT_MS
    );

    if (result?.error) throw new Error(result.error.message);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(502).json({ error: "Unable to send message right now." });
  }
});

app.all("/api/send", (req, res) => {
  res.set("Allow", "POST");
  res.status(405).json({ error: "Use POST to send messages." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server listening on port ${PORT}`));
