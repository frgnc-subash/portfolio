import React from "react";

const Socials = () => {
  return (
    <div className=" m-4 flex justify-center font-semibold items-center gap-3 text-xs text-gray-400">
      <a
        href="https://github.com/frgnc-subash"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        github
      </a>
      <span>|</span>
      <a
        href="https://instagram.com/frgnc.subash"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        instagram
      </a>
      <span>|</span>
      <a
        href="https://www.linkedin.com/in/subash-lama-tamang/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        linkedin
      </a>
      <span>|</span>
      <a
        href="https://discord.gg/9YDt2SYrtD"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        discord
      </a>
    </div>
  );
};

export default Socials;
