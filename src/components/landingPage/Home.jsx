import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Terminal from "./Terminal";
import Socials from "../Socials";
import useSound from "use-sound";
import boopSfx from "../../sounds/click.wav";
import { useSoundContext } from "../../controllers/SoundContext";

const Home = () => {
  const { soundEnabled } = useSoundContext();
  const [play] = useSound(boopSfx, { soundEnabled: soundEnabled });

  useEffect(() => {
    console.log(
      `%c   
      (\\_/) 
      ( •_•) < Secret console club!
     /> 🍪   Here's a cookie for you!
   `,
      "color: #ff69b4; font-size: 18px;",
    );
  }, []);

  return (
    <>
      <Navbar />
      <Profile />
      <Terminal />
      <div className="flex m-4 flex-col items-center gap-4">
        <Socials />
      </div>
    </>
  );
};

export default Home;
