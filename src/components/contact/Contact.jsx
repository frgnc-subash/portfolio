import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_iqgtdol", // ✅ Your EmailJS Service ID
        "template_me2igoo", // ✅ Your EmailJS Template ID
        form.current, // ✅ The form reference
        "TejAf9KsgQq23AZU2" // ✅ Your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("✅ Message sent:", result.text);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("❌ Error sending message:", error.text);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white relative overflow-hidden font-pixel">
      {/* Animated star background */}
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl mb-6 text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          📞 Contact
        </h1>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-4 w-80"
        >
          <input
            type="hidden"
            name="to_email"
            value="subash.social357@gmail.com"
          />

          <input
            type="text"
            name="user_name"
            placeholder="Name"
            className="px-3 py-2 border border-green-400/50 bg-black rounded-lg font-sans"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            className="px-3 py-2 border border-green-400/50 bg-black rounded-lg font-sans"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="px-3 py-2 border border-green-400/50 bg-black rounded-lg font-sans"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="px-3 py-2 border border-green-400/50 bg-black rounded-lg font-sans"
            required
          ></textarea>

          <button
            type="submit"
            className="px-4 py-2 border border-green-400/50 rounded-lg hover:bg-green-400 hover:text-black transition-all"
          >
            Send
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-green-400 text-black font-bold rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.7)] hover:shadow-[0_0_15px_rgba(0,255,0,1)] transition"
          >
            ⬅ Back to Home
          </button>
        </form>
      </div>

      <style>{`
        @keyframes scrollStars {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
