'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedProjects, projects } from '@/lib/projects';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import ImageShimmer from '@/components/ui/ImageShimmer';
import { useImagePreload } from '@/lib/hooks/useImagePreload';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SplitTextReveal from '@/components/ui/SplitTextReveal';

const featured = getFeaturedProjects();
const allWork = projects.filter((p) => !p.featured);
const PROJECT_BRAND_RGB: Record<string, string> = {
  coralehr: '243,106,89',
  ticvision: '88,156,180',
  studbud: '143,169,143',
  leanspark: '216,164,92',
  flowatlas: '108,188,198',
};

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
            text="Work"
            as="h1"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-display"
          />
          <div className="h-px w-16 bg-white/20" aria-hidden="true" />
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
              <div
                key={project.id}
                className="first:border-t-0 border-t border-white/[0.06] pt-8 first:pt-0 md:border-t-0 md:pt-0"
              >
                <ProjectCard
                  project={project}
                  priority={index < 2}
                  depthEnhanced
                  onHover={() => preloadImage(project.image)}
                />
              </div>
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
            {allWork.map((project, index) => (
              <div
                key={project.id}
                className="first:border-t-0 border-t border-white/[0.06] pt-8 first:pt-0 md:border-t-0 md:pt-0"
              >
                <ProjectCard
                  project={project}
                  priority={false}
                  depthEnhanced={false}
                  onHover={() => preloadImage(project.image)}
                />
              </div>
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
  depthEnhanced,
  onHover,
}: {
  project: (typeof projects)[number];
  priority: boolean;
  depthEnhanced: boolean;
  onHover: () => void;
}) {
  const isExternal = project.href.startsWith('http');
  const LinkEl = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { href: project.href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href: project.href };
  const brandRgb = PROJECT_BRAND_RGB[project.id] ?? '160,160,160';
  const pointerVars = { '--px': '50%', '--py': '50%' } as React.CSSProperties;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!depthEnhanced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--px', `${x}%`);
    event.currentTarget.style.setProperty('--py', `${y}%`);
  };

  return (
    <motion.article
      variants={fadeUp}
      className="group relative"
      onMouseEnter={onHover}
      onPointerMove={handlePointerMove}
      style={{ ...pointerVars, ['--brand-rgb' as string]: brandRgb }}
    >
      <LinkEl {...linkProps} className="block h-full space-y-4">
        {/* Project Image — Ken Burns on hover */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl glass">
          <div
            className="absolute -inset-3 z-[5] pointer-events-none opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(380px circle at var(--px, 50%) var(--py, 50%), rgba(var(--brand-rgb), 0.06), rgba(var(--brand-rgb), 0.02) 38%, rgba(var(--brand-rgb), 0) 72%)',
            }}
          />
          {depthEnhanced && (
            <div
              className="absolute inset-0 z-[15] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(420px circle at var(--px, 50%) var(--py, 50%), rgba(var(--brand-rgb), 0.035), rgba(var(--brand-rgb), 0.012) 35%, rgba(var(--brand-rgb), 0) 70%)',
              }}
            />
          )}
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
        <div className="space-y-2 flex md:min-h-[170px] flex-col">
          <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-[rgb(var(--brand-rgb))]">
            {project.title}
          </h3>

          <div className="space-y-2 transition-all duration-300 ease-out opacity-60 group-hover:opacity-100 flex-1">
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

          <div className="pt-1 mt-auto">
            <span className="group/cta relative inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.02] px-4 py-2.5 text-sm font-urbanist font-medium text-content-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/35 hover:bg-white/[0.05] hover:text-ink hover:shadow-[0_0_22px_rgba(102,163,255,0.12)]">
              <span
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-electric/15 to-transparent opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
                aria-hidden="true"
              />
              <span className="relative z-10 tracking-[0.01em]">
                {isExternal ? 'Visit Site' : 'View Project'}
              </span>
              <span
                className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] transition-all duration-300 group-hover/cta:border-electric/45 group-hover/cta:bg-electric/12"
                aria-hidden="true"
              >
                {isExternal ? (
                  <ExternalLink className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                )}
              </span>
            </span>
          </div>
        </div>
      </LinkEl>
    </motion.article>
  );
}
