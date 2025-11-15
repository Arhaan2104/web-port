'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeaturedCard from './FeaturedCard';
import { projects } from '@/lib/projects';
import { stagger } from '@/lib/motion';
import { LampContainer } from '@/components/ui/lamp';

const FeaturedList: React.FC = () => {
  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  // Scroll-based opacity for grid background
  const { scrollYProgress } = useScroll();
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 0.07]);

  return (
    <section className="relative">
      {/* Lamp effect with Work header */}
      <LampContainer>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-center text-ink"
        >
          Work
        </motion.h2>
      </LampContainer>

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

        <div className="relative z-10 px-6 md:px-12 lg:px-24 py-20 md:py-32">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedList;