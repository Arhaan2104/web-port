'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Expand } from 'lucide-react';
import { fadeUp, fadeIn, stagger } from '@/lib/motion';
import { useCountUp, parseMetric } from '@/lib/hooks/useCountUp';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import ImageShimmer from '@/components/ui/ImageShimmer';
import ImageLightbox from './ImageLightbox';
import type { Project } from '@/lib/projects';

/* ────────────────────────────────────────────────────────
   ScrollProgressBar
   Fixed 2px electric gradient line at the top of the page
   ──────────────────────────────────────────────────────── */

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 scroll-progress-gradient origin-left"
      style={{ scaleX }}
    />
  );
};

/* ────────────────────────────────────────────────────────
   BackNav
   Back-to-work navigation link
   ──────────────────────────────────────────────────────── */

interface BackNavProps {
  href?: string;
  label?: string;
}

export const BackNav: React.FC<BackNavProps> = ({
  href = '/work',
  label = 'Back to Work',
}) => (
  <div className="px-6 md:px-12 lg:px-24 mb-12">
    <div className="max-w-5xl mx-auto">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors duration-200 font-urbanist"
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Link>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────
   CaseStudyHero
   Dramatic hero with glow, large type, glass metadata pills
   ──────────────────────────────────────────────────────── */

export interface HeroMetaItem {
  label: string;
  value: string;
}

interface CaseStudyHeroProps {
  tag: string;
  tagVariant?: 'electric' | 'default';
  title: string;
  subtitle: string;
  meta: HeroMetaItem[];
  readingTime?: number;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  tag,
  tagVariant = 'electric',
  title,
  subtitle,
  meta,
  readingTime,
}) => {
  const allMeta = readingTime
    ? [...meta, { label: 'Read Time', value: `${readingTime} min` }]
    : meta;

  return (
  <motion.section
    className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24"
    variants={stagger()}
    initial={false}
    animate="animate"
  >
    <div className="max-w-5xl mx-auto relative">
      {/* Ambient glow behind title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-electric/[0.06] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <motion.div variants={fadeUp} className="mb-6 relative">
        <Tag variant={tagVariant} size="md">{tag}</Tag>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-5xl md:text-6xl lg:text-7xl font-geist font-bold text-ink mb-6 tracking-display leading-[1.05] relative"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-xl md:text-2xl text-white/60 font-urbanist leading-relaxed max-w-3xl mb-10 relative"
      >
        {subtitle}
      </motion.p>

      {/* Metadata pills */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap gap-3 md:gap-4 mb-8 relative"
      >
        {allMeta.map((item) => (
          <div
            key={item.label}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
          >
            <span className="text-2xs text-white/[0.45] font-urbanist uppercase tracking-[0.15em]">
              {item.label}
            </span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span className="text-sm text-ink font-urbanist font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Gradient divider */}
      <motion.div
        variants={fadeIn}
        className="h-px w-full bg-gradient-to-r from-transparent via-electric/20 to-transparent relative"
      />
    </div>
  </motion.section>
  );
};

/* ────────────────────────────────────────────────────────
   Section
   Container with optional visual variant for rhythm
   ──────────────────────────────────────────────────────── */

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  variant = 'default',
  id,
}) => {
  if (variant === 'highlighted') {
    return (
      <motion.section
        id={id}
        className={`mb-20 md:mb-32 ${className}`}
        variants={stagger()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="w-full bg-white/[0.015] border-y border-white/[0.04] py-16 md:py-24">
          <div className="px-6 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">{children}</div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`px-6 md:px-12 lg:px-24 mb-20 md:mb-32 ${className}`}
      variants={stagger()}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </motion.section>
  );
};

/* ────────────────────────────────────────────────────────
   SideLabel
   Grid layout with vertical accent line on label side
   ──────────────────────────────────────────────────────── */

interface SideLabelProps {
  label: string;
  children: React.ReactNode;
}

export const SideLabel: React.FC<SideLabelProps> = ({ label, children }) => {
  const isBlank = !label || label.trim() === '';

  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
    >
      {/* Sticky label on desktop — pins while content scrolls */}
      <div className="flex gap-3 lg:sticky lg:top-28 lg:self-start lg:h-fit">
        {!isBlank && (
          <div className="w-px shrink-0 bg-gradient-to-b from-electric/30 via-electric/10 to-transparent" />
        )}
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] lg:pt-1">
          {label}
        </p>
      </div>
      <div>{children}</div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────
   Body
   Standard body text paragraph
   ──────────────────────────────────────────────────────── */

interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

export const Body: React.FC<BodyProps> = ({ children, className = '' }) => (
  <p className={`text-lg md:text-xl text-white/80 font-urbanist leading-relaxed ${className}`}>
    {children}
  </p>
);

/* ────────────────────────────────────────────────────────
   Callout
   Pull quote for editorial rhythm
   ──────────────────────────────────────────────────────── */

interface CalloutProps {
  children: React.ReactNode;
  attribution?: string;
}

export const Callout: React.FC<CalloutProps> = ({ children, attribution }) => (
  <motion.div
    variants={fadeUp}
    className="pl-6 border-l-2 border-electric/30 py-2 my-4"
  >
    <p className="text-xl md:text-2xl text-white/[0.85] font-urbanist italic leading-relaxed">
      {children}
    </p>
    {attribution && (
      <p className="text-sm text-white/50 font-urbanist mt-3 not-italic">
        {attribution}
      </p>
    )}
  </motion.div>
);

/* ────────────────────────────────────────────────────────
   StatCard
   Metric-driven card with count-up animation
   ──────────────────────────────────────────────────────── */

interface StatCardProps {
  metric: string;
  description: string;
  index?: number;
}

const StatCardInner: React.FC<StatCardProps> = ({ metric, description }) => {
  const parsed = parseMetric(metric);

  if (parsed) {
    return <AnimatedStatCard number={parsed.number} suffix={parsed.suffix} description={description} />;
  }

  return (
    <div>
      <p className="text-2xl md:text-3xl font-geist font-bold text-ink mb-2">{metric}</p>
      <p className="text-sm text-white/60 font-urbanist leading-relaxed">{description}</p>
    </div>
  );
};

const AnimatedStatCard: React.FC<{ number: number; suffix: string; description: string }> = ({
  number,
  suffix,
  description,
}) => {
  const [value, ref] = useCountUp({ end: number, duration: 1500 });

  return (
    <div>
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="text-2xl md:text-3xl font-geist font-bold text-ink mb-2"
      >
        {value}{suffix}
      </p>
      <p className="text-sm text-white/60 font-urbanist leading-relaxed">{description}</p>
    </div>
  );
};

export const StatCard: React.FC<StatCardProps> = ({ metric, description, index = 0 }) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-electric/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,163,255,0.08)]"
  >
    <StatCardInner metric={metric} description={description} />
  </motion.div>
);

