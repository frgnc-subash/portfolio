import type { BlogPost } from "@/types";

export type { BlogPost };

const calloutClass =
  "not-prose my-6 rounded-lg border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] p-4 sm:p-5";
const calloutLabelClass =
  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50/80 dark:bg-[#1e1e1e]/60 text-xs font-semibold text-black dark:text-[#e4e4e4] mb-3";
const calloutTextClass =
  "text-sm text-gray-600 dark:text-gray-400 leading-relaxed m-0";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How My Portfolio Went From Plain HTML to Next.js",
    excerpt:
      "This site has been rebuilt three times. Here is what each version taught me, from a single HTML file to the Next.js app you are reading right now.",
    date: "Aug 20, 2026",
    slug: "/blog/from-html-to-nextjs",
    isFeatured: false,
    content: `
      <p>This website has been rebuilt three times. Every version taught me something different about web development, and looking back, I can see my own growth as a developer just by comparing the old code to what runs today.</p>

      <h2>Version One: Plain HTML, CSS and JavaScript</h2>
      <p>My first portfolio was a single HTML file with a linked stylesheet and a script tag at the bottom. No build tools, no frameworks, just raw markup. I wrote every navbar link by hand and copied the same header and footer into every page I added.</p>
      <p>It was messy, but it taught me how the web actually works underneath all the abstractions. I learned what the DOM really is by manipulating it directly with <code>document.querySelector</code>, and I learned about CSS specificity the hard way, by fighting with it for hours.</p>

      <h2>Version Two: Learning React With Vite</h2>
      <p>Once I got comfortable with the basics, copying the same HTML across pages started to feel wrong. I wanted reusable pieces instead of repeated markup, so I picked up React. Vite was the obvious choice for the build tool. Compared to what I had used before, the dev server felt instant, and hot reload meant I could see changes without losing my place on the page.</p>
      <p>This version is where component thinking clicked for me. I started sketching new pages as a tree of small components instead of one long file.</p>
      <p>I deployed that version on Render. It was free, easy to connect to GitHub, and good enough for a personal site that did not need to scale.</p>

      <h2>Version Three: Rebuilding in Next.js</h2>
      <p>The Vite and React version worked fine, but I kept running into the same limits. Every page shipped as an empty div that filled in with JavaScript, so search engines and link previews saw very little useful content. Routing was something I had wired together myself, and adding images meant resizing files by hand before dropping them into the project.</p>
      <p>Next.js solved most of these problems without extra setup:</p>
      <ul>
        <li>File based routing, so the folder structure in <code>app/</code> is basically the sitemap</li>
        <li>Server rendering, so pages have real content before any JavaScript runs</li>
        <li>Built in image optimization through <code>next/image</code></li>
        <li>One framework for the frontend and small bits of backend, like the contact form on this site</li>
      </ul>
      <p>Rebuilding the site in Next.js also gave me a reason to redesign it from scratch, which is why this version looks nothing like the first two.</p>

      <div class="${calloutClass}">
        <div class="${calloutLabelClass}">Takeaway</div>
        <p class="${calloutTextClass}">The framework changed three times, but the goal never did: build something, ship it, and learn from what breaks. Every rewrite came from hitting a real limitation, not from chasing whatever was popular that month.</p>
      </div>

      <h2>Looking Back</h2>
      <p>If you are just starting out, my honest advice is to not skip the plain HTML and CSS stage. It is tempting to jump straight into a framework, but understanding what the framework is doing for you makes every tool after that much easier to learn.</p>
    `,
  },
  {
    id: "2",
    title: "My Journey From Windows to NixOS",
    excerpt:
      "I left Windows for Fedora, then Arch, then NixOS. Each switch happened for a real reason, including one I did not see coming.",
    date: "Jul 14, 2026",
    slug: "/blog/windows-to-nixos",
    isFeatured: true,
    content: `
      <p>I switched away from Windows a while back, and since then I have hopped between three Linux distributions. Each one solved a problem the last one had, and each one taught me something new about how Linux actually works.</p>

      <h2>Starting With Fedora</h2>
      <p>Fedora was my first real Linux install. I picked it because it is stable, well documented, and does not demand much from a beginner. GNOME worked out of the box, most of my hardware was detected automatically, and I could focus on learning the terminal instead of fighting my setup.</p>
      <p>Fedora was a good teacher, but after a few months it started to feel restrictive. I wanted to understand what was actually running on my machine instead of just accepting the defaults GNOME gave me.</p>

      <h2>Arch Linux: Freedom and Customization</h2>
      <p>Arch Linux is famous for its installer, or rather the lack of one. You build the system piece by piece, which sounds painful, but it is one of the best ways to actually learn Linux. I picked my own window manager, wrote my own configs, and understood every line of my setup because I put it there myself.</p>
      <p>The <strong>AUR</strong>, short for Arch User Repository, was a big part of the appeal. If a package existed, someone had probably packaged it for Arch already. This is also where things eventually went wrong for me.</p>

      <h2>Why I Left Arch</h2>
      <p>The AUR is open to anyone. Packages are submitted and maintained by the community, and while most maintainers are careful, there is no formal review process before a package reaches your system. Over time, there were a few well known cases of malware slipping into AUR packages, and it made me nervous about installing software from a repository I could not fully verify myself.</p>
      <p>Arch gave me freedom, but that freedom came with a trust problem. I did not want to manually audit every package just to feel safe on my own machine.</p>

      <h2>Landing on NixOS</h2>
      <p>NixOS solved this in a way I did not expect. Instead of installing packages one by one and hoping nothing breaks, your entire system is described in configuration files. Packages come from Nixpkgs, a repository where changes go through review before being merged, which gives me more confidence in what actually ends up on my machine.</p>
      <p>The other benefit is that my whole setup is reproducible. If something breaks, I can roll back to the previous generation of my system in seconds. If I ever move to a new machine, I can copy my configuration and have the same environment running again.</p>

      <img src="/blog/nixos-fastfetch.png" alt="Fastfetch output showing my NixOS setup running Hyprland" />
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center -mt-4">My current setup: NixOS with Hyprland, shown with fastfetch.</p>

      <div class="${calloutClass}">
        <div class="${calloutLabelClass}">Takeaway</div>
        <p class="${calloutTextClass}">Distro hopping is not really about finding the "best" one. Fedora taught me the basics, Arch taught me how Linux fits together, and NixOS is where I finally trust my own system again.</p>
      </div>

      <h2>Where I Am Now</h2>
      <p>I still keep the Arch mindset of understanding what I install, but NixOS gives me a safety net Arch never had. My whole system configuration is version controlled, and setting up a fresh machine is now a single command instead of an afternoon.</p>
    `,
  },
  {
    id: "3",
    title: "Building the Graph on My Homepage",
    excerpt:
      "The Navigation Map on my homepage is a real force directed graph, not a static image. Here is how I built it and what broke along the way.",
    date: "Jun 02, 2026",
    slug: "/blog/building-the-navigation-graph",
    isFeatured: false,
    content: `
      <p>If you scroll down on my homepage, you will find a small interactive graph connecting this site's pages, projects and blog posts. It is not a static illustration. It is a live force simulation you can drag, zoom and click through to actually navigate the site.</p>

      <h2>Where the Idea Came From</h2>
      <p>The direct inspiration was Obsidian's graph view. I use Obsidian for notes, and every time I opened that graph, I ended up clicking around it just to see how everything connected. It was more fun to explore than the file sidebar, even though the sidebar was faster for actually finding a note.</p>

      <img src="/blog/obsidian-graph-view.png" alt="Obsidian's graph view showing linked notes" />
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center -mt-4">Obsidian's graph view, the thing that made me want a graph like this on my own site.</p>

      <p>I wanted that same feeling on my portfolio: instead of telling visitors what pages exist, let them see how the pages relate and click through the connections themselves.</p>

      <h2>Why a Graph Instead of a Menu</h2>
      <p>I already had a normal navbar, so the graph was never meant to replace it. I wanted something that showed the shape of the site instead of just listing it. Projects and posts branch out from the main sections, and seeing that structure felt more honest than hiding it behind a dropdown.</p>

      <h2>Picking a Library</h2>
      <p>I used <code>react-force-graph-2d</code>, which renders everything on an HTML5 canvas and runs a physics simulation underneath using d3-force. Nodes push away from each other, links pull connected nodes together, and the layout settles into place on its own instead of me positioning anything by hand.</p>
      <p>The whole graph is generated from the same data the rest of the site uses. Every project in <code>projectData.ts</code> and every post in <code>blogData.ts</code> automatically becomes a node, so I never have to update the graph separately when I add new content.</p>

      <h2>The Problem With Server Rendering</h2>
      <p>Canvas libraries need a real browser window to draw anything, and Next.js tries to render components on the server first. The first time I added the graph, the build failed because there was no canvas to draw on during server rendering.</p>
      <p>The fix was to load the component dynamically with server side rendering turned off, so it only mounts once the page is actually in the browser:</p>
      <ul>
        <li>A lightweight wrapper component handles the loading state</li>
        <li>The actual graph, with all of its browser only code, loads after that</li>
      </ul>

      <h2>Telling a Click From a Drag</h2>
      <p>The trickiest part was not the physics, it was deciding when a click should count as navigation. Dragging the graph to pan around also fires pointer events, and I did not want a small accidental drag to launch a page change.</p>
      <p>I ended up tracking where the pointer first went down, then comparing that to where it was released. If the distance between the two points is small, it counts as a click and the app navigates. If it is larger, it was a drag, and nothing happens.</p>

      <div class="${calloutClass}">
        <div class="${calloutLabelClass}">Takeaway</div>
        <p class="${calloutTextClass}">The physics simulation looked like the hard part before I built this, but the real work was in the small interaction details, like telling a drag apart from a click.</p>
      </div>

      <h2>What I Would Do Differently</h2>
      <p>The graph currently rebuilds its layout from scratch every time the site loads, which is fine for a small portfolio but would not scale to hundreds of nodes. If I ever add that much content, caching the initial node positions is the next thing on my list.</p>
    `,
  },
  {
    id: "4",
    title: "The Hello World That Started Everything",
    excerpt:
      "Long before any of this, there was a blue Turbo C screen in school and a single printf statement in college. Here is where my interest in programming actually began.",
    date: "May 10, 2026",
    slug: "/blog/hello-world",
    isFeatured: false,
    content: `
      <p>Every developer has a first program. Mine was not on this site, or in any framework, or even on a modern editor. It started on an old blue screen, years before I knew what a framework was.</p>

      <h2>My First Code, Written in School</h2>
      <p>The very first code I ever wrote was in school, in Turbo C. If you have never used it, Turbo C is an old DOS based IDE with a bright blue background, and it was still being taught in school computer labs long after the rest of the world had moved on to something newer.</p>
      <p>I did not write anything clever. It was a few lines that printed text to the screen, typed into a tiny editor window on a machine that felt ancient even then. I did not think much of it at the time. It was just an assignment.</p>

      <img src="/blog/turboc.png" alt="Turbo C IDE showing a simple printf Hello World program" />
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center -mt-4">Turbo C, the same blue screen I wrote my first program in.</p>

      <h2>The Hello World That Actually Mattered</h2>
      <p>The program that really changed things came later, in Higher Secondary Education. It was the same idea as the one in school, a few lines of C that printed <code>Hello, World!</code> to the screen, but this time it clicked differently. I remember actually understanding what every line was doing instead of just copying it down.</p>
      <p>That is the strange part about "Hello, World!" as a program. It does almost nothing, but it is often the exact moment someone decides programming is for them. That was true for me.</p>

      <div class="${calloutClass}">
        <div class="${calloutLabelClass}">Takeaway</div>
        <p class="${calloutTextClass}">The same few lines of code meant nothing to me in school and everything to me a few years later. Interest in programming does not always start with the first exposure. Sometimes it just needs the right moment to land.</p>
      </div>

      <h2>Undergrad Made It Serious</h2>
      <p>Once I got into undergrad, that early curiosity turned into something I actually pursued instead of something that happened to me. I started building small projects on my own instead of waiting for an assignment, and this portfolio is one of the direct results of that.</p>

      <h2>Looking Back</h2>
      <p>It is a bit funny that a language as old as C, taught on software as old as Turbo C, is the reason I ended up writing Next.js and TypeScript today. But every framework I use now sits on top of ideas I first saw printed on that blue screen.</p>
    `,
  },
];
