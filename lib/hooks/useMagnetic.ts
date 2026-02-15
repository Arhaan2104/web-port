'use client';

import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, MotionStyle } from 'framer-motion';
import { magneticConfig } from '@/lib/motion';

interface UseMagneticOptions {
  strength?: number;
  distance?: number;
}

interface UseMagneticReturn {
  ref: React.RefObject<HTMLElement | null>;
  style: MotionStyle;
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
  };
}

export function useMagnetic(options: UseMagneticOptions = {}): UseMagneticReturn {
  const { strength = magneticConfig.strength, distance = magneticConfig.distance } = options;
  const ref = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (dist < distance) {
        x.set(deltaX * strength);
        y.set(deltaY * strength);
      }
    },
    [strength, distance, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    style: { x: springX, y: springY },
    handlers: { onMouseMove, onMouseLeave },
  };
}
