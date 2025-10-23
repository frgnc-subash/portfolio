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
      <div className="flex flex-col items-center p-2 pb-0 xs:p-3 xs:pb-0 sm:p-4 sm:pb-0 w-full text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-semibold">
        <div className="flex justify-between w-full max-w-[740px]">
          <Link
            to="/"
            onClick={play}
            className="text-yellow-200 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
          >
            home
          </Link>
          <div className="flex justify-around">
            <Link
              to="/myStack"
              onClick={play}
              className="text-yellow-200 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              stack
            </Link>
            <Link
              to="/education"
              onClick={play}
              className="text-yellow-200 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              education
            </Link>
            <Link
              to="/projects"
              onClick={play}
              className="text-yellow-200 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              projects
            </Link>
<Link
              to="/contact"
              onClick={play}
              className="text-yellow-200 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
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
