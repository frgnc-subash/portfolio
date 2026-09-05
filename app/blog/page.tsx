"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";
import { SITE_URL, useSeo } from "@/lib/seo";

const Blog = () => {
  useSeo({
    title: "Writing",
    description:
      "Articles by Subash Lama Tamang on React, interface design, dark mode, graph visualization, state management, and frontend performance.",
    path: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Writing by Subash Lama Tamang",
      url: `${SITE_URL}/blog`,
      blogPost: BLOG_POSTS.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `${SITE_URL}${post.slug}`,
        datePublished: post.date,
      })),
    },
  });

  const featuredPost = BLOG_POSTS.find((post) => post.isFeatured);
  const recentPosts = BLOG_POSTS.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between mb-10 px-4 sm:px-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-2">
            Writing
          </h1>
          <p className="font-mono text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            My thoughts, experiences and adventure.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {featuredPost && (
          <div className="px-4 sm:px-0">
            <Link
              href={featuredPost.slug}
              className="group block rounded-lg border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] p-5 sm:p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]">
                  <Sparkles size={12} /> Featured
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <Calendar size={12} /> {featuredPost.date}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-black dark:text-[#e4e4e4] mb-2 truncate group-hover:underline decoration-1 underline-offset-4">
                {featuredPost.title}
              </h2>
              <p className="font-mono text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                {featuredPost.excerpt}
              </p>

              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                Read the full post
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            </Link>
          </div>
        )}

        <div className="flex flex-col px-4 sm:px-0">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            Recent Posts
          </h3>
          <div className="border-t border-gray-100 dark:border-[#1e1e1e]">
            {recentPosts.map((post, index) => {
              const [monthDay, year] = post.date.split(", ");
              const isLast = index === recentPosts.length - 1;

              return (
                <Link
                  key={post.id}
                  href={post.slug}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6 hover:bg-gray-50/50 dark:hover:bg-[#1e1e1e]/30 transition-colors px-3 rounded-lg -mx-3 ${
                    !isLast
                      ? "border-b border-gray-100 dark:border-[#1e1e1e]"
                      : ""
                  }`}
                >
                  <div className="shrink-0 w-16 text-xs font-medium text-gray-400 dark:text-gray-500 font-mono">
                    {monthDay}
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
                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-2 sm:mt-1">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Calendar size={10} /> {year}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
