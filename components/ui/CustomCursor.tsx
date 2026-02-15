'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cursorDotSpring, cursorRingSpring } from '@/lib/motion';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, cursorDotSpring);
  const dotY = useSpring(mouseY, cursorDotSpring);
  const ringX = useSpring(mouseX, cursorRingSpring);
  const ringY = useSpring(mouseY, cursorRingSpring);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    // Add cursor-custom class to body
    document.body.classList.add('cursor-custom');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect interactive elements for ring scale
    const handlePointerCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handlePointerCheck);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handlePointerCheck);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot — tight, follows cursor closely */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-electric"
          animate={{
            width: isPointer ? 6 : 8,
            height: isPointer ? 6 : 8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Ring — looser spring, lags behind for premium feel */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-electric/30"
          animate={{
            width: isPointer ? 56 : 40,
            height: isPointer ? 56 : 40,
            opacity: isVisible ? 1 : 0,
            borderColor: isPointer
              ? 'rgba(102, 163, 255, 0.5)'
              : 'rgba(102, 163, 255, 0.3)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
