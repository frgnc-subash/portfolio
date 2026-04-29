import { Layers, Network } from "lucide-react";
import Graph from "../../components/graph/Graph";
import Stack from "../../components/stacks/Stack";
import Profile from "./Profile";
import RecentCards from "./RecentCards";
import { SITE_NAME, SITE_URL, useSeo } from "../../lib/seo";

const About = () => {
  useSeo({
    title: "Full-Stack Developer Portfolio",
    description:
      "Portfolio of Subash Lama Tamang, a full-stack developer and UI/UX designer building React, Next.js, and TypeScript web experiences.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Full-Stack Developer",
      knowsAbout: ["React", "Next.js", "TypeScript", "UI/UX Design", "Frontend Development"],
      sameAs: [
        "https://github.com/frgnc-subash",
        "https://linkedin.com/in/subash-lama-tamang",
        "https://instagram.com/frgnc.subash",
        "https://facebook.com/frgnc.subash",
      ],
    },
  });

  const glassTitle =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 backdrop-blur-md text-xs font-semibold text-black dark:text-[#e4e4e4]";

  return (
    <div className="max-w-150 mx-auto  py-8 sm:py-12 space-y-14">
      <Profile />

      <section className="w-full flex flex-col gap-0">
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
