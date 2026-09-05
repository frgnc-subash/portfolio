import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Roboto_Condensed } from "next/font/google";
import SiteShell from "@/components/layouts/site-shell";
import "./globals.css";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-handwriting",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "Subash Lama Tamang | Full-Stack Developer",
  description:
    "Portfolio of Subash Lama Tamang, a full-stack developer and UI/UX designer.",
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full ${handwriting.variable} ${robotoCondensed.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
