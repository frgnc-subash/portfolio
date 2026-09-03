import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat } from "next/font/google";
import "@fontsource/iosevka/400.css";
import "@fontsource/iosevka/500.css";
import SiteShell from "@/components/layouts/site-shell";
import "./globals.css";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Subash Lama Tamang | Full-Stack Developer",
  description:
    "Portfolio of Subash Lama Tamang, a full-stack developer and UI/UX designer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full ${handwriting.variable}`}>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
