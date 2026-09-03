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
  Sparkles,
} from "lucide-react";
import {
  SiCss,
  SiFigma,
  SiGithub,
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
import GithubContributions from "@/components/ui/github-contributions";
import { SITE_NAME, SITE_URL, useSeo } from "@/lib/seo";

function PfpImage({
  className,
  imgClassName,
  size,
}: {
  className?: string;
  imgClassName?: string;
  size: number;
}) {
  return (
    <div className={className}>
      <Image
        src="/profile.png"
        alt="Profile"
        width={size}
        height={size}
        className={imgClassName}
      />
    </div>
  );
}

function PolaroidPfp({
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <div
      className="hidden sm:block shrink-0 group cursor-pointer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div
        className={`w-52 rounded-sm border border-gray-200 bg-white p-2 pb-4 shadow-lg shadow-black/10 transition-transform duration-300 ease-out dark:border-[#323437] dark:bg-[#111113] dark:shadow-black/50 ${isHovered ? "-translate-y-1 rotate-0" : "rotate-[-4deg]"
          }`}
      >
        <PfpImage
          size={208}
          className="aspect-square w-full overflow-hidden rounded-[2px] bg-gray-100 dark:bg-white/5"
          imgClassName={`w-full h-full object-cover grayscale transition-all duration-500 ease-in-out ${isHovered ? "grayscale-0" : ""}`}
        />
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
          <span className="text-[10px] font-semibold tracking-wide text-gray-700 dark:text-gray-300">
            status: online
          </span>
        </div>
      </div>
    </div>
  );
}

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

  const nameTagline = (
    <>
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
        <span className="text-gray-300 dark:text-gray-700 select-none">•</span>
        <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
          UI/UX Designer
        </span>
        <span className="text-gray-300 dark:text-gray-700 select-none">•</span>
        <span className="font-medium hover:text-black dark:hover:text-gray-200 transition-colors">
          Linux Enthusiast
        </span>
      </div>
    </>
  );

  const metaRow = (
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
        <span className="font-mono tabular-nums">{time}</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
          (GMT+5:45)
        </span>
      </div>
    </div>
  );

  const bioParagraph = (
    <p
      style={{ fontFamily: "'Iosevka', monospace" }}
      className="text-base sm:text-lg font-normal leading-relaxed text-gray-600 dark:text-gray-400 w-full text-left"
    >
      I'm Subash and I have my alias as{" "}
      <strong className="font-semibold text-black dark: text-white">
        axosis
      </strong>
      . I am an undegrad aspiring Web Developer and Software Engineer.
      I develop web-apps, widgets and explore the beauty of Linux.
    </p>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 transition-colors duration-300">
      <div className="sm:hidden">
        <div className="flex items-center gap-4 mb-5">
          <div
            className="shrink-0 relative group cursor-pointer"
            onMouseEnter={() => setIsPfpHovered(true)}
            onMouseLeave={() => setIsPfpHovered(false)}
          >
            <PfpImage
              size={80}
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 dark:border-[#323437] shadow-sm transition-transform duration-300 ease-out group-hover:scale-105"
              imgClassName="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#080808]" />
          </div>

          <div className="flex flex-col justify-center min-w-0">
            {nameTagline}
          </div>
        </div>

        <div className="space-y-3 w-full">
          {bioParagraph}
          {metaRow}
        </div>
      </div>

      <div className="hidden sm:flex sm:items-start sm:gap-8">
        <PolaroidPfp
          isHovered={isPfpHovered}
          onHoverStart={() => setIsPfpHovered(true)}
          onHoverEnd={() => setIsPfpHovered(false)}
        />

        <div className="flex-1 min-w-0 space-y-3">
          <div>{nameTagline}</div>
          {bioParagraph}
          {metaRow}
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
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={(e) => moveProjectIndicator(e.currentTarget)}
              className="group relative z-10 flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-colors w-full sm:w-fit sm:max-w-full"
            >
              <div className="flex flex-col gap-0.5 min-w-0 w-full">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                  {project.title}
                </span>
                <span
                  style={{ fontFamily: "'Iosevka', monospace" }}
                  className="text-sm text-gray-500 dark:text-gray-400 truncate"
                >
                  {project.description}
                </span>
              </div>
            </Link>
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
              className="group relative z-10 flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-colors w-full sm:w-fit sm:max-w-full"
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

function TechPills() {
  const tools = [
    { name: "HTML5", icon: <SiHtml5 size={14} />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss size={14} />, color: "#1572B6" },
    { name: "JavaScript", icon: <SiJavascript size={14} />, color: "#F7DF1E" },
    { name: "React", icon: <SiReact size={14} />, color: "#61DAFB" },
    { name: "Tailwind", icon: <SiTailwindcss size={14} />, color: "#06B6D4" },
    { name: "Figma", icon: <SiFigma size={14} />, color: "#F24E1E" },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={14} />,
      color: "#111827",
      darkColor: "#f5f5f5",
    },
    {
      name: "Prisma",
      icon: <SiPrisma size={14} />,
      color: "#4C6F8F",
      darkColor: "#8FB7D6",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {tools.map((tool) => (
        <span
          key={tool.name}
          className="inline-flex items-center gap-2 rounded-md bg-gray-50 py-1.5 pl-1.5 pr-2.5 text-xs font-medium text-gray-700 dark:bg-white/[0.04] dark:text-gray-300"
          style={
            {
              "--tool-color": tool.color,
              "--tool-color-dark": tool.darkColor || tool.color,
            } as React.CSSProperties
          }
        >
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-gray-100 text-(--tool-color) dark:bg-white/10 dark:text-(--tool-color-dark)">
            {tool.icon}
          </span>
          {tool.name}
        </span>
      ))}
    </div>
  );
}

function AboutHighlights() {
  const glassTitle =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]";
  const cardClass =
    "rounded-lg border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] p-4 sm:p-5";

  return (
    <div>
      <div>
        <div className={glassTitle}>
          <Sparkles size={12} />
          Brief
        </div>
      </div>
      <div className={`${cardClass} mt-4`}>
        <p
          style={{ fontFamily: "'Iosevka', monospace" }}
          className="text-sm font-semibold leading-relaxed text-gray-600 dark:text-gray-400"
        >
          I am deeply interested in full-stack development and building software that just works. When I'm not writing code for web applications or widgets, you'll probably find me customizing my Linux environment. I enjoy working with open-source tools, learning about system architecture, and crafting minimal, distraction-free desktop setups.
        </p>
      </div>
    </div>
  );
}

function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-1 text-gray-500 select-none dark:text-gray-400">
      <svg width="0" height="0" aria-hidden="true">
        <filter id="underwater-wobble">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.03"
            numOctaves="2"
            seed="3"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              dur="7s"
              values="0.008 0.025;0.014 0.035;0.008 0.025"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="4" />
        </filter>
      </svg>

      <svg
        width="76"
        height="92"
        viewBox="0 0 90 110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="self-start ml-4 sm:ml-12"
        aria-hidden="true"
      >
        <path d="M22 8 C 20 50, 40 80, 75 90" />
        <path d="M60 75 L75 90 L55 105" />
      </svg>

      <div className="flex items-center gap-3 -mt-2">
        <span
          style={{
            fontFamily: "var(--font-handwriting)",
            filter: "url(#underwater-wobble)",
          }}
          className="-rotate-1 text-2xl sm:text-3xl leading-tight text-center"
        >
          Pssst...
          <br />
          there&apos;s more.
        </span>
      </div>
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
    <div className="max-w-2xl mx-auto py-8 sm:py-12">
      <section className="w-full flex flex-col pt-4 sm:pt-6 min-h-[calc(100vh-260px)] sm:min-h-[calc(100vh-160px)]">
        <Profile />
        <div className="mt-8 sm:mt-12">
          <ScrollHint />
        </div>
      </section>

      <section className="w-full flex flex-col gap-6 mt-4 sm:mt-6">
        <AboutHighlights />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col gap-4">
            <div>
              <div className={glassTitle}>
                <Layers size={12} />
                Tech Stack
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center rounded-lg border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] p-4 sm:p-5">
              <TechPills />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className={glassTitle}>
                <SiGithub size={12} />
                GitHub Activity
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <GithubContributions />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className={glassTitle}>
              <Network size={12} />
              Navigation Map
            </div>
          </div>
          <Graph />
        </div>
      </section>

      <section className="w-full mt-14">
        <RecentCards />
      </section>
    </div>
  );
}
