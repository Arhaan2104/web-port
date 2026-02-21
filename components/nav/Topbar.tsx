'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { smoothSpring } from '@/lib/motion';
import MagneticWrapper from '@/components/ui/MagneticWrapper';

const Topbar: React.FC = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const isWorkContext = pathname?.startsWith('/work');
  const navLabel = isWorkContext ? 'Home' : 'Work';
  const navHref = isWorkContext ? '/' : '/work';

  // Condensed at top, expands as user scrolls
  const rawMaxWidth = useTransform(scrollY, [0, 100], [620, 980]);
  const maxWidth = useSpring(rawMaxWidth, smoothSpring);

  // Nav links progressively reveal as pill expands
  const navOpacity = useTransform(scrollY, [30, 100], [0, 1]);
  const navWidth = useTransform(scrollY, [30, 100], [0, 64]);

  // Glass intensifies on scroll
  const blur = useTransform(scrollY, [0, 100], [12, 20]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0.02, 0.06]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.06, 0.12]);

  // Motion templates (avoid [object Object] SSR bug)
  const backdropBlur = useMotionTemplate`blur(${blur}px)`;
  const bgColor = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;

  return (
    <motion.header
      className="fixed left-0 right-0 z-50 flex justify-center px-4 md:px-6"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="w-full rounded-full navbar-glass px-5 py-2.5 flex items-center justify-between"
        style={{
          maxWidth,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          backgroundColor: bgColor,
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        {/* Left: Name */}
        <MagneticWrapper strength={0.3} distance={60}>
          <Link href="/" className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="font-urbanist font-semibold tracking-[0.15em] uppercase text-ink hover:text-electric transition-colors duration-200 whitespace-nowrap">
              Arhaan Gupta
            </span>
            <span className="text-content-quiet hidden sm:inline">|</span>
            <span className="text-content-subtle tracking-wider text-xs uppercase hidden sm:inline whitespace-nowrap">
              Design Engineer
            </span>
          </Link>
        </MagneticWrapper>

        {/* Right: Work (on expand) + divider + LinkedIn */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.nav
            className="overflow-hidden whitespace-nowrap text-right"
            style={{ opacity: navOpacity, width: navWidth }}
          >
            <Link
              href={navHref}
              className="inline-flex min-h-10 items-center px-1 eyebrow font-medium text-content-muted hover:text-electric transition-colors duration-200"
            >
              {navLabel}
            </Link>
          </motion.nav>

          <motion.span
            className="h-4 w-px bg-white/20"
            style={{ opacity: navOpacity }}
            aria-hidden="true"
          />

          <MagneticWrapper strength={0.3} distance={60}>
            <a
              href="https://www.linkedin.com/in/arhaangupta-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md -m-1 p-1 text-[#0A66C2] hover:text-[#0077B5] transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </MagneticWrapper>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Topbar;