/* ────────────────────────────────────────────────────────
   SectionDivider
   Thin gradient line between major chapters
   ──────────────────────────────────────────────────────── */

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className={`px-6 md:px-12 lg:px-24 my-4 ${className}`}
  >
    <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-electric/15 to-transparent" />
  </motion.div>
);

/* ────────────────────────────────────────────────────────
   ImageShowcase
   Glass-styled image/placeholder (replaces dashed wireframes)
   ──────────────────────────────────────────────────────── */

interface ImageShowcaseProps {
  src?: string;
  label: string;
  description: string;
  aspect?: string;
  priority?: boolean;
}

export const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  src,
  label,
  description,
  aspect = 'aspect-[16/10]',
  priority = false,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (src) {
    return (
      <>
        <motion.div
          variants={fadeUp}
          className={`relative ${aspect} overflow-hidden rounded-2xl ring-1 ring-white/[0.06] bg-white/[0.02] cursor-pointer group/img`}
          onClick={() => setLightboxOpen(true)}
        >
          <ImageShimmer
            src={src}
            alt={label}
            fill
            className="object-cover brightness-[0.88]"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
          />
          {/* Expand icon on hover */}
          <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-obsidian-base/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
            <Expand className="w-4 h-4 text-white/70" />
          </div>
        </motion.div>
        <ImageLightbox
          isOpen={lightboxOpen}
          src={src}
          alt={label}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className={`relative ${aspect} overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] shadow-[inset_0_1px_2px_rgba(255,255,255,0.03)] flex flex-col items-center justify-center gap-3 p-8`}
    >
      <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
        <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
      </div>
      <p className="text-xs text-white/50 font-urbanist font-medium uppercase tracking-[0.15em]">{label}</p>
      <p className="text-xs text-white/[0.35] font-urbanist text-center max-w-md leading-relaxed">{description}</p>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────
   ToolStack
   Visual Tag chips replacing plain text tool lists
   ──────────────────────────────────────────────────────── */

interface ToolStackProps {
  tools: string[];
}

export const ToolStack: React.FC<ToolStackProps> = ({ tools }) => (
  <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
    {tools.map((tool) => (
      <Tag key={tool} variant="default" size="md">{tool}</Tag>
    ))}
  </motion.div>
);

/* ────────────────────────────────────────────────────────
   CaseStudyCTA
   Full-width closing section with glow + next project card
   ──────────────────────────────────────────────────────── */

interface NextProject {
  title: string;
  tag: string;
  href: string;
  image: string;
}

interface CaseStudyCTAProps {
  liveSiteUrl?: string;
  liveSiteLabel?: string;
  nextProject?: NextProject;
  prevProject?: NextProject;
}

export const CaseStudyCTA: React.FC<CaseStudyCTAProps> = ({
  liveSiteUrl,
  liveSiteLabel = 'Visit Live Site',
  nextProject,
  prevProject,
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && nextProject) {
        router.push(nextProject.href);
      } else if (e.key === 'ArrowLeft' && prevProject) {
        router.push(prevProject.href);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject, router]);

  return (
    <motion.section
      className="px-6 md:px-12 lg:px-24 pb-20 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-electric/[0.04] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="pt-10 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {liveSiteUrl && (
                <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" magnetic>
                    {liveSiteLabel}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
              <Link href="/work">
                <Button variant="secondary" magnetic>
                  View All Work
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Next project card */}
            {nextProject && (
              <Link href={nextProject.href} className="group">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 min-w-[280px]">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/[0.04]">
                    <Image
                      src={nextProject.image}
                      alt={nextProject.title}
                      fill
                      className="object-cover brightness-[0.82]"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xs text-white/[0.45] font-urbanist uppercase tracking-[0.15em] mb-0.5">
                      Next Project
                    </p>
                    <p className="text-sm text-ink font-urbanist font-medium truncate">
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-electric group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                </div>
              </Link>
            )}
          </div>

          {/* Keyboard navigation hint */}
          {(nextProject || prevProject) && (
            <p className="text-xs text-white/30 font-urbanist mt-6 text-center md:text-right">
              ← → Navigate projects
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
};
