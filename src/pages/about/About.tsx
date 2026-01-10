import Graph from "../../components/graph/Graph";
import Stack from "../../components/stacks/Stack";
import Profile from "./Profile";

const About = () => {
  return (
    <div className="max-w-150 mx-auto  py-8 sm:py-12 space-y-12">
      <Profile />
      <section className="w-full">
        <Stack />
      </section>
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-6 text-black dark:text-[#e4e4e4]">
          Navigation Map
        </h2>
        <Graph />
      </section>
    </div>
  );
};

export default About;