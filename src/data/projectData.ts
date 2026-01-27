export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  image?: string;
  isFeatured?: boolean;
  stars?: number;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Obsidian Graph Portfolio",
    description:
      "A minimalist personal portfolio featuring an interactive force-directed graph for navigation, built with React and D3.js.",
    tech: ["React", "TypeScript", "2D Graph", "Tailwind"],
    link: "https://subashlamatamang.com.np",
    github: "https://github.com/frgnc-subash/portfolio",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Mount-Treks",
    description:
      "A commercial e-commerce website promoting & featuring tourism in Nepal",
    tech: ["React", "Typescript", "MongoDB Atlas", "NodeJS"],
    link: "https://mounttreks.com",
    github: "https://github.com/frgnc-subash/mount-treks",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Velvet: Hotel Management",
    description:
      "A Java-based application for managing hotel tasks, bookings, and productivity metrics.",
    tech: ["Java", "Core", "CMS"],
    link: "https://github.com/frgnc-subash/velvet",
    github: "https://github.com/frgnc-subash/velvet",
    stars: 1,
  },
  {
    id: "4",
    title: "Architectfolio",
    description: "A minimal and slick portfolio designed for an architecture student.",
    tech: ["React", "Typescript", "Minimal"],
    link: "https://sajan-lama.vercel.app",
    github: "https://github.com/frgnc-subash",
    stars: 1,
  },
];