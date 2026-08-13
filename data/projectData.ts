import type { Project } from "@/types";

export type { Project };

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Obsidian Graph Portfolio",
    description:
      "A minimalist personal portfolio featuring an interactive force-directed graph for navigation, built with React and Express.",
    tech: ["React", "TypeScript", "2D Graph", "Tailwind"],
    link: "https://subashlamatamang.com.np",
    github: "https://github.com/frgnc-subash/portfolio",
    image: "/projects/portfolio.png",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Altigo Himalayan Treks",
    description: "A commercial e-commerce website promoting & featuring tourism in Nepal",
    tech: ["NextJs", "TypeScript", "React"],
    link: "https://altigohimalayantreks.com",
    github: "https://github.com/frgnc-subash/altigo-himalayan-treks",
    image: "/projects/altigohimalayantreks.png",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Nixcraft",
    description: "My declarative NixOS configuration and personal development environment.",
    tech: ["Nix", "NixOS", "Home Manager"],
    link: "https://github.com/frgnc-subash/nixcraft",
    github: "https://github.com/frgnc-subash/nixcraft",
    image: "/projects/nixcraft.png",
  },
  {
    id: "4",
    title: "Architectfolio",
    description: "A minimal and slick portfolio designed for my Architect Brother.",
    tech: ["React", "Typescript", "Minimal"],
    link: "https://sajan-lama.vercel.app",
    github: "https://github.com/frgnc-subash",
    sourceDisabled: true,
    image: "/projects/architectfolio.png",
    stars: 1,
  },
];
