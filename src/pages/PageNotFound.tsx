import { useSeo } from "../lib/seo";

const PageNotFound = () => {
  useSeo({
    title: "Page Not Found",
    description: "The requested page could not be found on Subash Lama Tamang's portfolio.",
    path: "/404",
  });

  return (
    <div className="flex h-[64vh] items-center justify-center">
      <h1 className="text-xl font-medium tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
        404 <span className="mx-4 text-zinc-300 dark:text-zinc-700">|</span> Page Not Found
      </h1>
    </div>
  );
};

export default PageNotFound;
