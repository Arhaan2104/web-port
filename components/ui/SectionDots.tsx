'use client';

import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const SECTIONS = ['Hero', 'Work', 'About'];

const SectionDots: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = React.useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) setActive(0);
    else if (latest < 0.7) setActive(1);
    else setActive(2);
  });

  const scrollToSection = (index: number) => {
    const targets = [0, 0.3, 0.85];
    const y = targets[index] * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {SECTIONS.map((label, i) => (
        <button
          key={label}
          onClick={() => scrollToSection(i)}
          className="group relative flex items-center"
          aria-label={`Scroll to ${label} section`}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            animate={{
              backgroundColor: active === i ? '#66A3FF' : 'rgba(255, 255, 255, 0.2)',
              scale: active === i ? 1.4 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Label on hover */}
          <span className="absolute left-5 text-2xs font-urbanist uppercase tracking-[0.15em] text-white/0 group-hover:text-white/50 transition-colors duration-200 whitespace-nowrap">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionDots;
