'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import ImageShimmer from '@/components/ui/ImageShimmer';
import { useImagePreload } from '@/lib/hooks/useImagePreload';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SplitTextReveal from '@/components/ui/SplitTextReveal';

const featured = projects.filter((p) => p.featured);
const allWork = projects.filter((p) => !p.featured);

export default function WorkPage() {
  const { preloadImage } = useImagePreload();

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
          <SplitTextReveal
            text="Selected Work"
            as="h1"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-display"
          />
          <p className="text-xl text-white/70 max-w-3xl">
            A collection of projects that showcase my approach to solving
            complex problems through thoughtful design and technology.
          </p>
        </motion.div>

        {/* ── Featured ── */}
        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm font-urbanist font-medium uppercase tracking-[0.2em] text-white/40 mb-8"
          >
            Featured
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            variants={stagger(0.08)}
            initial="initial"
            animate="animate"
          >
            {featured.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={index < 2}
                onHover={() => preloadImage(project.image)}
              />
            ))}
          </motion.div>
        </section>

        {/* ── All Work ── */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-sm font-urbanist font-medium uppercase tracking-[0.2em] text-white/40 mb-8"
          >
            All Work
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            variants={stagger(0.08)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {allWork.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={false}
                onHover={() => preloadImage(project.image)}
              />
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

/* ── Shared project card ── */
function ProjectCard({
  project,
  priority,
  onHover,
}: {
  project: (typeof projects)[number];
  priority: boolean;
  onHover: () => void;
}) {
  const isExternal = project.href.startsWith('http');
  const LinkEl = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { href: project.href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href: project.href };

  return (
    <motion.article
      variants={fadeUp}
      className="group relative"
      onMouseEnter={onHover}
    >
      <LinkEl {...linkProps} className="block space-y-4">
        {/* Project Image — Ken Burns on hover */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl glass">
          <ImageShimmer
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover brightness-[0.82] transition-transform duration-[8000ms] ease-out group-hover:scale-[1.08] group-hover:translate-x-[6px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Project Info */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold group-hover:text-electric transition-colors duration-300">
            {project.title}
          </h3>

          <div className="space-y-2 transition-all duration-300 ease-out opacity-60 group-hover:opacity-100">
            <div className="flex items-center gap-3">
              <Tag size="sm" variant="electric">
                {project.tag}
              </Tag>
              {project.year && (
                <span className="text-xs text-white/50">{project.year}</span>
              )}
            </div>

            <p className="text-white/70 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-electric opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out pt-1">
            <span className="text-sm font-medium">
              {isExternal ? 'Visit Site' : 'View Project'}
            </span>
            {isExternal ? (
              <ExternalLink className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </div>
        </div>
      </LinkEl>
    </motion.article>
  );
}
