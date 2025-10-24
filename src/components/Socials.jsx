import React from "react";

const Socials = () => {
  return (
    <div className="flex justify-center font-semibold items-center gap-2 text-xs text-gray-400">
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
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        instagram
      </a>
      <span>|</span>
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        linkedin
      </a>
      <span>|</span>
      <a 
        href="https://discord.com" 
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
