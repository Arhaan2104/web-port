'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useKonamiCode } from '@/lib/hooks/useKonamiCode';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
}

const EasterEgg: React.FC = () => {
  const triggered = useKonamiCode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!triggered || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Spawn burst of particles
    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 * i) / 120 + Math.random() * 0.5;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        alpha: 0.8 + Math.random() * 0.2,
        decay: 0.015 + Math.random() * 0.01,
      });
    }

    let animId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        if (p.alpha <= 0) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(102, 163, 255, ${Math.max(0, p.alpha)})`;
        ctx.fill();
      }

      if (alive) {
        animId = requestAnimationFrame(animate);
      }
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, [triggered]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
