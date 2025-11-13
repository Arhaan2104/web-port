'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { smoothSpring } from '@/lib/motion';

const Topbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Transform values for scroll-based animations
  const scale = useTransform(scrollY, [0, 64], [1, 0.9]);
  const height = useTransform(scrollY, [0, 64], [64, 56]);
  const blur = useTransform(scrollY, [0, 64], [12, 16]);
  const borderOpacity = useTransform(scrollY, [0, 64], [0.08, 0.12]);

  // Smooth spring animation for transforms
  const smoothScale = useSpring(scale, smoothSpring);
  const smoothHeight = useSpring(height, smoothSpring);

  // Track scroll state for additional styling
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setHasScrolled(latest > 64);
    });
    return unsubscribe;
  }, [scrollY]);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Lab', href: '/lab' },
    { label: 'Contact', href: '#contact', isHighlighted: true },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        style={{
          scale: smoothScale,
          height: smoothHeight,
          backdropFilter: `blur(${blur}px)`,
        }}
        className={`
          relative w-full max-w-4xl
          rounded-full px-6
          flex items-center justify-between
          transition-all duration-300 ease-out
          ${hasScrolled ? 'shadow-2xl' : 'shadow-lg'}
        `}
      >
        {/* Glass background with dynamic border */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/[0.02]"
          style={{
            border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
          }}
        />

        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-inner opacity-50" />

        {/* Left: Name and title */}
        <div className="relative flex items-center gap-2 text-sm">
          <span className="font-medium tracking-wide text-ink">
            ARHAAN GUPTA
          </span>
          <span className="text-muted">|</span>
          <span className="text-muted tracking-wider text-xs uppercase">
            Product Designer • Delhi, India
          </span>
        </div>

        {/* Right: Navigation */}
        <nav className="relative">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`
                    relative text-sm font-medium tracking-wide
                    transition-all duration-200 ease-out
                    ${
                      item.isHighlighted
                        ? 'gradient-text hover:opacity-80'
                        : 'text-muted hover:text-ink'
                    }
                    group
                  `}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  {/* Hover underline effect */}
                  <span
                    className={`
                      absolute -bottom-1 left-0 right-0 h-px
                      transition-all duration-200 ease-out
                      ${
                        item.isHighlighted
                          ? 'bg-gradient-to-r from-electric-start to-electric-end'
                          : 'bg-ink'
                      }
                      scale-x-0 group-hover:scale-x-100
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Topbar;