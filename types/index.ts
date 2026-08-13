export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  sourceDisabled?: boolean;
  /** A static image from the public directory, e.g. "/projects/portfolio.png". */
  image?: string;
  isFeatured?: boolean;
  stars?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  isFeatured?: boolean;
}
