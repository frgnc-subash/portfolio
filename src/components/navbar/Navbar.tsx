import { NavLink } from "react-router-dom";
import Theme from "../theme/Theme";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-bold border-b-2 pb-1 border-black text-black dark:border-[var(--accent-active)] dark:text-[var(--accent-active)]"
      : "text-gray-600 hover:text-black dark:text-[var(--text-secondary)] dark:hover:text-[#e4e4e4] transition-colors duration-200";

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-transparent">
      <NavLink
        to="/"
        className="text-xl font-bold text-black dark:text-(--accent-brand) hover:opacity-80 transition-opacity"
      >
        subash
      </NavLink>

      <div className="flex items-center gap-6">
        <ul className="flex space-x-5 text-sm sm:text-base">
          <li>
            <NavLink to="/projects" className={navLinkClass}>
              projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={navLinkClass}>
              blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              contact
            </NavLink>
          </li>
        </ul>
        <Theme />
      </div>
    </nav>
  );
};

export default Navbar;
