import { FiGithub, FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const iconClass =
    "text-gray-500 hover:text-black dark:text-[#949494] dark:hover:text-[#80a0ff] transition-colors duration-200";

  return (
    <footer className="w-full flex flex-col items-center gap-4 py-8 mt-8 border-t border-gray-200 dark:border-[#323437]">
      <div className="flex gap-6 items-center">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={iconClass}
        >
          <FiGithub size={20} />
        </a>
        <a
          href="https://instagram.com/frgnc_subash"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={iconClass}
        >
          <FiInstagram size={20} />
        </a>
        <a
          href="https://linkedin.com/in/subash-lama-tamang"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={iconClass}
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href="https://facebook.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={iconClass}
        >
          <FiFacebook size={20} />
        </a>
      </div>

      <div className="text-sm text-gray-400 dark:text-[#949494]">
        &copy; {currentYear} frgnc-subash
      </div>
    </footer>
  );
};

export default Footer;