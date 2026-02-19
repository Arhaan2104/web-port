'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import MagneticWrapper from './MagneticWrapper';

interface RippleData {
  x: number;
  y: number;
  id: number;
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, asChild, magnetic = false, onPointerDown, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleData[]>([]);
    const rippleTimeoutsRef = useRef<number[]>([]);

    useEffect(() => {
      return () => {
        rippleTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
        rippleTimeoutsRef.current = [];
      };
    }, []);

    const variants = {
      primary:
        'bg-electric text-obsidian-base hover:bg-electric-end ' +
        'shadow-glow hover:shadow-glow-lg',
      secondary:
        'bg-white/[0.05] text-ink hover:bg-white/[0.08] ' +
        'border border-white/10 hover:border-white/20',
      ghost:
        'bg-transparent text-muted hover:text-ink ' +
        'hover:bg-white/[0.03]',
      glass:
        'glass-interactive text-ink',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const ripple: RippleData = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          id: Date.now(),
        };
        setRipples((prev) => [...prev, ripple]);
        // Clean up after animation
        const timeoutId = window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          rippleTimeoutsRef.current = rippleTimeoutsRef.current.filter((id) => id !== timeoutId);
        }, 650);
        rippleTimeoutsRef.current.push(timeoutId);
        onPointerDown?.(e);
      },
      [onPointerDown]
    );

    const rippleColor =
      variant === 'primary'
        ? 'rgba(11, 11, 12, 0.2)' // dark ripple on electric bg
        : 'rgba(102, 163, 255, 0.15)'; // electric ripple on dark bg

    const buttonEl = (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 overflow-hidden',
          'rounded-full font-medium transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-base',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full animate-ripple-expand pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              backgroundColor: rippleColor,
            }}
          />
        ))}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );

    if (magnetic) {
      return <MagneticWrapper>{buttonEl}</MagneticWrapper>;
    }

    return buttonEl;
  }
);

Button.displayName = 'Button';

export default Button;
