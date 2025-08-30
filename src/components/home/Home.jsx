import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WeatherBoard from "../weatherCast/WeatherBoard";

const Home = () => {
  const word = "subash";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % word.length);
    }, 800);
    return () => clearInterval(interval);
  }, [word.length]);

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white relative overflow-hidden">
    
      {/* <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" /> */}

      <div className="flex justify-center py-6 relative z-10">
        <header className="text-4xl font-bold flex gap-1 font-pixel">
          {word.split("").map((char, index) => (
            <span
              key={index}
              className={`px-1 transition-all duration-200 ${
                index === activeIndex
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-yellow-300 shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                  : ""
              }`}
            >
              {char}
            </span>
          ))}
        </header>
      </div>

      <div className="flex items-center justify-center min-h-[80vh] relative z-10">
        <div className="w-56 p-4 bg-black border border-cyan-400/60 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-shadow">
          <div className="flex items-center gap-2 mb-4 animate-pulse">
            <span className="text-yellow-300 drop-shadow-[0_0_5px_rgba(255,255,0,0.8)]">
              ⭐
            </span>
            <span className="font-pixel text-cyan-300 text-lg tracking-widest drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
              STARS
            </span>
          </div>

          <ul className="space-y-2 font-pixel text-white text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About me" },
              { to: "/myStack", label: "My Stack" },
              { to: "/education", label: "Education" },
              { to: "/projects", label: "Projects" },
              {
                to: "/gallery",
                label: (
                  <>
                    Gallery <span className="text-red-500">(❗)</span>
                  </>
                ),
              },
              { to: "/contact", label: "Contact" },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.9)] transition-all"
              >
                <span>☆</span>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tailwind custom animation keyframes */}
      <style>{`
        @keyframes scrollStars {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
      <WeatherBoard />
    </div>
  );
};

export default Home;
