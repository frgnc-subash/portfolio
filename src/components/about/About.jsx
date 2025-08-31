import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white font-pixel relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" />

      <div className="flex justify-center pt-12 relative z-10">
        <h1 className="text-4xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
          ABOUT <span className="text-yellow-300">ME</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-12 px-6 relative z-10">
        <div className="w-40 h-40 rounded-full border-4 border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.7)] overflow-hidden">
          <img
            src="/profile-pfp.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-lg text-center md:text-left space-y-4">
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            Hey there! I’m <span className="text-cyan-300 font-bold">Subash</span>.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            Creating a world with pixels.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            Based in Nepal
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {["JavaScript", "React", "Bash", "Node.js", "Figma", "Git"].map(
              (skill, idx) => (
                <span
                  key={idx}
                  className="bg-black/50 border border-cyan-400/60 px-3 py-1 text-xs rounded shadow-[0_0_8px_rgba(0,255,255,0.5)] hover:shadow-[0_0_12px_rgba(0,255,255,0.8)] transition"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-cyan-500 text-black font-bold rounded shadow-[0_0_10px_rgba(0,255,255,0.7)] hover:shadow-[0_0_15px_rgba(0,255,255,1)] transition"
          >
            ⬅ Back to Home
          </button>
        </div>
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

export default About;
