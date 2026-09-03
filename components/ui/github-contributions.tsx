"use client";

import { useEffect, useRef, useState } from "react";

const API_URL = "/api/github-contributions";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-black/5 dark:bg-white/10",
  1: "bg-[#9be9a8] dark:bg-[#0e4429]",
  2: "bg-[#40c463] dark:bg-[#006d32]",
  3: "bg-[#30a14e] dark:bg-[#26a641]",
  4: "bg-[#216e39] dark:bg-[#39d353]",
};

const CELL_SIZE = "h-[10px] w-[10px]";

function DayCell({ day }: { day: ContributionDay }) {
  const label = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${label}`}
      className={`${CELL_SIZE} rounded-[2px] ${LEVEL_CLASSES[day.level]} transition-transform duration-150 ease-out hover:scale-125`}
    />
  );
}

function Legend() {
  return (
    <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className={`${CELL_SIZE} rounded-[2px] ${LEVEL_CLASSES[level]}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}

export default function GithubContributions() {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contributions");
        return res.json();
      })
      .then((json: ContributionsResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  if (error) {
    return (
      <div className="text-xs text-gray-400 dark:text-gray-500">
        Couldn&apos;t load GitHub activity right now.
      </div>
    );
  }

  if (!data) {
    return (
      <div
        aria-label="Loading GitHub activity"
        className="h-full min-h-[110px] w-full animate-pulse rounded-lg border border-gray-300 bg-white dark:border-[#3a3a3c] dark:bg-[#0a0a0a]"
      />
    );
  }

  const total = data.total?.lastYear ?? 0;

  return (
    <div className="h-full flex flex-col justify-center gap-2 rounded-lg border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] p-4 sm:p-5">
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <span className="font-mono font-semibold text-black dark:text-[#e4e4e4]">
          {total.toLocaleString()}
        </span>{" "}
        contributions in the last year
      </p>

      <div
        ref={scrollRef}
        className="contributions-mask overflow-x-auto pb-1"
      >
        <div
          className="grid gap-[3px] w-max px-1"
          style={{
            gridTemplateRows: "repeat(7, 10px)",
            gridAutoFlow: "column",
          }}
        >
          {data.contributions.map((day) => (
            <DayCell key={day.date} day={day} />
          ))}
        </div>
      </div>

      <Legend />
    </div>
  );
}
