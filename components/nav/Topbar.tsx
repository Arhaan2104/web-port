'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, LayoutGroup } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { smoothSpring } from '@/lib/motion';
import MobileNav from './MobileNav';
import MagneticWrapper from '@/components/ui/MagneticWrapper';

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '#contact', isHighlighted: true },
];

const Topbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // ── Scroll-driven motion values ──
  const scale = useTransform(scrollY, [0, 64], [1, 0.9]);
  const height = useTransform(scrollY, [0, 64], [64, 56]);

  // Stronger blur for real frosted-glass separation
  const blur = useTransform(scrollY, [0, 64], [16, 24]);

  // Layered glass opacities — denser than before
  const bgOpacity = useTransform(scrollY, [0, 64], [0.03, 0.06]);
  const tintOpacity = useTransform(scrollY, [0, 64], [0.3, 0.5]);
  const borderOpacity = useTransform(scrollY, [0, 64], [0.10, 0.15]);
  const shadowOpacity = useTransform(scrollY, [0, 64], [0.2, 0.4]);

  // ── Motion templates ──
  const backdropBlur = useMotionTemplate`blur(${blur}px)`;
  const bgStyle = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const tintStyle = useMotionTemplate`rgba(11, 11, 12, ${tintOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const boxShadow = useMotionTemplate`0 4px 24px rgba(0, 0, 0, ${shadowOpacity}), 0 0 0 1px rgba(255, 255, 255, 0.04)`;

  // ── Smooth springs ──
  const smoothScale = useSpring(scale, smoothSpring);
  const smoothHeight = useSpring(height, smoothSpring);

  // Track scroll state
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setHasScrolled(latest > 64);
    });
    return unsubscribe;
  }, [scrollY]);

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
            WebkitBackdropFilter: backdropBlur,
            boxShadow,
          }}
          className="relative w-full max-w-4xl rounded-full px-5 md:px-6 flex items-center justify-between"
        >
          {/* ── Glass layers ── */}

          {/* 1. Dark tint — ensures contrast over any content */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: tintStyle }}
          />

          {/* 2. Glass sheen + top-edge luminous highlight */}
          <motion.div
            className="absolute inset-0 rounded-full navbar-glass"
            style={{
              backgroundColor: bgStyle,
              border: '1px solid',
              borderColor,
            }}
          />

          {/* ── Content ── */}

          {/* Left: Name and title */}
          <div className="relative flex items-center gap-2 text-sm">
            <Link href="/" className="font-medium tracking-wide text-ink hover:text-electric transition-colors duration-200">
              ARHAAN GUPTA
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white/50 tracking-wider text-xs uppercase hidden sm:inline">
              Design Engineer • India
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
            <span className="w-px h-4 bg-white/10 mx-1" />
            <MagneticWrapper strength={0.3} distance={60}>
              <a
                href="https://www.linkedin.com/in/arhaangupta-/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </MagneticWrapper>
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
