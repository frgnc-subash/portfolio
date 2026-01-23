import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Copy,
  Check,
  ArrowRight,
  Send,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const email = "axosis.social357@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // NOTE: Point this to your Express server URL
      const response = await fetch("http://localhost:5000/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        // Return to idle after 3 seconds so user can send another if needed
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        console.error("Server Error:", data.error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const SOCIALS = [
    {
      icon: Github,
      href: "https://github.com/frgnc-subash",
      label: "GitHub",
      handle: "@frgnc-subash",
      color: "group-hover:text-black dark:group-hover:text-white",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/subash-lama-tamang",
      label: "LinkedIn",
      handle: "/in/subash-lama-tamang",
      color: "group-hover:text-[#0077b5]",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/frgnc.subash",
      label: "Instagram",
      handle: "@frgnc.subash",
      color: "group-hover:text-[#E4405F]",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/frgnc.subash",
      label: "Facebook",
      handle: "Subash Lama",
      color: "group-hover:text-[#1877F2]",
    },
  ];

  return (
    <div className="max-w-150 mx-auto py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-3 flex items-center gap-2">
          Let's Connect{" "}
          <Sparkles size={20} className="text-yellow-500 animate-pulse" />
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
          Whether you have a project in mind, a question about my work, or just
          want to say hi — I'm always ready to chat.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-[#323437] bg-gray-50/50 dark:bg-[#080808] p-1">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-white dark:bg-[#0c0c0c] border border-gray-100 dark:border-[#1e1e1e]">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-[#1e1e1e] shrink-0">
                <Mail size={20} className="text-gray-700 dark:text-gray-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Mail me at
                </span>
                <span className="text-sm sm:text-base font-medium text-black dark:text-[#e4e4e4] break-all">
                  {email}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black dark:bg-[#e4e4e4] text-white dark:text-black hover:opacity-90 transition-all text-xs font-semibold w-full sm:w-auto justify-center"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "COPIED" : "COPY EMAIL"}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            Social Platforms
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {SOCIALS.map(({ icon: Icon, href, label, handle, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-[#323437] bg-white dark:bg-[#080808] hover:bg-gray-50 dark:hover:bg-[#1e1e1e] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#1e1e1e] group-hover:bg-white dark:group-hover:bg-black transition-colors border border-transparent group-hover:border-gray-200 dark:group-hover:border-[#323437]">
                    <Icon
                      size={20}
                      className={`text-gray-500 dark:text-gray-400 transition-colors duration-300 ${color}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black dark:text-[#e4e4e4]">
                      {label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            Send a message
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#323437] focus:border-black dark:focus:border-[#e4e4e4] focus:ring-1 focus:ring-black dark:focus:ring-[#e4e4e4] outline-none transition-all text-sm text-black dark:text-[#e4e4e4] placeholder:text-gray-400"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#323437] focus:border-black dark:focus:border-[#e4e4e4] focus:ring-1 focus:ring-black dark:focus:ring-[#e4e4e4] outline-none transition-all text-sm text-black dark:text-[#e4e4e4] placeholder:text-gray-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#323437] focus:border-black dark:focus:border-[#e4e4e4] focus:ring-1 focus:ring-black dark:focus:ring-[#e4e4e4] outline-none transition-all resize-none text-sm text-black dark:text-[#e4e4e4] placeholder:text-gray-400"
                placeholder="How can I help you?"
              />
            </div>

            <div className="flex items-center justify-end gap-4 mt-2">
              {status === "error" && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> Failed to send
                </span>
              )}
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="px-8 py-3 rounded-lg bg-black dark:bg-[#e4e4e4] text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-black/5 dark:shadow-white/5"
              >
                {status === "idle" && (
                  <>
                    Send Message <ArrowRight size={16} />
                  </>
                )}
                {status === "error" && (
                  <>
                    Try Again <ArrowRight size={16} />
                  </>
                )}
                {status === "sending" && (
                  <>
                    Sending... <Send size={16} className="animate-pulse" />
                  </>
                )}
                {status === "success" && (
                  <>
                    Sent! <Check size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;