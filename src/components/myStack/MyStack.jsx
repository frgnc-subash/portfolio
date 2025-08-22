import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyStack = () => {
  const navigate = useNavigate();
  const word = "MY STACK";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % word.length);
    }, 300);
    return () => clearInterval(interval);
  }, [word.length]);

  const stackItems = [
    { name: "React", color: "from-cyan-400 to-blue-500", icon: "⚛️" },
    { name: "JavaScript", color: "from-yellow-300 to-orange-500", icon: "🟨" },
    { name: "TailwindCSS", color: "from-teal-400 to-cyan-500", icon: "💨" },
    { name: "Node.js", color: "from-green-400 to-emerald-600", icon: "🟩" },
    { name: "Express", color: "from-gray-400 to-gray-700", icon: "🚂" },
    { name: "TypeScript", color: "from-blue-400 to-indigo-500", icon: "🔷" },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" />

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

      <div className="flex items-center justify-center min-h-[70vh] relative z-10 flex-col gap-6">
        <div className="w-[90%] max-w-4xl bg-black/70 p-6 rounded-lg border border-cyan-400/60 shadow-[0_0_20px_rgba(0,255,255,0.5)]">
          <h2 className="text-cyan-300 font-pixel text-lg mb-6 tracking-wider animate-pulse">
            🛠️ Tech I Use
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {stackItems.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col items-center p-3 rounded-md bg-gradient-to-br ${item.color} shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] transition-all`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <span className="font-pixel text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-cyan-400 text-black font-bold rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.7)] hover:shadow-[0_0_15px_rgba(0,255,255,1)] transition"
        >
          ⬅ Back to Home
        </button>
      </div>

      <style>{`
        @keyframes scrollStars {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default MyStack;
