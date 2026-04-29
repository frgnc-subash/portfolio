import {
  SiFigma,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNextdotjs,
  SiPrisma,
} from "react-icons/si";

const Stack = () => {
  const tools = [
    { name: "HTML5", icon: <SiHtml5 size={32} />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss3 size={32} />, color: "#1572B6" },
    { name: "JavaScript", icon: <SiJavascript size={32} />, color: "#F7DF1E" },
    { name: "React", icon: <SiReact size={32} />, color: "#61DAFB" },
    { name: "Tailwind", icon: <SiTailwindcss size={32} />, color: "#06B6D4" },
    { name: "Figma", icon: <SiFigma size={32} />, color: "#F24E1E" },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={32} />,
      color: "#111827",
      darkColor: "#f5f5f5",
    },
    {
      name: "Prisma",
      icon: <SiPrisma size={32} />,
      color: "#4C6F8F",
      darkColor: "#8FB7D6",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {tools.map((tool, index) => (
        <div
          key={tool.name}
          className="group relative flex min-h-24 flex-col items-center justify-center overflow-hidden rounded-xl
                     border border-gray-200 bg-white/55 p-4 backdrop-blur-sm
                     transition-[transform,box-shadow,border-color,background-color] duration-500 ease-out
                     animate-in fade-in
                     hover:-translate-y-0.5 hover:border-(--hover-color) hover:bg-white
                     hover:shadow-[0_12px_30px_-26px_var(--hover-color)]
                     dark:border-white/10 dark:bg-white/5 dark:hover:border-(--hover-color-dark) dark:hover:bg-white/[0.06]
                     motion-reduce:animate-none motion-reduce:transform-none cursor-default"
          style={
            {
              "--hover-color": tool.color,
              "--hover-color-dark": tool.darkColor || tool.color,
              animationDelay: `${index * 55}ms`,
            } as React.CSSProperties
          }
        >
          <div className="absolute inset-x-6 top-0 h-px origin-center scale-x-0 bg-(--hover-color) transition-transform duration-500 ease-out group-hover:scale-x-100 dark:bg-(--hover-color-dark)" />

          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 bg-(--hover-color) group-hover:opacity-[0.05] dark:bg-(--hover-color-dark)" />

          <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 shadow-[inset_0_0_0_1px_var(--hover-color)] group-hover:opacity-100 dark:shadow-[inset_0_0_0_1px_var(--hover-color-dark)]" />

          <div className="relative z-10 text-gray-400 transition-[color,transform,filter] duration-500 ease-out group-hover:-translate-y-px group-hover:scale-[1.04] group-hover:text-(--hover-color) dark:text-gray-500 dark:group-hover:text-(--hover-color-dark)">
            {tool.icon}
          </div>

          <span className="relative z-10 mt-3 text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors duration-500 group-hover:text-black dark:group-hover:text-white">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stack;
