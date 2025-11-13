'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedCard from './FeaturedCard';
import { projects } from '@/lib/projects';
import { stagger } from '@/lib/motion';

const FeaturedList: React.FC = () => {
  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Real products shaped by thoughtful design, behavioural insight, and modern tools.
          </p>
        </motion.div>

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
    </section>
  );
};

export default FeaturedList;