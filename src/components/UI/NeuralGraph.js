import { useEffect, useRef } from "react";

// Ambient "neural graph" canvas for the hero background. Warm + cool nodes read
// like an embedding graph; the field drifts slowly and reacts gently to the
// cursor. Sits behind the hero content (pointer-events: none) and respects
// prefers-reduced-motion by painting a single static frame.
const NeuralGraph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const NODE_WARM = "178,90,42"; // terracotta
    const NODE_COOL = "91,108,184"; // indigo

    let W = 0;
    let H = 0;
    let DPR = 1;
    let nodes = [];
    let raf;
    const mouse = { px: 0, py: 0, x: 0.5, y: 0.5, active: false };

    const init = () => {
      nodes = [];
      const count = W < 700 ? 42 : 90;
      for (let i = 0; i < count; i++) {
        const hub = Math.random() < 0.12;
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.07,
          vy: (Math.random() - 0.5) * 0.07,
          base: hub ? 2.6 + Math.random() * 1.4 : 1 + Math.random() * 1.1,
          hub,
          cool: Math.random() < 0.3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      init();
    };

    const drawGraph = (t) => {
      const shiftX = mouse.active ? (mouse.x - 0.5) * 24 : 0;
      const shiftY = mouse.active ? (mouse.y - 0.5) * 16 : 0;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + shiftX * (a.hub ? 1.4 : 1);
        const ay = a.y + shiftY * (a.hub ? 1.4 : 1);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x + shiftX * (b.hub ? 1.4 : 1);
          const by = b.y + shiftY * (b.hub ? 1.4 : 1);
          const dx = ax - bx;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const al = (1 - Math.sqrt(d2) / 150) * 0.16;
            const col = a.cool && b.cool ? NODE_COOL : NODE_WARM;
            ctx.strokeStyle = "rgba(" + col + "," + al + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = ax - mouse.px;
          const dy = ay - mouse.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < 200 * 200) {
            const al = (1 - Math.sqrt(d2) / 200) * 0.4;
            ctx.strokeStyle = "rgba(" + NODE_WARM + "," + al + ")";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(mouse.px, mouse.py);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const nx = n.x + shiftX * (n.hub ? 1.4 : 1);
        const ny = n.y + shiftY * (n.hub ? 1.4 : 1);
        const r =
          n.base * (reduce ? 1 : 1 + Math.sin(t * 0.8 + n.pulse) * 0.18);
        const col = n.cool ? NODE_COOL : NODE_WARM;
        if (n.hub) {
          const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 4);
          g.addColorStop(0, "rgba(" + col + ",0.35)");
          g.addColorStop(1, "rgba(" + col + ",0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(nx, ny, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(" + col + "," + (n.hub ? 0.85 : 0.5) + ")";
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now) => {
      ctx.clearRect(0, 0, W, H);
      drawGraph(now / 1000);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouse.px = e.clientX - rect.left;
      mouse.py = e.clientY - rect.top;
      mouse.x = mouse.px / rect.width;
      mouse.y = mouse.py / rect.height;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    if (reduce) {
      ctx.clearRect(0, 0, W, H);
      drawGraph(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default NeuralGraph;
