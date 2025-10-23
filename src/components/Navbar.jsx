import React from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import boopSfx from "../sounds/click.wav";
import { useSoundContext } from "../contexts/SoundContext";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Navbar = () => {
  const { soundEnabled, toggleSound } = useSoundContext();
  const [play] = useSound(boopSfx);
  
  const handleToggleSound = () => {
    if (!soundEnabled) {
      play(); // Play sound when unmuting
    }
    toggleSound();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={handleToggleSound}
          className={`max-w-8 items-center px-2 transition-colors py-1 ${
            soundEnabled
              ? "bg-amber-300 hover:bg-blue-600"
              : "bg-gray-400 hover:bg-gray-600"
          }`}
        >
          {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      </div>
      <div className="flex flex-col items-center p-4 pb-0 w-full text-[10px] sm:text-[12px] md:text-[14px] font-semibold">
        <div className="flex justify-between w-full max-w-[740px]">
          <Link
            to="/"
            onClick={play}
            className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
          >
            home
          </Link>
          <div className="flex justify-around">
            <Link
              to="/myStack"
              onClick={play}
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              stack
            </Link>
            <Link
              to="/education"
              onClick={play}
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              education
            </Link>
            <Link
              to="/projects"
              onClick={play}
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              projects
            </Link>
            <Link
              to="/contact"
              onClick={play}
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              contact
            </Link>
          </div>
        </div>
        <hr className="text-amber-100 w-full border-t max-w-[740px] h-0.5 " />
      </div>
    </>
  );
};

export default Navbar;
