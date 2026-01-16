import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { BLOG_POSTS } from "../../data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const fullSlug = `/blog/${slug}`;
  const post = BLOG_POSTS.find((p) => p.slug === fullSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-150 mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Post not found
        </h2>
        <button
          onClick={() => navigate("/blog")}
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors underline"
        >
          Back to Writing
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-150 mx-auto px-4 py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Writing
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
          <Calendar size={12} />
          <span>{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-[#e4e4e4] leading-tight mb-6">
          {post.title}
        </h1>

        <div className="h-px w-full bg-gray-100 dark:bg-[#1e1e1e]" />
      </header>

      <div
        className="prose prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-img:rounded-xl max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default BlogPost;
