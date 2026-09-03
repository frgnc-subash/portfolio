"use client";

import dynamic from "next/dynamic";

const Graph = dynamic(() => import("./graph-client"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading navigation map"
      className="h-[260px] w-full animate-pulse rounded-lg border border-gray-300 bg-white dark:border-[#3a3a3c] dark:bg-[#0a0a0a]"
    />
  ),
});

export default Graph;
