import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  console.log(
    `%c   
    (\\_/) 
    ( •_•) < Secret console club!
   /> 🍪   Here's a cookie for you!
`,
    "color: #ff69b4; font-size: 18px;"
  );

  return (
    <>
      <div className="flex flex-col items-center p-4 pb-0 w-full text-[14px] font-semibold">
        <div className="flex justify-between w-full max-w-[740px]">
          <Link
            to="/"
            className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
          >
            home
          </Link>
          <div className="flex justify-around">
            <Link
              to="/myStack"
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              stack
            </Link>
            <Link
              to="/education"
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              education
            </Link>
            <Link
              to="/projects"
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              projects
            </Link>
            <Link
              to="/contact"
              className="text-yellow-200 px-4 py-2 hover:bg-yellow-200 hover:text-black transition-all duration-300"
            >
              contact
            </Link>
          </div>
        </div>
        <hr className="text-amber-100 w-full border-t max-w-[740px] h-0.5 " />
      </div>
    </>
  );
};

export default Navbar;
