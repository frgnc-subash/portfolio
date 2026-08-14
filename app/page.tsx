"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileText,
  FolderGit2,
  Layers,
  MapPin,
  Network,
} from "lucide-react";
import {
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { PROJECTS } from "@/data/projectData";
import { BLOG_POSTS } from "@/data/blogData";
import Graph from "@/components/ui/graph";
import { SITE_NAME, SITE_URL, useSeo } from "@/lib/seo";

function Profile() {
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
    <div className="w-full max-w-2xl mx-auto mb-8 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="shrink-0 relative group cursor-pointer"
          onMouseEnter={() => setIsPfpHovered(true)}
          onMouseLeave={() => setIsPfpHovered(false)}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-100 dark:border-[#323437] shadow-sm transition-transform duration-300 ease-out group-hover:scale-105">
            <Image
              src="/profile.png"
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#080808]" />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h1
            id="profile-name"
            className="text-lg sm:text-2xl font-bold tracking-tight text-black dark:text-[#e4e4e4] leading-snug truncate"
          >
            Subash Lama Tamang
          </h1>

          <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
              FullStack
            </span>
            <span className="text-gray-300 dark:text-gray-700 select-none">
              •
            </span>
            <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
              UI/UX Designer
            </span>
            <span className="text-gray-300 dark:text-gray-700 select-none">
              •
            </span>
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

          <span className="hidden sm:inline text-gray-300 dark:text-gray-700 select-none">
            |
          </span>

          <div className="flex items-center gap-1.5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Clock size={12} className="shrink-0" />
            <span className="tabular-nums">{time}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              (GMT+5:45)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IndicatorStyle {
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
}

function RecentCards() {
  const recentProjects = PROJECTS.slice(0, 3);
  const recentBlogs = BLOG_POSTS.slice(0, 3);
  const glassTitle =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]";

  // --- Projects hover indicator ---
  const projectsListRef = useRef<HTMLDivElement>(null);
  const [projectIndicator, setProjectIndicator] = useState<IndicatorStyle>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const moveProjectIndicator = useCallback((element: HTMLElement) => {
    setProjectIndicator({
      top: element.offsetTop,
      left: element.offsetLeft,
      width: element.offsetWidth,
      height: element.offsetHeight,
      opacity: 1,
    });
  }, []);

  const resetProjectIndicator = useCallback(() => {
    setProjectIndicator((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  // --- Blog hover indicator ---
  const blogsListRef = useRef<HTMLDivElement>(null);
  const [blogIndicator, setBlogIndicator] = useState<IndicatorStyle>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const moveBlogIndicator = useCallback((element: HTMLElement) => {
    setBlogIndicator({
      top: element.offsetTop,
      left: element.offsetLeft,
      width: element.offsetWidth,
      height: element.offsetHeight,
      opacity: 1,
    });
  }, []);

  const resetBlogIndicator = useCallback(() => {
    setBlogIndicator((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <div className={glassTitle}>
            <FolderGit2 size={12} />
            Selected Projects
          </div>
        </div>
        <div
          ref={projectsListRef}
          onMouseLeave={resetProjectIndicator}
          className="relative grid grid-cols-1 gap-2"
        >
          <div
            className="absolute z-0 rounded-lg bg-slate-100 shadow-sm dark:bg-[#1e1e1e] dark:shadow-none transition-all duration-300 delay-32 ease-in-out"
            style={{
              top: `${projectIndicator.top}px`,
              left: `${projectIndicator.left}px`,
              width: `${projectIndicator.width}px`,
              height: `${projectIndicator.height}px`,
              opacity: projectIndicator.opacity,
            }}
            aria-hidden="true"
          />
          {recentProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={(e) => moveProjectIndicator(e.currentTarget)}
              className="group relative z-10 flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-colors w-full sm:w-fit"
            >
              <div className="flex flex-col gap-0.5 min-w-0 w-full">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                  {project.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {project.description}
                </span>
              </div>
            </a>
          ))}
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors self-start ml-2.5 sm:ml-3 group"
        >
          View more projects
          <ArrowRight
            size={12}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <div className={glassTitle}>
            <FileText size={12} />
            Recent Writing
          </div>
        </div>
        <div
          ref={blogsListRef}
          onMouseLeave={resetBlogIndicator}
          className="relative grid grid-cols-1 gap-2"
        >
          <div
            className="absolute z-0 rounded-lg bg-slate-100 shadow-sm dark:bg-[#1e1e1e] dark:shadow-none transition-all duration-300 delay-32 ease-in-out"
            style={{
              top: `${blogIndicator.top}px`,
              left: `${blogIndicator.left}px`,
              width: `${blogIndicator.width}px`,
              height: `${blogIndicator.height}px`,
              opacity: blogIndicator.opacity,
            }}
            aria-hidden="true"
          />
          {recentBlogs.map((post) => (
            <Link
              key={post.id}
              href={post.slug}
              onMouseEnter={(e) => moveBlogIndicator(e.currentTarget)}
              className="group relative z-10 flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-colors w-full sm:w-fit"
            >
              <div className="flex flex-col gap-0.5 min-w-0 w-full">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                  {post.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors self-start ml-2.5 sm:ml-3 group"
        >
          See more articles
          <ArrowRight
            size={12}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}

function Stack() {
  const tools = [
    { name: "HTML5", icon: <SiHtml5 size={32} />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss size={32} />, color: "#1572B6" },
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
}

export default function HomePage() {
  useSeo({
    title: "Full-Stack Developer Portfolio",
    description:
      "Portfolio of Subash Lama Tamang, a full-stack developer and UI/UX designer building React, Next.js, and TypeScript web experiences.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Full-Stack Developer",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "UI/UX Design",
        "Frontend Development",
      ],
      sameAs: [
        "https://github.com/frgnc-subash",
        "https://linkedin.com/in/subash-lama-tamang",
        "https://instagram.com/frgnc.subash",
        "https://facebook.com/frgnc.subash",
      ],
    },
  });

  const glassTitle =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]";

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-14">
      <Profile />

      <section className="w-full flex flex-col gap-0">
        <div>
          <div className={glassTitle}>
            <Layers size={12} />
            Tech Stack
          </div>
        </div>
        <Stack />
      </section>

      <section className="w-full flex flex-col gap-6">
        <div>
          <div className={glassTitle}>
            <Network size={12} />
            Navigation Map
          </div>
        </div>
        <Graph />
      </section>

      <section className="w-full">
        <RecentCards />
      </section>
    </div>
  );
}
