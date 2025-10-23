import React, { useState, useEffect } from "react";
import { Ascii } from "../assets/Ascii";
import Navbar from "./Navbar";
import useSound from "use-sound";
import boopSfx from "../sounds/click.wav";
import { useSoundContext } from "../contexts/SoundContext";

const Home = () => {
  const [animatedAscii, setAnimatedAscii] = useState("");
  const { soundEnabled } = useSoundContext();
  const [play] = useSound(boopSfx, { soundEnabled: soundEnabled });

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

  useEffect(() => {
    console.log(
      `%c   
      (\\_/) 
      ( •_•) < Secret console club!
     /> 🍪   Here's a cookie for you!
   `,
      "color: #ff69b4; font-size: 18px;"
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="m-2 w-auto p-1 xs:p-2 sm:p-3 flex flex-col items-center overflow-hidden">
        <div className="text-[3.2px] xs:text-[5px] sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] leading-[1.1] whitespace-pre text-[#00ff00]">
          <pre>{animatedAscii}</pre>
        </div>
      </div>
      <div className="flex m-4 flex-col items-center">
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
