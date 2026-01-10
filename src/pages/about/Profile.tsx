import { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";
import myPfp from "../../assets/profile.jpg";

const Profile = () => {
  const [isPfpHovered, setIsPfpHovered] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(now);
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto mb-8 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="shrink-0 relative group cursor-pointer"
          onMouseEnter={() => setIsPfpHovered(true)}
          onMouseLeave={() => setIsPfpHovered(false)}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-100 dark:border-[#323437] shadow-sm transition-transform duration-300 ease-out group-hover:scale-105">
            <img
              src={myPfp}
              alt="Profile"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#080808]" />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-black dark:text-[#e4e4e4] leading-snug truncate">
            Subash Lama
          </h1>

          <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
              Aspiring FullStack
            </span>
            <span className="text-gray-300 dark:text-gray-700 select-none">•</span>
            <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
              UI/UX
            </span>
            <span className="text-gray-300 dark:text-gray-700 select-none">•</span>
            <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
              Linux Enthusiast
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 w-full">
        <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-gray-600 dark:text-gray-400 w-full text-left transition-colors duration-300">
          Building{" "}
          <span
            className={`font-medium transition-colors duration-300 ${
              isPfpHovered ? "text-black dark:text-white" : ""
            }`}
          >
            digital products
          </span>{" "}
          with a focus on{" "}
          <span
            className={`font-medium transition-colors duration-300 ${
              isPfpHovered ? "text-black dark:text-white" : ""
            }`}
          >
            design
          </span>{" "}
          and{" "}
          <span
            className={`font-medium transition-colors duration-300 ${
              isPfpHovered ? "text-black dark:text-white" : ""
            }`}
          >
            performance
          </span>
          . Currently exploring the intersection of{" "}
          <span
            className={`font-medium transition-colors duration-300 ${
              isPfpHovered ? "text-[#58c4dc] dark:text-[#61dafb]" : ""
            }`}
          >
            React
          </span>
          ,{" "}
          <span
            className={`font-medium transition-colors duration-300 ${
              isPfpHovered ? "text-purple-600 dark:text-purple-400" : ""
            }`}
          >
            Graph visualization
          </span>
          , and{" "}
          <span
            className={`font-medium transition-colors duration-300 ${
              isPfpHovered ? "text-black dark:text-white" : ""
            }`}
          >
            minimalist UI
          </span>
          .
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 dark:text-gray-500 pt-1">
          <div className="flex items-center gap-1.5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <MapPin size={12} className="shrink-0" />
            <span>Nepal</span>
          </div>
          
          <span className="hidden sm:inline text-gray-300 dark:text-gray-700 select-none">|</span>
          
          <div className="flex items-center gap-1.5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Clock size={12} className="shrink-0" />
            <span className="tabular-nums">{time}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">(GMT+5:45)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;