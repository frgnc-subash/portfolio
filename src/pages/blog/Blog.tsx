import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  isFeatured?: boolean;
}

const POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Minimalist Interfaces",
    excerpt: "Why reducing cognitive load leads to better user retention and how to achieve it in React applications.",
    date: "2024",
    readTime: "5 min",
    slug: "/blog/minimalist-interfaces",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Mastering Force-Directed Graphs",
    excerpt: "A deep dive into visualizing complex node networks using D3.js and WebGL performance techniques.",
    date: "2024",
    readTime: "8 min",
    slug: "/blog/force-graphs",
  },
  {
    id: "3",
    title: "Designing for Dark Mode",
    excerpt: "It's more than just inverting colors. Understanding contrast ratios and visual hierarchy in low-light environments.",
    date: "2023",
    readTime: "4 min",
    slug: "/blog/dark-mode",
  },
  {
    id: "4",
    title: "State Management Patterns",
    excerpt: "Comparing Redux, Zustand, and React Context for modern web applications.",
    date: "2023",
    readTime: "6 min",
    slug: "/blog/state-management",
  },
];

const Blog = () => {
  return (
    <div className="max-w-150 mx-auto  py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-2">
            Writing
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Thoughts on engineering, design, and user experience.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {POSTS.filter((p) => p.isFeatured).map((post) => (
          <Link
            key={post.id}
            to={post.slug}
            className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#323437] p-6 sm:p-8 transition-all hover:border-gray-300 dark:hover:border-gray-600"
          >
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-[#080808] border border-gray-100 dark:border-[#323437] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={16} className="text-black dark:text-white" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black dark:bg-[#e4e4e4] text-white dark:text-black">
                <Sparkles size={10} /> Featured
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {post.readTime} read
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-[#e4e4e4] mb-3 group-hover:underline decoration-1 underline-offset-4">
              {post.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}

        <div className="flex flex-col">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            Recent Posts
          </h3>
          <div className="border-t border-gray-100 dark:border-[#1e1e1e]">
            {POSTS.filter((p) => !p.isFeatured).map((post) => (
              <Link
                key={post.id}
                to={post.slug}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6 border-b border-gray-100 dark:border-[#1e1e1e] hover:bg-gray-50/50 dark:hover:bg-[#1e1e1e]/30 transition-colors -mx-4 px-4 rounded-lg"
              >
                <div className="shrink-0 w-16 text-xs font-medium text-gray-400 dark:text-gray-500 font-mono">
                  {post.date}
                </div>
                
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-black dark:text-[#e4e4e4] group-hover:text-black dark:group-hover:text-white transition-colors">
                      {post.title}
                    </h2>
                    <ArrowUpRight 
                      size={14} 
                      className="text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" 
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-1">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Calendar size={10} /> {post.readTime} read
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;