import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  o: number;
}

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    let cx = w / 2;
    let cy = h / 2;

    canvas.width = w;
    canvas.height = h;

    const STAR_COUNT = 800;
    const SPEED = 2.5;

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: Math.random() * w,
      o: Math.random(),
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      cx = w / 2;
      cy = h / 2;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX - cx) * 0.05;
      mouseRef.current.y = (e.clientY - cy) * 0.05;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");

      const centerX = cx - mouseRef.current.x;
      const centerY = cy - mouseRef.current.y;

      stars.forEach((s) => {
        s.z -= SPEED;

        if (s.z <= 0) {
          s.z = w;
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
        }

        const perspective = w / s.z;
        const x = centerX + s.x * perspective;
        const y = centerY + s.y * perspective;

        const radius = (2 - s.z / w) * 1.5;

        const alpha = (1 - s.z / w) * s.o;

        if (x >= 0 && x <= w && y >= 0 && y <= h && alpha > 0) {
          ctx.beginPath();
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${alpha})` 
            : `rgba(30, 41, 59, ${alpha})`; 

          ctx.arc(x, y, radius > 0 ? radius : 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

export default Background;
