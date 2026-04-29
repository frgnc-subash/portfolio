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
import { useNavigate } from "react-router-dom";

interface CustomNode extends NodeObject {
  id: string;
  name: string;
  path?: string;
  val: number;
  group: "main" | "page";
}

const Graph = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef =
    useRef<ForceGraphMethods<NodeObject<CustomNode>, LinkObject<CustomNode>> | undefined>(
      undefined
    );
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ w: 400, h: 300 });
  const [isDark, setIsDark] = useState(false);

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
      setDimensions({ w: entry.contentRect.width, h: 300 });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const data = useMemo<GraphData<CustomNode>>(
    () => ({
      nodes: [
        { id: "about", name: "About", path: "/", val: 12, group: "main" },
        {
          id: "projects",
          name: "Projects",
          path: "/projects",
          val: 6,
          group: "page",
        },
        { id: "blog", name: "Blog", path: "/blog", val: 6, group: "page" },
        {
          id: "contact",
          name: "Contact",
          path: "/contact",
          val: 6,
          group: "page",
        },
      ],
      links: [
        { source: "about", target: "projects" },
        { source: "about", target: "blog" },
        { source: "about", target: "contact" },
      ],
    }),
    []
  );

  const colors = {
    bg: isDark ? "#080808" : "#ffffff",
    main: isDark ? "#c084fc" : "#7c3aed",
    page: isDark ? "#60a5fa" : "#2563eb",
    link: isDark ? "#374151" : "#cbd5e1",
    text: isDark ? "#e5e7eb" : "#111827",
  };

  const getNodeAtPoint = (clientX: number, clientY: number) => {
    const graph = graphRef.current;
    const container = containerRef.current;
    if (!graph || !container) return null;

    const rect = container.getBoundingClientRect();
    const graphCoords = graph.screen2GraphCoords(clientX - rect.left, clientY - rect.top);
    const zoom = graph.zoom() || 1;
    let nearestNode: CustomNode | null = null;
    let nearestDistance = Infinity;

    for (const node of data.nodes as CustomNode[]) {
      if (!node.path || node.x == null || node.y == null) continue;

      const distance = Math.hypot(graphCoords.x - node.x, graphCoords.y - node.y);
      const hitRadius = Math.max(node.val * 1.4, 20 / zoom);

      if (distance <= hitRadius && distance < nearestDistance) {
        nearestNode = node;
        nearestDistance = distance;
      }
    }

    return nearestNode;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    const movement = start ? Math.hypot(event.clientX - start.x, event.clientY - start.y) : 0;

    if (movement > 6) return;

    const node = getNodeAtPoint(event.clientX, event.clientY);
    if (!node?.path) return;

    event.preventDefault();
    event.stopPropagation();
    navigate(node.path);
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    containerRef.current.style.cursor = getNodeAtPoint(event.clientX, event.clientY)
      ? "pointer"
      : "grab";
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onClickCapture={handleClickCapture}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-[#323437] bg-white dark:bg-[#080808] cursor-grab active:cursor-grabbing"
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
        cooldownTicks={100}
        d3VelocityDecay={0.3}
        d3AlphaDecay={0.02}
        linkColor={() => colors.link}
        linkWidth={1.5}
        linkCurvature={0}
        onNodeClick={(node) => {
          if (node.path) navigate(node.path);
        }}
        onNodeHover={(node) => {
          if (!containerRef.current) return;
          containerRef.current.style.cursor = node?.path ? "pointer" : "grab";
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const r = node.val * 0.8;
          const showLabel = globalScale > 0.6;

          let fill = colors.page;
          if (node.group === "main") fill = colors.main;

          ctx.shadowColor = fill;
          ctx.shadowBlur = isDark ? 10 : 2;

          ctx.beginPath();
          ctx.arc(node.x!, node.y!, r, 0, Math.PI * 2);
          ctx.fillStyle = fill;
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
