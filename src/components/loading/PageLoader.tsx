interface PageLoaderProps {
  isLeaving: boolean;
}

const PageLoader = ({ isLeaving }: PageLoaderProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[999] grid place-items-center bg-white text-black transition-[opacity,visibility] duration-300 dark:bg-[#080808] dark:text-[#e4e4e4] ${
        isLeaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="sr-only">Loading portfolio</span>

      <div className="relative flex h-24 w-40 items-center justify-center">
        <div className="loader-track" />
        <div className="loader-block" />
      </div>
    </div>
  );
};

export default PageLoader;
