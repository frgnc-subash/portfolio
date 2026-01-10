import { ArrowUpRight, Github, FolderGit2, Star } from "lucide-react";

// Placeholder images - replace with your actual project screenshots
// import project1 from "../../assets/project1.png";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  image?: string; // Optional image for featured projects
  isFeatured?: boolean;
  stars?: number;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Obsidian Graph Portfolio",
    description:
      "A minimalist personal portfolio featuring an interactive force-directed graph for navigation, built with React and D3.js.",
    tech: ["React", "TypeScript", "D3.js", "Tailwind"],
    link: "https://example.com",
    github: "https://github.com",
    isFeatured: true,
    // image: project1
  },
  {
    id: "2",
    title: "E-Commerce Dashboard",
    description:
      "Full-stack analytics dashboard for online stores with real-time data visualization and inventory management.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Recharts"],
    link: "https://example.com",
    github: "https://github.com",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Taskify CLI",
    description:
      "A Rust-based command line tool for managing daily tasks and productivity metrics directly from the terminal.",
    tech: ["Rust", "CLI", "Sqlite"],
    link: "https://example.com",
    github: "https://github.com",
    stars: 124,
  },
  {
    id: "4",
    title: "Pixel Editor",
    description:
      "Browser-based pixel art editor with layer support and export functionality.",
    tech: ["Vue.js", "Canvas API", "Pinia"],
    link: "https://example.com",
    github: "https://github.com",
    stars: 45,
  },
];

const Projects = () => {
  return (
    <div className="max-w-150 mx-auto py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-2">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          A collection of tools, applications, and experiments I've built.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.filter((p) => p.isFeatured).map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-xl border border-gray-200 dark:border-[#323437] bg-white dark:bg-[#080808] overflow-hidden transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
            >
              {project.image && (
                <div className="h-48 w-full bg-gray-100 dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#323437] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-black dark:text-[#e4e4e4]">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded text-[10px] font-medium bg-gray-100 dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#323437]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            More Projects
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {PROJECTS.filter((p) => !p.isFeatured).map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col p-4 rounded-xl border border-gray-100 dark:border-[#1e1e1e] bg-gray-50/50 dark:bg-[#080808] hover:bg-white dark:hover:bg-[#1e1e1e] hover:border-gray-200 dark:hover:border-[#323437] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FolderGit2
                      size={16}
                      className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                    />
                    <span className="text-sm font-semibold text-black dark:text-[#e4e4e4]">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {project.stars && (
                      <div className="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                        <Star size={12} fill="currentColor" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 pl-6">
                  {project.description}
                </p>
                <div className="flex gap-2 pl-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
