import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Theme from "../theme/Theme";
import lightLogo from "../../assets/light.png";
import darkLogo from "../../assets/dark.png";

const NAV_LINKS = [
  { path: "/projects", label: "projects" },
  { path: "/blog", label: "blog" },
  { path: "/contact", label: "contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const moveIndicator = useCallback((element: HTMLElement) => {
    setIndicatorStyle({
      left: element.offsetLeft,
      width: element.offsetWidth,
      opacity: 1,
    });
  }, []);

  const resetIndicator = useCallback(() => {
    if (!listRef.current) return;
    const activeLink =
      listRef.current.querySelector<HTMLElement>(".active-link");
    if (activeLink) {
      moveIndicator(activeLink);
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [moveIndicator]);

  useEffect(() => {
    resetIndicator();
    window.addEventListener("resize", resetIndicator);
    return () => window.removeEventListener("resize", resetIndicator);
  }, [location.pathname, resetIndicator]);

  return (
    <nav className="relative flex items-center justify-between w-full max-w-150 mx-auto px-4 py-4 sm:py-6 bg-transparent z-50">
      <NavLink
        to="/"
        className="group shrink-0 relative z-20"
        onClick={() => setIsOpen(false)}
      >
        <img
          src={lightLogo}
          alt="Logo"
          className="h-5 sm:h-6 w-auto block dark:hidden"
        />
        <img
          src={darkLogo}
          alt="Logo"
          className="h-5 sm:h-6 w-auto hidden dark:block"
        />
      </NavLink>

      <div className="flex items-center gap-2 sm:gap-4">
        <ul
          ref={listRef}
          className="relative hidden sm:flex items-center bg-transparent"
          onMouseLeave={resetIndicator}
        >
          <li
            className="absolute top-0 bottom-0 rounded bg-gray-200 dark:bg-[#1e1e1e] transition-all duration-300 ease-in-out -z-10"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
            aria-hidden="true"
          />

          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                className={({ isActive }) =>
                  `block px-4 py-2 font-semibold transition-colors duration-200 ${
                    isActive
                      ? "active-link text-black dark:text-(--accent-active) font-bold"
                      : "text-gray-600 dark:text-(--text-secondary) hover:text-black dark:hover:text-[#e4e4e4]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Theme />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e1e1e] rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#323437] shadow-lg py-4 flex flex-col items-center gap-4 sm:hidden animate-in slide-in-from-top-2 duration-200 rounded-b-xl z-40">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-black dark:text-(--accent-active) font-bold"
                    : "text-gray-600 dark:text-(--text-secondary)"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;