'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeLeft, fadeRight, smoothSpring } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import { CometCard } from '@/components/ui/comet-card';
import ImageShimmer from '@/components/ui/ImageShimmer';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import MetaPill from '@/components/ui/MetaPill';
import { useImagePreload } from '@/lib/hooks/useImagePreload';

import type { Project } from '@/lib/projects';

interface FeaturedCardProps {
  project: Project;
  index: number;
  isReversed?: boolean;
}

const PROJECT_BRAND_RGB: Record<string, string> = {
  coralehr: '243,106,89',
  ticvision: '88,156,180',
  studbud: '143,169,143',
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ project, index, isReversed = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const { preloadImage } = useImagePreload();

  // Parallax effect for image
  const y = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const smoothY = useSpring(y, smoothSpring);

  // Content animation variants
  const contentVariants = isReversed ? fadeRight : fadeLeft;
  const imageVariants = isReversed ? fadeLeft : fadeRight;
  const roleMeta = project.meta?.find((item) => item.label.toLowerCase() === 'role');
  const metaWithoutRole = project.meta?.filter((item) => item.label.toLowerCase() !== 'role');
  const titleContent = project.id === 'ticvision' ? (
    <span className="inline-flex whitespace-nowrap">
      <span>Tic</span>
      <span className="-ml-[0.04em]">Vision</span>
    </span>
  ) : (
    project.title
  );
  const brandRgb = PROJECT_BRAND_RGB[project.id] ?? '160,160,160';
  const pointerVars = {
    '--px': '50%',
    '--py': '50%',
    '--brand-rgb': brandRgb,
  } as React.CSSProperties;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--px', `${x}%`);
    event.currentTarget.style.setProperty('--py', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16
        items-center
      `}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => preloadImage(project.image)}
      onPointerMove={handlePointerMove}
      style={pointerVars}
    >
      {/* Content */}
      <motion.div
        variants={contentVariants}
        className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}
      >
        <Tag>{project.tag}</Tag>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:gap-4">
            <h3 className="text-3xl md:text-4xl font-urbanist font-bold" style={{ color: `rgb(${brandRgb})` }}>
              {titleContent}
            </h3>
            {roleMeta && (
              <div className="flex items-center gap-2 md:pb-1">
                <span className="hidden md:block h-4 w-px bg-white/20" aria-hidden="true" />
                <span className="text-sm text-content-subtle font-urbanist whitespace-nowrap">
                  {roleMeta.value}
                </span>
              </div>
            )}
          </div>

          {metaWithoutRole && metaWithoutRole.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metaWithoutRole.map((item) => (
                <MetaPill
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  size="sm"
                  className={item.label.toLowerCase() === 'platform' ? 'hidden sm:inline-flex' : undefined}
                />
              ))}
            </div>
          )}

          <p className="text-lg font-urbanist text-content-tertiary leading-relaxed">
            {project.description}
          </p>
          {project.featuredProof && (
            <p className="text-sm font-urbanist text-content-muted leading-relaxed">
              {project.featuredProof}
            </p>
          )}
        </div>

        <MagneticWrapper strength={0.3} distance={60}>
          <Link
            href={project.href}
            className="group/cta relative inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.02] px-5 py-2.5 text-sm font-urbanist font-medium text-content-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/35 hover:bg-white/[0.05] hover:text-ink hover:shadow-[0_0_24px_rgba(102,163,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-base"
            aria-label={`View ${project.title} case study`}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-electric/15 to-transparent opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
              aria-hidden="true"
            />
            <span className="relative z-10 tracking-[0.01em]">View Case Study</span>
            <span
              className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] transition-all duration-300 group-hover/cta:border-electric/45 group-hover/cta:bg-electric/12"
              aria-hidden="true"
            >
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
            </span>
          </Link>
        </MagneticWrapper>
      </motion.div>

      {/* Image with CometCard effect + Ken Burns */}
      <motion.div
        variants={imageVariants}
        className={isReversed ? 'lg:order-1' : ''}
      >
        <Link href={project.href} aria-label={`View ${project.title} case study`}>
        <CometCard rotateDepth={12} translateDepth={15}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-obsidian-dark">
            {/* Border glow */}
            <div
              className="
                absolute inset-0 z-20 rounded-2xl
                ring-1 ring-white/[0.10] group-hover:ring-white/[0.22]
                transition-all duration-500
                pointer-events-none
              "
            />

            <div
              className="absolute inset-0 z-[15] pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(420px circle at var(--px, 50%) var(--py, 50%), rgba(var(--brand-rgb), 0.065), rgba(var(--brand-rgb), 0.022) 35%, rgba(var(--brand-rgb), 0) 70%)',
              }}
            />

            {/* Image with parallax + Ken Burns hover */}
            <motion.div
              className="relative w-full h-full"
              style={{ y: smoothY }}
            >
              <ImageShimmer
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                quality={90}
                className="object-cover rounded-2xl brightness-[0.82] transition-transform duration-[8000ms] ease-out group-hover:scale-[1.08] group-hover:translate-x-[8px] group-hover:translate-y-[4px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                priority={index === 0}
              />
            </motion.div>

            {/* Subtle gradient overlay */}
            <div
              className="
                absolute inset-0 z-10 opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                bg-gradient-to-t from-obsidian-base/40 to-transparent
                pointer-events-none
                rounded-2xl
              "
            />
          </div>
        </CometCard>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedCard;
