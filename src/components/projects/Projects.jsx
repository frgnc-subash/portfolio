import React from "react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      name: "Portfolio Website",
      desc: "My personal portfolio built with React & TailwindCSS.",
    },
    { name: "Todo App", desc: "A simple todo app with Node.js backend." },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white relative overflow-hidden font-pixel">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl mb-6 text-pink-400 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
          🚀 Projects
        </h1>
        <ul className="space-y-4 w-full max-w-lg">
          {projects.map((project, i) => (
            <li
              key={i}
              className="px-4 py-3 border border-pink-400/50 rounded-lg shadow-[0_0_15px_rgba(255,105,180,0.4)] hover:shadow-[0_0_20px_rgba(255,105,180,0.8)] transition-all"
            >
              <div className="text-cyan-300 font-bold">{project.name}</div>
              <div className="text-sm text-gray-400">{project.desc}</div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-5 py-2 bg-pink-400 text-black font-bold rounded-lg shadow-[0_0_10px_rgba(255,105,180,0.7)] hover:shadow-[0_0_15px_rgba(255,105,180,1)] transition"
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

export default Projects;
