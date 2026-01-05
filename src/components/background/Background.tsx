import { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let animationFrameId: number;
    let time = 0;

    const gridSpacing = 30;
    const lineLength = 15;
    const interactionRadius = 200;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      
      ctx.strokeStyle = isDark ? "rgba(128, 160, 255, 0.2)" : "rgba(75, 85, 99, 0.35)";
      ctx.lineWidth = 1.5;

      for (let x = 0; x < w; x += gridSpacing) {
        for (let y = 0; y < h; y += gridSpacing) {
          
          const baseAngle = (Math.cos(x * 0.005 + time) + Math.sin(y * 0.005 + time)) * Math.PI;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let angle = baseAngle;

          if (distance < interactionRadius) {
            const mouseAngle = Math.atan2(dy, dx);
            const force = (interactionRadius - distance) / interactionRadius;
            angle += (mouseAngle - angle) * force;
          }

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(angle) * lineLength, 
            y + Math.sin(angle) * lineLength
          );
          ctx.stroke();
        }
      }

      time += 0.005;
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 pointer-events-none" 
    />
  );
};

export default Background;