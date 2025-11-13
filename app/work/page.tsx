'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import { ArrowRight } from 'lucide-react';

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Selected Work
          </h1>
          <p className="text-xl text-muted max-w-3xl">
            A collection of projects that showcase my approach to solving
            complex problems through thoughtful design and technology.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={stagger(0.08)}
          initial="initial"
          animate="animate"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={fadeUp}
              className="group relative"
            >
              <Link href={project.href} className="block space-y-4">
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl glass">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Project Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Tag size="sm" variant="electric">
                      {project.tag}
                    </Tag>
                    {project.year && (
                      <span className="text-xs text-muted">{project.year}</span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold group-hover:text-electric transition-colors duration-300">
                    {project.title}
                  </h2>

                  <p className="text-muted line-clamp-2">
                    {project.description}
                  </p>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <span className="text-sm font-medium">View Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}