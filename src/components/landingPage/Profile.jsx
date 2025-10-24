import React from "react";

const Profile = () => {
  return (
    <div className="m-8 flex justify-center">
      <div className="w-full max-w-[740px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-cyan-400 text-2xl font-bold">./</span>
          <span className="text-2xl font-black text-[#87FF87]">frgnc-subash</span>
        </div>
        <div className="text-[13px] font-medium mt-4 text-amber-200">
       Hey, It's Subash here! <br /> I'm an undergraduate student | ui/ux
          designer | Linux Enthusiast based in Nepal.
        </div>
      </div>
    </div>
  );
};

export default Profile;
