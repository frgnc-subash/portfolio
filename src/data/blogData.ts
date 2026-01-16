export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  isFeatured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Minimalist Interfaces",
    excerpt:
      "Why reducing cognitive load leads to better user retention and how to achieve it in React applications.",
    date: "Jan 12, 2024",
    slug: "/blog/minimalist-interfaces",
    isFeatured: true,
    content: `
      <p>Minimalism in UI design is not just about aesthetics; it's about functionality. When we reduce the visual noise, we guide the user's attention to what truly matters.</p>
      <br/>
      <h3 class="text-xl font-bold mt-4 mb-2">The Law of Proximity</h3>
      <p>Elements that are close to each other are perceived as related. By using whitespace effectively, we can group related controls without needing explicit borders or boxes. This reduces the cognitive load required to process the interface.</p>
      <br/>
      <h3 class="text-xl font-bold mt-4 mb-2">Typography as UI</h3>
      <p>Instead of relying on heavy icons or colored buttons, distinct typography hierarchy can signal importance. A bold header and a grayed-out caption tell a story faster than a complex card component.</p>
    `,
  },
  {
    id: "2",
    title: "Mastering Force-Directed Graphs",
    excerpt:
      "A deep dive into visualizing complex node networks using D3.js and WebGL performance techniques.",
    date: "Dec 28, 2023",
    slug: "/blog/force-graphs",
    isFeatured: false,
    content: `
      <p>Visualizing data structures like graphs allows us to see connections that are otherwise invisible in tabular data. Force-directed algorithms simulate physical forces to arrange these nodes in an aesthetically pleasing way.</p>
      <br/>
      <h3 class="text-xl font-bold mt-4 mb-2">The Physics Simulation</h3>
      <p>We use a combination of repulsion (Coulomb's law) between nodes and attraction (Hooke's law) along links. This ensures that nodes don't overlap while keeping connected nodes relatively close.</p>
      <br/>
      <h3 class="text-xl font-bold mt-4 mb-2">Performance in React</h3>
      <p>When rendering thousands of nodes, DOM elements (SVG) can become a bottleneck. Using HTML5 Canvas or WebGL via libraries like <code>react-force-graph</code> allows us to render complex networks at 60fps.</p>
    `,
  },
  {
    id: "3",
    title: "Designing for Dark Mode",
    excerpt:
      "It's more than just inverting colors. Understanding contrast ratios and visual hierarchy in low-light environments.",
    date: "Dec 15, 2023",
    slug: "/blog/dark-mode",
    isFeatured: false,
    content: `
      <p>Dark mode has gone from a geeky feature to a user expectation. However, simply setting the background to black (#000000) and text to white (#FFFFFF) causes eye strain due to high contrast (halation).</p>
      <br/>
      <p>Instead, use dark grays (like #121212 or #1e1e1e) for surfaces. This provides depth and reduces the harshness of the light emitted by the screen.</p>
    `,
  },
  {
    id: "4",
    title: "State Management Patterns",
    excerpt:
      "Comparing Redux, Zustand, and React Context for modern web applications.",
    date: "Nov 08, 2023",
    slug: "/blog/state-management",
    isFeatured: false,
    content: `
      <p>State management is the backbone of any complex React application. While Redux was the industry standard for years, lightweight alternatives like Zustand have gained popularity.</p>
      <br/>
      <p>Context API is great for low-frequency updates (like theme or user auth), but for high-frequency data changes, it can trigger unnecessary re-renders across the component tree.</p>
    `,
  },
  {
    id: "5",
    title: "Optimizing React Performance",
    excerpt:
      "Practical tips for reducing re-renders and improving interaction to next paint scores.",
    date: "Oct 22, 2023",
    slug: "/blog/react-performance",
    isFeatured: false,
    content: `
      <p>Performance optimization in React often boils down to two things: preventing unnecessary renders and reducing the bundle size.</p>
      <br/>
      <p>Using <code>useMemo</code> and <code>useCallback</code> correctly can stabilize props references, while code-splitting with <code>React.lazy</code> ensures users only download the JavaScript they need for the current page.</p>
    `,
  },
];
