'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ASMRBackgroundProps {
  className?: string;
  particleCount?: number;
  magneticRadius?: number;
  accentColor?: string;
  intensity?: 'subtle' | 'medium' | 'intense';
}

interface IntensityPreset {
  alpha: number;
  glow: number;
  vortex: number;
  pull: number;
  trail: number;
}

const INTENSITY_PRESETS: Record<NonNullable<ASMRBackgroundProps['intensity']>, IntensityPreset> = {
  subtle: { alpha: 0.12, glow: 0.38, vortex: 0.026, pull: 0.052, trail: 0.13 },
  medium: { alpha: 0.17, glow: 0.56, vortex: 0.04, pull: 0.078, trail: 0.11 },
  intense: { alpha: 0.24, glow: 0.78, vortex: 0.058, pull: 0.11, trail: 0.09 },
};

class Particle {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  size = 0;
  alpha = 0;
  color = '';
  rotation = 0;
  rotationSpeed = 0;
  glow = 0;
  isAccent = false;

  reset(width: number, height: number, accentColor: string, config: IntensityPreset) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.15 + 0.45;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.15;
    this.isAccent = Math.random() > 0.9;
    this.color = this.isAccent ? accentColor : '122, 126, 140';
    this.alpha = (Math.random() * config.alpha + 0.03) * (this.isAccent ? 1.3 : 1);
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.glow = 0;
  }
}

const ASMRBackground: React.FC<ASMRBackgroundProps> = ({
  className,
  particleCount = 360,
  magneticRadius = 220,
  accentColor = '102, 163, 255',
  intensity = 'subtle',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const config = INTENSITY_PRESETS[intensity];
    const effectiveParticleCount = reduceMotion ? 0 : Math.round(particleCount * (isMobile ? 0.58 : 1));
    const effectiveRadius = magneticRadius * (isMobile ? 0.86 : 1);

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const mouse = { x: -9999, y: -9999 };
    const particles: Particle[] = [];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      for (let i = 0; i < effectiveParticleCount; i += 1) {
        const p = new Particle();
        p.reset(width, height, accentColor, config);
        particles.push(p);
      }
    };

    const drawStaticFallback = () => {
      ctx.clearRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.34,
        0,
        width * 0.5,
        height * 0.34,
        Math.max(width, height) * 0.66
      );
      glow.addColorStop(0, `rgba(${accentColor}, 0.18)`);
      glow.addColorStop(0.46, `rgba(${accentColor}, 0.07)`);
      glow.addColorStop(1, 'rgba(9, 9, 11, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const staticDustCount = Math.max(70, Math.round((width * height) / 12000));
      for (let i = 0; i < staticDustCount; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.1 + 0.35;
        const alpha = Math.random() * 0.18 + 0.06;
        const isAccent = Math.random() > 0.9;
        const color = isAccent ? accentColor : '122, 126, 140';
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const alpha = Math.min(p.alpha + p.glow * 0.36, 0.62);
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;

      if (p.glow > 0.12) {
        ctx.shadowBlur = p.isAccent ? 12 * p.glow : 7 * p.glow;
        ctx.shadowColor = p.isAccent
          ? `rgba(${accentColor}, ${p.glow * 0.82})`
          : `rgba(172, 190, 220, ${p.glow * 0.35})`;
      }

      ctx.beginPath();
      ctx.moveTo(0, -p.size * 1.75);
      ctx.lineTo(p.size * 0.72, 0);
      ctx.lineTo(0, p.size * 1.75);
      ctx.lineTo(-p.size * 0.72, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.fillStyle = `rgba(9, 9, 11, ${config.trail})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0.0001 && dist < effectiveRadius) {
          const force = (effectiveRadius - dist) / effectiveRadius;
          const nx = dx / dist;
          const ny = dy / dist;

          p.vx += nx * force * config.pull;
          p.vy += ny * force * config.pull;
          p.vx += ny * force * config.vortex * 7;
          p.vy -= nx * force * config.vortex * 7;
          p.glow = force * config.glow;
        } else {
          p.glow *= 0.93;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.968;
        p.vy *= 0.968;
        p.vx += (Math.random() - 0.5) * 0.019;
        p.vy += (Math.random() - 0.5) * 0.019;
        p.rotation += p.rotationSpeed + (Math.abs(p.vx) + Math.abs(p.vy)) * 0.03;

        if (p.x < -18) p.x = width + 18;
        if (p.x > width + 18) p.x = -18;
        if (p.y < -18) p.y = height + 18;
        if (p.y > height + 18) p.y = -18;

        drawParticle(p);
      }

      raf = window.requestAnimationFrame(render);
    };

    const onResize = () => init();

    init();
    if (effectiveParticleCount > 0) {
      render();
    } else {
      drawStaticFallback();
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [particleCount, magneticRadius, accentColor, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 h-full w-full pointer-events-none', className)}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default ASMRBackground;
