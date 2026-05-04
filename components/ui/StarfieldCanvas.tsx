"use client";

import { useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  orbitRadius: number;
  angle: number;
  speed: number;
  size: number;
  alpha: number;
  driftPhase: number;
  driftSpeed: number;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useMousePosition();
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 200;
    const REPULSION_RADIUS = 150;
    const REPULSION_FORCE = 3;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const orbitRadius = 50 + Math.random() * 250;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: cx + Math.cos(angle) * orbitRadius,
          y: cy + Math.sin(angle) * orbitRadius,
          baseX: cx + (Math.random() - 0.5) * 100,
          baseY: cy + (Math.random() - 0.5) * 100,
          orbitRadius,
          angle,
          speed: (0.002 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
          size: 0.5 + Math.random() * 2,
          alpha: 0.2 + Math.random() * 0.6,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.005 + Math.random() * 0.005,
        });
      }
      particlesRef.current = particles;
    };

    resize();
    initParticles();

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const p of particlesRef.current) {
        p.angle += p.speed;
        p.driftPhase += p.driftSpeed;

        const driftX = Math.sin(p.driftPhase) * 20;
        const driftY = Math.cos(p.driftPhase * 0.7) * 20;

        let px = p.baseX + Math.cos(p.angle) * p.orbitRadius + driftX;
        let py = p.baseY + Math.sin(p.angle) * p.orbitRadius + driftY;

        p.baseX += (cx - canvas.width / 2) * 0.001;
        p.baseY += (cy - canvas.height / 2) * 0.001;

        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let sizeMult = 1;

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * REPULSION_FORCE;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
          sizeMult = 1 + (1 - dist / REPULSION_RADIUS);
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size * sizeMult, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      const newCx = canvas.width / 2;
      const newCy = canvas.height / 2;
      for (const p of particlesRef.current) {
        p.baseX = newCx + (Math.random() - 0.5) * 100;
        p.baseY = newCy + (Math.random() - 0.5) * 100;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
