import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteShell from "@/components/layouts/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subash Lama Tamang | Full-Stack Developer",
  description: "Portfolio of Subash Lama Tamang, a full-stack developer and UI/UX designer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="min-h-full flex flex-col"><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
