import React from "react";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const navigate = useNavigate();

  const educationList = [
    {
      title: "BSc.(HONS)IT",
      place: "Asia Pacific University",
      year: "2020 - Present",
    },
    {
      title: "High School",
      place: "St. Xavier's School, Jawalakhel",
      year: "2022 - 2024",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white relative overflow-hidden font-pixel">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl mb-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
          Education
        </h1>
        <ul className="space-y-4 text-lg w-full max-w-md">
          {educationList.map((edu, i) => (
            <li
              key={i}
              className="px-4 py-2 border border-yellow-300/50 rounded-lg shadow-[0_0_15px_rgba(255,255,0,0.4)] hover:shadow-[0_0_20px_rgba(255,255,0,0.8)] transition-all"
            >
              <div className="text-cyan-300">{edu.title}</div>
              <div className="text-sm text-gray-400">
                {edu.place} — {edu.year}
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-5 py-2 bg-yellow-300 text-black font-bold rounded-lg shadow-[0_0_10px_rgba(255,255,0,0.7)] hover:shadow-[0_0_15px_rgba(255,255,0,1)] transition"
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

export default Education;
