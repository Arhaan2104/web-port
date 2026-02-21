'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FeaturedCard from './FeaturedCard';
import { getFeaturedProjects } from '@/lib/projects';
import { stagger } from '@/lib/motion';
import { TypingAnimation } from '@/components/ui/typing-animation';
import Button from '@/components/ui/Button';

const FeaturedList: React.FC = () => {
  // Get featured projects
  const featuredProjects = getFeaturedProjects();

  // Scroll-based opacity for grid background
  const { scrollYProgress } = useScroll();
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 0.07]);

  return (
    <section className="relative">
      {/* Ambient light bleed — top boundary */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-electric/[0.04] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Work header with typing animation */}
      <div className="relative bg-obsidian-base py-16 md:py-20 lg:py-24 border-b border-white/[0.03]">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {/* Subtle glow effect behind text */}
                <div className="absolute inset-0 blur-2xl opacity-30">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-electric/10 to-transparent" />
                </div>

                <TypingAnimation
                  as="h2"
                  className="relative text-5xl md:text-6xl lg:text-7xl font-urbanist font-bold tracking-tight leading-none mb-6 text-ink drop-shadow-[0_0_35px_rgba(102,163,255,0.25)]"
                  words={["Work.", "Projects.", "Creations."]}
                  typeSpeed={100}
                  deleteSpeed={60}
                  pauseDelay={1500}
                  delay={520}
                  loop
                  startOnView
                  cursorStyle="line"
                  blinkCursor
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20" />
                <p className="text-sm md:text-base text-white/40 font-urbanist tracking-[0.2em] uppercase">
                  Featured
                </p>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured projects with grid background */}
      <div className="relative bg-obsidian-base overflow-hidden">
        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: gridOpacity,
          }}
          initial={{ filter: "blur(8px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(102, 163, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(102, 163, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </motion.div>

        <div className="relative z-10 px-6 md:px-12 lg:px-24 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">

            {/* Featured cards with alternating layout */}
            <motion.div
              className="space-y-20 md:space-y-32"
              variants={stagger(0.1)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
            >
              {featuredProjects.map((project, index) => (
                <FeaturedCard
                  key={project.id}
                  project={project}
                  index={index}
                  isReversed={index % 2 === 1}
                />
              ))}
            </motion.div>

            {/* See More button */}
            <motion.div
              className="flex justify-center pt-16 md:pt-20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/work">
                <Button variant="glass" size="lg" magnetic>
                  See More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Ambient light bleed — bottom boundary */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[180px] bg-electric/[0.03] blur-[100px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default FeaturedList;
