"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FiGithub as Github } from "react-icons/fi";
import { PROJECTS } from "@/data/projectData";
import { SITE_URL, useSeo } from "@/lib/seo";

export default function ProjectsPage() {
  useSeo({
    title: "Projects",
    description: "Selected web development projects by Subash Lama Tamang, including React, Next.js, TypeScript, UI, and interactive portfolio work.",
    path: "/projects",
    jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Projects by Subash Lama Tamang", url: `${SITE_URL}/projects`, hasPart: PROJECTS.map((project) => ({ "@type": "CreativeWork", name: project.title, description: project.description, url: project.link, programmingLanguage: project.tech })) },
  });

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 px-4 sm:px-0"><h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-2">Projects</h1><p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">A collection of tools, applications, and experiments I&apos;ve built.</p></div>
      <div className="grid grid-cols-1 gap-6 px-4 sm:px-0">
        {PROJECTS.map((project) => (
          <article key={project.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm dark:border-[#323437] dark:bg-[#080808] dark:hover:border-gray-600">
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-gray-200 bg-[#111214] dark:border-[#323437]">
              <Image src={project.image ?? "/preview.svg"} alt={`${project.title} project preview`} fill sizes="(max-width: 672px) 100vw, 672px" className="object-contain transition-transform duration-500 group-hover:scale-[1.015]" />
              {!project.image && <div className="absolute inset-0 grid place-items-center bg-[#111214]/80 p-6 text-center"><span className="text-xs font-medium text-white/55">Project preview</span></div>}
              <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} className="absolute inset-0 z-20" />
            </div>
            <div className="p-5"><h2 className="mb-3 text-lg font-bold text-black dark:text-[#e4e4e4]">{project.title}</h2><p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p><div className="flex flex-wrap gap-2">{project.tech.map((technology) => <span key={technology} className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600 dark:border-[#323437] dark:bg-[#1e1e1e] dark:text-gray-300">{technology}</span>)}</div>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.github && (project.sourceDisabled ? <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-400 opacity-60 dark:border-[#3d3f43] dark:text-gray-500"><Github size={16} />Source</span> : <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-[#3d3f43] dark:text-[#e4e4e4] dark:hover:bg-[#1e1e1e]"><Github size={16} />Source</a>)}
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-black px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-[#e4e4e4] dark:text-black">Visit project <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
