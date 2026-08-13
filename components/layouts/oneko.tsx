"use client";

import { useEffect } from "react";
let onekoRequested = false;

export default function Oneko({
  catImage = "/oneko.gif",
  anchorSelector = "#profile-name",
  anchorOffsetX = 20,
}) {
  useEffect(() => {
    if (onekoRequested || document.getElementById("oneko-script")) return;
    onekoRequested = true;

    const script = document.createElement("script");
    script.id = "oneko-script";
    script.src = "/oneko.js";
    script.dataset.cat = catImage; 
    script.dataset.persistPosition = "false";

    const anchor = anchorSelector ? document.querySelector(anchorSelector) : null;
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      const startX = Math.min(Math.max(16, rect.right + anchorOffsetX), Math.max(16, window.innerWidth - 16));
      const startY = Math.min(Math.max(16, rect.top + rect.height / 2), Math.max(16, window.innerHeight - 16));
      script.dataset.startX = String(startX);
      script.dataset.startY = String(startY);
    }

    document.body.appendChild(script);
  }, [catImage, anchorSelector, anchorOffsetX]);

  return null;
}
