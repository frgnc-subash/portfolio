"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import ForceGraph2D from "react-force-graph-2d";
import type {
  ForceGraphMethods,
  GraphData,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/data/projectData";
import { BLOG_POSTS } from "@/data/blogData";

interface CustomNode extends NodeObject {
  id: string;
  name: string;
  path?: string;
  external?: boolean;
}

const NODE_VAL = 6;
const TRUNK_IDS = new Set(["about", "projects", "blog", "contact"]);

const Graph = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<
    | ForceGraphMethods<NodeObject<CustomNode>, LinkObject<CustomNode>>
    | undefined
  >(undefined);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ w: 400, h: 260 });
  const [isDark, setIsDark] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const updateTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setDimensions({ w: entry.contentRect.width, h: 260 });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const data = useMemo<GraphData<CustomNode>>(() => {
    const nodes: CustomNode[] = [
      { id: "about", name: "About", path: "/", val: NODE_VAL },
      { id: "projects", name: "Projects", path: "/projects", val: NODE_VAL },
      { id: "blog", name: "Blog", path: "/blogs", val: NODE_VAL },
      { id: "contact", name: "Contact", path: "/contact", val: NODE_VAL },
      ...PROJECTS.map(
        (project): CustomNode => ({
          id: `project-${project.id}`,
          name: project.title,
          path: project.link,
          external: true,
          val: NODE_VAL,
        }),
      ),
      ...BLOG_POSTS.map(
        (post): CustomNode => ({
          id: `blog-${post.id}`,
          name: post.title,
          path: post.slug,
          val: NODE_VAL,
        }),
      ),
    ];

    const links = [
      { source: "about", target: "projects" },
      { source: "about", target: "blog" },
      { source: "about", target: "contact" },
      ...PROJECTS.map((project) => ({
        source: "projects",
        target: `project-${project.id}`,
      })),
      ...BLOG_POSTS.map((post) => ({
        source: "blog",
        target: `blog-${post.id}`,
      })),
    ];

    return { nodes, links };
  }, []);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    graph.d3Force("charge")?.strength(-90);
    graph.d3Force("link")?.distance(38);
  }, []);

  const colors = {
    bg: isDark ? "#080808" : "#ffffff",
    node: isDark ? "#c084fc" : "#7c3aed",
    link: isDark ? "#374151" : "#cbd5e1",
    text: isDark ? "#e5e7eb" : "#111827",
  };

  const getNodeAtPoint = (clientX: number, clientY: number) => {
    const graph = graphRef.current;
    const container = containerRef.current;
    if (!graph || !container) return null;

    const rect = container.getBoundingClientRect();
    const graphCoords = graph.screen2GraphCoords(
      clientX - rect.left,
      clientY - rect.top,
    );
    const zoom = graph.zoom() || 1;
    let nearestNode: CustomNode | null = null;
    let nearestDistance = Infinity;

    for (const node of data.nodes as CustomNode[]) {
      if (!node.path || node.x == null || node.y == null) continue;

      const distance = Math.hypot(
        graphCoords.x - node.x,
        graphCoords.y - node.y,
      );
      const hitRadius = Math.max((node.val ?? NODE_VAL) * 1.4, 20 / zoom);

      if (distance <= hitRadius && distance < nearestDistance) {
        nearestNode = node;
        nearestDistance = distance;
      }
    }

    return nearestNode;
  };

  const navigateToNode = (node: CustomNode) => {
    if (!node.path) return;
    if (node.external) {
      window.open(node.path, "_blank", "noopener,noreferrer");
    } else {
      router.push(node.path);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    const movement = start
      ? Math.hypot(event.clientX - start.x, event.clientY - start.y)
      : 0;

    if (movement > 6) return;

    const node = getNodeAtPoint(event.clientX, event.clientY);
    if (!node?.path) return;

    event.preventDefault();
    event.stopPropagation();
    navigateToNode(node);
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    containerRef.current.style.cursor = getNodeAtPoint(
      event.clientX,
      event.clientY,
    )
      ? "pointer"
      : "grab";
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onClickCapture={handleClickCapture}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-lg overflow-hidden border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] cursor-grab active:cursor-grabbing"
    >
      <ForceGraph2D<CustomNode>
        ref={graphRef}
        width={dimensions.w}
        height={dimensions.h}
        graphData={data}
        backgroundColor={colors.bg}
        enablePointerInteraction
        enablePanInteraction
        enableZoomInteraction
        cooldownTicks={150}
        d3VelocityDecay={0.35}
        d3AlphaDecay={0.02}
        linkColor={() => colors.link}
        linkWidth={1.5}
        linkCurvature={0}
        onNodeClick={(node) => navigateToNode(node as CustomNode)}
        onNodeHover={(node) => {
          if (!containerRef.current) return;
          containerRef.current.style.cursor = node?.path ? "pointer" : "grab";
          setHoveredId((node as CustomNode | null)?.id ?? null);
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const customNode = node as CustomNode;
          const r = (node.val ?? NODE_VAL) * 0.8;
          const showLabel =
            globalScale > 0.6 &&
            (TRUNK_IDS.has(customNode.id) || customNode.id === hoveredId);

          ctx.shadowColor = colors.node;
          ctx.shadowBlur = isDark ? 10 : 2;

          ctx.beginPath();
          ctx.arc(node.x!, node.y!, r, 0, Math.PI * 2);
          ctx.fillStyle = colors.node;
          ctx.fill();

          ctx.shadowBlur = 0;

          if (showLabel) {
            const fontSize = 12 / globalScale;
            ctx.font = `500 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = colors.text;
            ctx.fillText(node.name, node.x!, node.y! + r + 5 / globalScale);
          }
        }}
      />
    </div>
  );
};

export default Graph;
