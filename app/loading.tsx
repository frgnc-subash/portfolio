export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white text-black dark:bg-[#080808] dark:text-[#e4e4e4]"
    >
      <span className="sr-only">Loading portfolio</span>

      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-xs tracking-[0.3em] font-medium text-gray-900 dark:text-gray-100 uppercase select-none">
          subash<span className="text-gray-400 dark:text-gray-600">.</span>
        </span>
        <div className="w-24 h-[2px] bg-gray-100 dark:bg-zinc-800/80 rounded-full overflow-hidden relative">
          <div className="loader-progress-bar h-full bg-gray-900 dark:bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
