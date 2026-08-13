"use client";

import dynamic from "next/dynamic";

const Graph = dynamic(() => import("./graph-client"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading navigation map"
      className="h-[300px] w-full animate-pulse rounded-xl border border-gray-200 bg-white dark:border-[#323437] dark:bg-[#080808]"
    />
  ),
});

export default Graph;
