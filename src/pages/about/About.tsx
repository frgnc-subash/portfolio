import { Layers, Network } from "lucide-react";
import Graph from "../../components/graph/Graph";
import Stack from "../../components/stacks/Stack";
import Profile from "./Profile";
import RecentCards from "./RecentCards";

const About = () => {
  const glassTitle =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]";

  return (
    <div className="max-w-150 mx-auto px-4 py-8 sm:py-12 space-y-16">
      <Profile />

      <section className="w-full flex flex-col gap-6">
        <div>
          <div className={glassTitle}>
            <Layers size={12} />
            Tech Stack
          </div>
        </div>
        <Stack />
      </section>

      <section className="w-full flex flex-col gap-6">
        <div>
          <div className={glassTitle}>
            <Network size={12} />
            Navigation Map
          </div>
        </div>
        <Graph />
      </section>

      <section className="w-full">
        <RecentCards />
      </section>
    </div>
  );
};

export default About;