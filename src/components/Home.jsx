import React, { useState, useEffect } from "react";
import { Ascii } from "../assets/Ascii";
import Navbar from "./Navbar";
import useSound from "use-sound";
import boopSfx from "../sounds/sounds.wav";

const Home = () => {
  const [animatedAscii, setAnimatedAscii] = useState("");
  const [play] = useSound(boopSfx);

  useEffect(() => {
    if (!Ascii) return;

    const lines = Ascii.split("\n");
    let i = 0;

    const interval = setInterval(() => {
      if (i < lines.length) {
        setAnimatedAscii((prev) => prev + (lines[i] || "") + "\n");
        i++;
      } else {
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-auto p-2 flex flex-col items-center">
        <div className="text-[5px] sm:text-[9px] md:text-[10px] lg:text-[10px] font-bold leading-[1.1] whitespace-pre text-[#00ff00]">
          <pre>{animatedAscii}</pre>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={play}
          className="bg-green-500 text-black font-bold py-[10px] px-4  hover:bg-[#0034dd] transition"
        >
          Click Me !
        </button>
      </div>
    </>
  );
};

export default Home;
