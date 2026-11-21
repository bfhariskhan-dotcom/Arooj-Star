import React, { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  color: string;
}

const SPECTRUM_COLORS = [
  '#e11d48', // Rose
  '#f97316', // Orange
  '#eab308', // Amber/Yellow
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
];

export const CursorLightning: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -200, y: -200, active: false };
    const smooth = { x: -200, y: -200 };
    const sparks: Spark[] = [];
    const trail: TrailPoint[] = [];
    let colorIdx = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (!mouse.active) {
        smooth.x = e.clientX;
        smooth.y = e.clientY;
        mouse.active = true;
      }

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      colorIdx = (colorIdx + 1) % SPECTRUM_COLORS.length;
      const color = SPECTRUM_COLORS[colorIdx];

      if (dist > 3) {
        trail.push({ x: e.clientX, y: e.clientY, age: 0, color });
        if (trail.length > 14) trail.shift();
      }

      // Subtle lightning micro-sparks on cursor move
      if (dist > 6 && sparks.length < 35) {
        const count = dist > 24 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.6 + Math.random() * 1.8;
          sparks.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 16 + Math.random() * 10,
            color: SPECTRUM_COLORS[(colorIdx + i) % SPECTRUM_COLORS.length],
            size: 1.5 + Math.random() * 1.5,
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        smooth.x += (mouse.x - smooth.x) * 0.25;
        smooth.y += (mouse.y - smooth.y) * 0.25;

        // Soft glowing rainbow light halo around cursor
        const grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 85);
        grad.addColorStop(0, 'rgba(244, 63, 94, 0.14)');
        grad.addColorStop(0.35, 'rgba(59, 130, 246, 0.08)');
        grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.04)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, 85, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle electric filament trail
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        if (trail[i].age > 12) {
          trail.splice(i, 1);
        }
      }

      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const alpha = Math.max(0, 1 - p1.age / 12) * 0.45;
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          // Tiny subtle lightning jitter
          const midX = (p0.x + p1.x) / 2 + (Math.random() - 0.5) * 3;
          const midY = (p0.y + p1.y) / 2 + (Math.random() - 0.5) * 3;
          ctx.lineTo(midX, midY);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const alpha = Math.max(0, 1 - s.life / s.maxLife) * 0.7;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
};
