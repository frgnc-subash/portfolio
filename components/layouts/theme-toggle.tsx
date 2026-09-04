"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    const root = document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-800 dark:text-[#eeeeee] transition-colors duration-200 cursor-pointer"
      aria-label="Toggle Theme"
      suppressHydrationWarning
    >
      {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default Theme;
