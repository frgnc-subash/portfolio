import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Copy,
  Check,
  ArrowRight,
  Send,
} from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const email = "subash.social357@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const SOCIALS = [
    { icon: Github, href: "https://github.com/frgnc-subash", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/subash-lama-tamang",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <div className="max-w-150 mx-auto py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-4">
          Get in touch
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-[#323437] bg-white dark:bg-[#080808] p-6 transition-all hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-[#1e1e1e]">
                <Mail size={20} className="text-black dark:text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email me directly
                </p>
                <p className="text-black dark:text-[#e4e4e4] font-medium">
                  {email}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#1e1e1e] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#323437]"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-[#323437] bg-white dark:bg-[#080808] hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all duration-300 group"
            >
              <Icon
                size={24}
                className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
              />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                {label}
              </span>
            </a>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#323437] focus:border-black dark:focus:border-[#e4e4e4] outline-none transition-colors text-black dark:text-[#e4e4e4]"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#323437] focus:border-black dark:focus:border-[#e4e4e4] outline-none transition-colors text-black dark:text-[#e4e4e4]"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#323437] focus:border-black dark:focus:border-[#e4e4e4] outline-none transition-colors resize-none text-black dark:text-[#e4e4e4]"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="mt-2 w-full sm:w-auto self-start px-6 py-2.5 rounded-lg bg-black dark:bg-[#e4e4e4] text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "idle" && (
              <>
                Send Message <ArrowRight size={16} />
              </>
            )}
            {status === "sending" && (
              <>
                Sending... <Send size={16} className="animate-pulse" />
              </>
            )}
            {status === "success" && (
              <>
                Sent Successfully <Check size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
