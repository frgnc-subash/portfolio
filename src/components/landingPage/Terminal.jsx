import React, { useState, useEffect } from "react";
import { Ascii } from "../../assets/Ascii";
import useSound from "use-sound";
import boopSfx from "../../sounds/click.wav";
import { useSoundContext } from "../../controllers/SoundContext";
import { FaVolumeUp, FaVolumeMute, FaSun, FaMoon } from "react-icons/fa";

const Terminal = () => {
  const [animatedAscii, setAnimatedAscii] = useState("");
  const [input, setInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { soundEnabled, toggleSound } = useSoundContext();
  const [play] = useSound(boopSfx);

  const toggleDarkMode = () => {
    if (soundEnabled) {
      play(); // Play sound when toggling theme
    }
    setDarkMode(!darkMode);
  };

  const handleToggleSound = () => {
    if (!soundEnabled) {
      play(); // Play sound when unmuting
    }
    toggleSound();
  };

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
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleCommand = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTerminalOutput((prev) => [
        ...prev,
        `$ ${input}`,
        `Command received: ${input}`,
      ]);
      setInput("");
    }
  };

  return (
    <div className="m-4 flex justify-center">
      <div
        className={`w-full max-w-[740px] ${
          darkMode
            ? "bg-[#1A1B26] border-[#616161]"
            : "bg-gray-100 border-gray-300"
        } rounded p-2 font-mono ${
          darkMode ? "text-green-400" : "text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={handleToggleSound}
            className={`flex items-center px-2 py-1 transition-all duration-300 rounded text-xs ${
              soundEnabled ? "text-cyan-600 " : "text-gray-500 "
            }`}
          >
            {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button
            onClick={toggleDarkMode}
            className={`flex items-center px-2 py-1 transition-all duration-300 rounded text-xs ${
              darkMode
                ? "text-yellow-400 hover:text-yellow-300"
                : "text-gray-600 hover:text-gray-500"
            }`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="h-48 overflow-auto">
          <div className="flex items-center mb-2">
            <span
              className={`mr-2 ${
                darkMode ? "text-green-400" : "text-gray-800"
              }`}
            >
              $ ./frgnc-subash{" "}
            </span>
          </div>
          <div className="flex justify-center">
            <pre
              className={`text-[2px]/[0.7] sm:text-[4px]/[0.9] md:text-[6px]/[1] lg:text-[9px]/[1] xl:text-[9px] leading-[1.1] whitespace-pre ${
                darkMode ? "text-[#87FF87]" : "text-gray-800"
              }`}
            >
              {animatedAscii}
            </pre>
          </div>
        </div>
        <form onSubmit={handleCommand} className="flex items-center pt-2">
          <span
            className={`mr-2 ${darkMode ? "text-green-400" : "text-gray-800"}`}
          >
            $
          </span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full bg-transparent border-none outline-none text-xs ${
                darkMode ? "text-green-400" : "text-gray-800"
              }`}
              // placeholder="Type a command..."
              style={{ caretColor: "transparent" }}
              autoFocus
              onFocus={(e) =>
                e.target.setSelectionRange(input.length, input.length)
              }
              ref={(input) => input && input.focus()}
            />
            <span
              className={`absolute top-0 w-2 h-3 ${
                darkMode ? "bg-green-400" : "bg-gray-600"
              } ${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-100 pointer-events-none`}
              style={{
                left: `${input.length * 6}px`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
