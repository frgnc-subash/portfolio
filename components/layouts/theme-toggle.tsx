"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
  // Keep the server and first client render identical. Browser preferences are
  // applied only after hydration, when `window` and localStorage are available.
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedTheme = localStorage.getItem("theme");
      const initialTheme =
        savedTheme === "dark" || savedTheme === "light"
          ? savedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

      setTheme(initialTheme);
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isHydrated, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-800 dark:text-[#eeeeee] transition-colors duration-200 cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default Theme;
