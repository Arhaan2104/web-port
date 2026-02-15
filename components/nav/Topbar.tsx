'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, LayoutGroup } from 'framer-motion';
import { smoothSpring } from '@/lib/motion';
import MobileNav from './MobileNav';
import MagneticWrapper from '@/components/ui/MagneticWrapper';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Lab', href: '/lab' },
  { label: 'Contact', href: '#contact', isHighlighted: true },
];

const Topbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Transform values for scroll-based animations
  const scale = useTransform(scrollY, [0, 64], [1, 0.9]);
  const height = useTransform(scrollY, [0, 64], [64, 56]);
  const blur = useTransform(scrollY, [0, 64], [12, 16]);
  const borderOpacity = useTransform(scrollY, [0, 64], [0.08, 0.12]);

  // Motion templates for CSS string interpolation with MotionValues
  const backdropBlur = useMotionTemplate`blur(${blur}px)`;
  const borderStyle = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;

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

  // Check if a nav item is the active route
  const isActive = (href: string) => {
    if (href === '#contact') return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          style={{
            scale: smoothScale,
            height: smoothHeight,
            backdropFilter: backdropBlur,
          }}
          className={`
            relative w-full max-w-4xl
            rounded-full px-5 md:px-6
            flex items-center justify-between
            transition-all duration-300 ease-out
            ${hasScrolled ? 'shadow-2xl' : 'shadow-lg'}
          `}
        >
          {/* Glass background with dynamic border */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/[0.02]"
            style={{
              border: borderStyle,
            }}
          />

          {/* Inner shadow for depth */}
          <div className="absolute inset-0 rounded-full shadow-inner opacity-50" />

          {/* Left: Name and title */}
          <div className="relative flex items-center gap-2 text-sm">
            <Link href="/" className="font-medium tracking-wide text-ink hover:text-electric transition-colors duration-200">
              ARHAAN GUPTA
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white/50 tracking-wider text-xs uppercase hidden sm:inline">
              Product Designer • Delhi, India
            </span>
          </div>

          {/* Right: Desktop Navigation */}
          <nav className="relative hidden md:block">
            <LayoutGroup>
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <MagneticWrapper strength={0.3} distance={60}>
                      <Link
                        href={item.href}
                        className={`
                          relative text-sm font-medium tracking-wide
                          transition-all duration-200 ease-out
                          ${
                            item.isHighlighted
                              ? 'gradient-text hover:opacity-80'
                              : isActive(item.href)
                              ? 'text-white'
                              : 'text-white/70 hover:text-white'
                          }
                          group/navlink
                        `}
                        aria-label={`Navigate to ${item.label}`}
                      >
                        {item.label}
                        {/* Hover underline — gradient sweep reveal via group hover */}
                        <span
                          className={`
                            absolute -bottom-1 left-0 right-0 h-px
                            ${
                              item.isHighlighted
                                ? 'bg-gradient-to-r from-electric-start to-electric-end'
                                : 'bg-gradient-to-r from-electric/60 to-electric-end/60'
                            }
                            origin-left scale-x-0 group-hover/navlink:scale-x-100
                            transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                          `}
                        />
                        {/* Active route dot */}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="nav-active-dot"
                            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-electric"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </Link>
                    </MagneticWrapper>
                  </li>
                ))}
              </ul>
            </LayoutGroup>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="relative md:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="absolute w-5 h-px bg-ink"
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 0 : -4,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute w-5 h-px bg-ink"
              animate={{
                opacity: mobileOpen ? 0 : 1,
              }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute w-5 h-px bg-ink"
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? 0 : 4,
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile navigation overlay */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </>
  );
};

export default Topbar;
