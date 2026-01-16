import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, FileText, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/projectData";
import { BLOG_POSTS } from "../../data/blogData";

const RecentCards = () => {
  const recentProjects = PROJECTS.slice(0, 3);
  const recentBlogs = BLOG_POSTS.slice(0, 3);

  const glassTitle =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]";

  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      <div className="flex flex-col gap-4">
        <div>
          <div className={glassTitle}>
            <FolderGit2 size={12} />
            Selected Projects
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {recentProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                  {project.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {project.description}
                </span>
              </div>
              <ArrowUpRight
                size={14}
                className="text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 ml-4"
              />
            </a>
          ))}
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors self-start ml-3 group"
        >
          View more projects
          <ArrowRight
            size={12}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <div className={glassTitle}>
            <FileText size={12} />
            Recent Writing
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {recentBlogs.map((post) => (
            <Link
              key={post.id}
              to={post.slug}
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                  {post.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {post.date}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0 ml-4"
              />
            </Link>
          ))}
        </div>

        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors self-start ml-3 group"
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
};

export default RecentCards;