import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const LAYERS = [
      { count: 20, speed: 0.15, size: 1.2, alpha: 0.12 },
      { count: 30, speed: 0.3, size: 1.6, alpha: 0.18 },
      { count: 25, speed: 0.5, size: 2.1, alpha: 0.22 },
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    /* ---------------- CREATE PARTICLES ---------------- */

    particles = [];
    LAYERS.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * layer.speed,
          vy: (Math.random() - 0.5) * layer.speed,
          r: layer.size,
          alpha: layer.alpha,
        });
      }
    });

    /* ---------------- DRAW LOOP ---------------- */

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`;
        ctx.fill();

        // connect nearby particles (neural threads)
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(59,130,246,${0.04})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}