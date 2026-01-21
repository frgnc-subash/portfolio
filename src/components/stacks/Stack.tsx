import { FaJava } from "react-icons/fa";
import {
  SiFigma,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";

const Stack = () => {
  const tools = [
    { name: "HTML5", icon: <SiHtml5 size={32} />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss3 size={32} />, color: "#1572B6" },
    { name: "JavaScript", icon: <SiJavascript size={32} />, color: "#F7DF1E" },
    { name: "React", icon: <SiReact size={32} />, color: "#61DAFB" },
    { name: "Tailwind", icon: <SiTailwindcss size={32} />, color: "#06B6D4" },
    { name: "Figma", icon: <SiFigma size={32} />, color: "#F24E1E" },
    { name: "Java", icon: <FaJava size={32} />, color: "#5382a1" },
    { name: "MongoDB", icon: <SiNodedotjs size={32} />, color: "#47A248" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="group relative flex flex-col items-center justify-center p-4 rounded-xl 
                     bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10
                     backdrop-blur-sm transition-all duration-300 ease-out
                     hover:-translate-y-1 hover:border-transparent
                     cursor-default overflow-hidden"
          style={
            {
              "--hover-color": tool.color,
            } as React.CSSProperties
          }
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-(--hover-color)" />

          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_0_1px_var(--hover-color)]" />

          <div className="relative z-10 text-gray-400 dark:text-gray-500 group-hover:text-(--hover-color) transition-colors duration-300 transform group-hover:scale-110">
            {tool.icon}
          </div>

          <span className="relative z-10 mt-3 text-xs font-bold tracking-widest text-gray-500 uppercase group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stack;
