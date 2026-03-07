'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';

const footerNav = [
  { label: 'Work', href: '/work' },
];

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/[0.06]">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20"
        variants={stagger()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left — Name + tagline */}
          <motion.div variants={fadeUp}>
            <Link
              href="/"
              className="text-lg font-urbanist font-semibold text-ink hover:text-electric transition-colors duration-200"
            >
              Arhaan Gupta
            </Link>
            <p className="text-sm text-white/50 mt-2">
              Product Designer & Design Engineer
            </p>
          </motion.div>

          {/* Center — Navigation */}
          <motion.nav variants={fadeUp} className="flex flex-col gap-3 md:items-center">
            {footerNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>

          {/* Right — Contact */}
          <motion.div variants={fadeUp} className="md:text-right">
            <p className="text-xs text-white/[0.45] font-urbanist uppercase tracking-[0.15em] mb-3">
              Get in touch
            </p>
            <a
              href="mailto:arhaan21gupta@gmail.com"
              className="text-sm text-white/70 hover:text-electric transition-colors duration-200"
            >
              arhaan21gupta@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Arhaan Gupta. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Delhi, India
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
