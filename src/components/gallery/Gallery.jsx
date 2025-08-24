import React from "react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  const images = [
    "/gallery/at_the_coffeshop.png",
    "/gallery/BirdNord.png",
    "/gallery/gnu-linux.png",
  ];

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white relative overflow-hidden font-pixel">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30 animate-[scrollStars_60s_linear_infinite]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl mb-6 text-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
          Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i}`}
              className="border border-red-400/50 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] transition-all"
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-5 py-2 bg-red-400 text-black font-bold rounded-lg shadow-[0_0_10px_rgba(255,0,0,0.7)] hover:shadow-[0_0_15px_rgba(255,0,0,1)] transition"
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

export default Gallery;
