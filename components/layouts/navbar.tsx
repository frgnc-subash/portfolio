"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const navLinks = [
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const isActive = (href: string) => pathname === href || (href === "/blog" && pathname.startsWith("/blog/"));

  const moveIndicator = useCallback((element: HTMLElement) => {
    setIndicatorStyle({ left: element.offsetLeft, width: element.offsetWidth, opacity: 1 });
  }, []);

  const resetIndicator = useCallback(() => {
    const activeLink = listRef.current?.querySelector<HTMLElement>(".active-link");
    if (activeLink) moveIndicator(activeLink);
    else setIndicatorStyle((previous) => ({ ...previous, opacity: 0 }));
  }, [moveIndicator]);

  useEffect(() => {
    resetIndicator();
    window.addEventListener("resize", resetIndicator);
    return () => window.removeEventListener("resize", resetIndicator);
  }, [pathname, resetIndicator]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const desktopLinkClass = (href: string) =>
    `block px-4 py-2 font-semibold transition-colors duration-200 ${
      isActive(href)
        ? "active-link text-black dark:text-(--accent-active) font-bold"
        : "text-gray-600 dark:text-(--text-secondary) hover:text-black dark:hover:text-[#e4e4e4]"
    }`;

  return (
    <nav className="relative flex items-center justify-between w-full max-w-2xl mx-auto px-4 py-4 sm:py-6 bg-transparent z-50">
      <Link href="/" className="group shrink-0 relative z-20">
        <Image src="/light.png" alt="Logo" width={96} height={24} className="h-5 sm:h-6 w-auto block dark:hidden" />
        <Image src="/dark.png" alt="Logo" width={96} height={24} className="h-5 sm:h-6 w-auto hidden dark:block" />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <ul ref={listRef} className="relative hidden sm:flex items-center bg-transparent" onMouseLeave={resetIndicator}>
          <li
            className="absolute top-0 bottom-0 rounded bg-gray-200 dark:bg-[#1e1e1e] transition-all duration-300 ease-in-out -z-10"
            style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px`, opacity: indicatorStyle.opacity }}
            aria-hidden="true"
          />
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onMouseEnter={(event) => moveIndicator(event.currentTarget)} className={desktopLinkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e1e1e] rounded-md transition-colors" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-navigation">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setIsOpen(false)} aria-hidden="true" />

      <div id="mobile-navigation" className={`fixed left-0 top-0 z-50 h-dvh w-72 max-w-[82vw] border-r border-gray-200 bg-white/95 px-6 py-5 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-out dark:border-[#323437] dark:bg-[#080808]/95 sm:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="shrink-0" onClick={() => setIsOpen(false)}>
            <Image src="/light.png" alt="Logo" width={80} height={20} className="h-5 w-auto block dark:hidden" />
            <Image src="/dark.png" alt="Logo" width={80} height={20} className="h-5 w-auto hidden dark:block" />
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-1 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1e1e1e] rounded-md" aria-label="Close menu"><X size={24} /></button>
        </div>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`rounded-md px-3 py-3 text-base font-semibold transition-colors duration-200 ${isActive(link.href) ? "bg-gray-100 text-black dark:bg-[#1e1e1e] dark:text-(--accent-active) font-bold" : "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-(--text-secondary) dark:hover:bg-[#1e1e1e] dark:hover:text-[#e4e4e4]"}`}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
