'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for 3D orb to prevent SSR issues
const CursorOrb = dynamic(() => import('./CursorOrb'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-electric/5 to-transparent rounded-full animate-pulse" />
  ),
});

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* 3D Orb Background */}
      <div className="absolute inset-0">
        <CursorOrb />
        {/* Subtle glow effect behind orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-electric/10 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* CTA Button */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Link
          href="/work"
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full glass-interactive text-ink font-medium transition-all duration-300 hover:gap-4"
          aria-label="View my work portfolio"
        >
          {/* Pulse ring effect on hover */}
          <span className="absolute inset-0 rounded-full bg-electric opacity-0 group-hover:opacity-20 group-hover:animate-ping" />

          {/* Button text */}
          <span className="relative">View Work</span>

          {/* Arrow icon */}
          <ArrowRight
            className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-base/50 to-obsidian-dark/80" />

        {/* Decorative blur spots */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-electric/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-electric/3 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};

export default HeroSection;