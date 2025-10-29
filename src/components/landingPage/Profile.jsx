import React from "react";
import pfpImage from "../../assets/pfp.gif";

const Profile = () => {
  return (
    <div className="m-8 flex justify-center">
      <div className="w-full max-w-[740px] flex gap-4">
        <div className="w-22 h-22 border border-cyan-400"><img src={pfpImage} alt="Profile" /></div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 text-2xl font-bold">./</span>
            <span className="text-2xl font-black text-[#87FF87]">frgnc-subash</span>
          </div>
          <div className="text-[13px] font-medium mt-4 text-amber-200">
         Hey, It's Subash here! <br /> I'm an Undergraduate student | UI/UX
            designer | Linux Enthusiast based in Nepal.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
