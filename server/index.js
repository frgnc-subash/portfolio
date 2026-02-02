import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages. Please try again later." },
});

const ADMIN_EMAIL_TEMPLATE = (name, email, message) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #000; color: #fff; padding: 24px; text-align: center;">
      <h1 style="margin: 0; font-size: 20px;">Portfolio Inquiry</h1>
    </div>
    <div style="padding: 30px; line-height: 1.6; color: #333;">
      <p><strong>From:</strong> ${name} (${email})</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p><strong>Message:</strong></p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #000;">
        ${message}
      </div>
    </div>
  </div>
`;

const AUTO_REPLY_TEMPLATE = (name) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #0c0c0c; color: #fff; padding: 40px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">SUBASH LAMA TAMANG</h1>
    </div>
    <div style="padding: 40px; line-height: 1.6; color: #333;">
      <h2 style="color: #000;">Hi ${name},</h2>
      <p>Thank you for reaching out! This is an automated confirmation to let you know that I have received your message.</p>
      <p>I usually review my emails daily and will get back to you as soon as possible (typically within 24-48 hours).</p>
      <p>In the meantime, feel free to check out my latest work on GitHub or connect with me on LinkedIn.</p>
      <br />
      <p style="margin: 0;">Best Regards,</p>
      <p style="font-weight: bold; margin: 0; color: #000;">Subash Lama Tamang</p>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 12px; color: #666;">
      This is an automated reply. No need to respond to this email.
    </div>
  </div>
`;

app.get("/", (req, res) => res.send("Portfolio API is running..."));

app.post("/api/send", contactLimit, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const { data, error } = await resend.batch.send([
      {
        from: "Portfolio <onboarding@resend.dev>",
        to: "axosis.social357@gmail.com",
        replyTo: email,
        subject: `🚀 New Message from ${name}`,
        html: ADMIN_EMAIL_TEMPLATE(name, email, message),
      },
      {
        from: "Subash Lama Tamang <onboarding@resend.dev>",
        to: email,
        subject: `Thank you for your message, ${name}!`,
        html: AUTO_REPLY_TEMPLATE(name),
      },
    ]);

    if (error) {
      console.error("Resend Error:", error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Internal Error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
