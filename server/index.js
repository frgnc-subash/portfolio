import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.set("trust proxy", 1);

const SENDER_EMAIL = "info@subashlamatamang.com.np";
const MY_RECEIVE_EMAIL = "axosis.social357@gmail.com";

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "*" }));

const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again in 15 minutes." },
});

app.get("/", (req, res) => res.send("Portfolio API is running..."));

// ADDED THIS: Now visiting the link in browser won't show 404, it will tell you to use POST
app.get("/api/send", (req, res) => {
  res.status(405).send("Route exists, but please use POST method to send messages.");
});

app.post("/api/send", contactLimit, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const data = await resend.batch.send([
      {
        from: `Portfolio <${SENDER_EMAIL}>`,
        to: MY_RECEIVE_EMAIL,
        reply_to: email,
        subject: `📬 Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2>New Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
        `,
      },
      {
        from: `Subash Lama Tamang <${SENDER_EMAIL}>`,
        to: email,
        subject: `Received your message, ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden;">
            <div style="padding: 40px 20px; text-align: center; border-bottom: 1px solid #eaeaea; background-color: #fafafa;">
              <h1 style="font-size: 24px; margin: 0;">Subash Lama Tamang</h1>
            </div>
            <div style="padding: 30px;">
              <p>Hi ${name},</p>
              <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
              <p>Best regards,<br /><strong>Subash</strong></p>
            </div>
          </div>
        `,
      },
    ]);

    if (data.error) throw new Error(data.error.message);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server listening on port ${PORT}`));
