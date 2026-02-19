'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
}

export function useCountUp({ end, duration = 1500, delay = 0 }: UseCountUpOptions): [number, React.RefObject<HTMLElement | null>] {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    let frameId: number | null = null;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(end);
      hasAnimated.current = true;
      return;
    }

    const timeout = setTimeout(() => {
      hasAnimated.current = true;
      const startTime = performance.now();

      function animate(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const nextValue = Math.round(easedProgress * end);

        setValue((prev) => (prev === nextValue ? prev : nextValue));

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      }

      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, end, duration, delay]);

  return [value, ref];
}

/**
 * Parse a metric string and extract the leading number + suffix.
 * Returns null if no leading number is found.
 * Examples:
 *   "400+" → { number: 400, suffix: "+" }
 *   "13"   → { number: 13, suffix: "" }
 *   "TicCon 2025" → null
 */
export function parseMetric(metric: string): { number: number; suffix: string } | null {
  const match = metric.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: parseInt(match[1], 10), suffix: match[2] };
}
