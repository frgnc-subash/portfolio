import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://subashlamatamang.com.np", 
  "https://www.subashlamatamang.com.np"        
];


app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
    
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || origin === process.env.CLIENT_URL) {
        callback(null, true);
      } else {
        console.error(`CORS Error: The origin ${origin} is not allowed.`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { error: "Too many messages. Please try again later." },
});


const generateEmailHtml = (name, email, message) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">New Message Received</h1>
    </div>
    <div style="padding: 30px; line-height: 1.6; color: #333;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p><strong>Message:</strong></p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">
        ${message}
      </div>
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
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "axosis.social357@gmail.com",
      replyTo: email,
      subject: `New Message from ${name}`,
      html: generateEmailHtml(name, email, message),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, messageId: data.id });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ error: "Something went wrong on our end." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});