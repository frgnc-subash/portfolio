"use client";

import Background from "./background";
import Footer from "./footer";
import Navbar from "./navbar";
import Oneko from "./oneko";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Oneko />
      <div className="min-h-screen flex justify-center w-full">
        <Background />
        <div className="w-full max-w-2xl min-h-screen flex flex-col">
          <div className="relative z-20"><Navbar /></div>
          <main className="grow w-full px-4">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
