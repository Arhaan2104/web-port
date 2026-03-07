'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Expand } from 'lucide-react';
import { fadeUp, fadeIn, stagger } from '@/lib/motion';
import { useCountUp, parseMetric } from '@/lib/hooks/useCountUp';
import { cn } from '@/lib/utils';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import ImageShimmer from '@/components/ui/ImageShimmer';
import MetaPill from '@/components/ui/MetaPill';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import GlassCard from '@/components/ui/GlassCard';
import StatTile from '@/components/ui/StatTile';
import ImageLightbox from './ImageLightbox';
import { getCaseStudyBrandStyles } from './brandStyles';
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
  <div className="px-6 md:px-12 lg:px-24 mb-8 md:mb-10">
    <div className="max-w-5xl mx-auto">
      <Link
        href={href}
        className="group/cta relative inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.02] px-4 py-2.5 text-sm font-urbanist font-medium text-content-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/35 hover:bg-white/[0.05] hover:text-ink"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-electric/15 to-transparent opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
          aria-hidden="true"
        />
        <span
          className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] transition-all duration-300 group-hover/cta:border-electric/45 group-hover/cta:bg-electric/12"
          aria-hidden="true"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:-translate-x-0.5" />
        </span>
        <span className="relative z-10 tracking-[0.01em]">{label}</span>
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
  href?: string;
}

interface CaseStudyHeroProps {
  tag: string;
  tagVariant?: 'electric' | 'default';
  title: string;
  titleClassName?: string;
  subtitle: string;
  meta: HeroMetaItem[];
  readingTime?: number;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  tag,
  tagVariant = 'electric',
  title,
  titleClassName,
  subtitle,
  meta,
  readingTime,
}) => {
  const hiddenPillLabels = new Set(['role', 'status', 'program']);
  const roleMeta = meta.find((item) => item.label.toLowerCase() === 'role');
  const baseMeta = meta.filter((item) => !hiddenPillLabels.has(item.label.toLowerCase()));
  const allMeta = readingTime
    ? [...baseMeta, { label: 'Read Time', value: `${readingTime} min` }]
    : baseMeta;

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] md:w-[600px] md:h-[250px] bg-electric/[0.06] blur-[80px] md:blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <motion.div variants={fadeUp} className="mb-6 relative">
        <Tag variant={tagVariant} size="md">{tag}</Tag>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mb-6 relative flex flex-col gap-2 md:flex-row md:items-end md:gap-5"
      >
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-geist font-bold tracking-display leading-[1.05] ${titleClassName ?? 'text-ink'}`}>
          {title}
        </h1>
        {roleMeta && (
          <div className="flex items-center gap-3 md:pb-2">
            <span className="hidden md:block h-5 w-px bg-white/20" aria-hidden="true" />
            <span className="text-sm md:text-base text-content-subtle font-urbanist whitespace-nowrap">
              {roleMeta.value}
            </span>
          </div>
        )}
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="text-xl md:text-2xl text-content-muted font-urbanist leading-relaxed max-w-3xl mb-10 relative"
      >
        {subtitle}
      </motion.p>

      {/* Metadata pills */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap gap-3 md:gap-4 mb-8 relative"
      >
        {allMeta.map((item) => (
          <MetaPill
            key={item.label}
            label={item.label}
            value={
              item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/40 rounded-sm"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )
            }
          />
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
        className={`mb-14 sm:mb-20 md:mb-32 ${className}`}
        variants={stagger()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="w-full bg-white/[0.015] border-y border-white/[0.04] py-12 sm:py-16 md:py-24">
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
      className={`px-6 md:px-12 lg:px-24 mb-14 sm:mb-20 md:mb-32 ${className}`}
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
  const pathname = usePathname();
  const brandStyles = getCaseStudyBrandStyles(pathname);

  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
    >
      {/* Sticky label on desktop — pins while content scrolls */}
      <div className="flex gap-3 lg:sticky lg:top-28 lg:self-start lg:h-fit">
        {!isBlank && (
          <div className={cn('w-px shrink-0', brandStyles.subheadDivider)} />
        )}
        <SectionEyebrow className={cn('lg:pt-1', !isBlank && brandStyles.subheadText)}>
          {label}
        </SectionEyebrow>
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
  <p className={`text-lg md:text-xl text-content-secondary font-urbanist leading-relaxed ${className}`}>
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
    <p className="text-xl md:text-2xl text-content-secondary font-urbanist italic leading-relaxed">
      {children}
    </p>
    {attribution && (
      <p className="text-sm text-content-subtle font-urbanist mt-3 not-italic">
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
  metricClassName?: string;
}

const StatCardInner: React.FC<StatCardProps> = ({ metric, description, metricClassName }) => {
  const parsed = parseMetric(metric);

  if (parsed) {
    return <AnimatedStatCard number={parsed.number} suffix={parsed.suffix} description={description} metricClassName={metricClassName} />;
  }

  return (
    <div>
      <p className={cn('text-2xl md:text-3xl font-geist font-bold mb-2', metricClassName || 'text-ink')}>{metric}</p>
      <p className="text-sm text-white/60 font-urbanist leading-relaxed">{description}</p>
    </div>
  );
};

const AnimatedStatCard: React.FC<{ number: number; suffix: string; description: string; metricClassName?: string }> = ({
  number,
  suffix,
  description,
  metricClassName,
}) => {
  const [value, ref] = useCountUp({ end: number, duration: 1500 });

  return (
    <div>
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className={cn('text-2xl md:text-3xl font-geist font-bold mb-2', metricClassName || 'text-ink')}
      >
        {value}{suffix}
      </p>
      <p className="text-sm text-white/60 font-urbanist leading-relaxed">{description}</p>
    </div>
  );
};

export const StatCard: React.FC<StatCardProps> = ({ metric, description, index = 0, metricClassName }) => (
  <StatTile index={index}>
    <StatCardInner metric={metric} description={description} metricClassName={metricClassName} />
  </StatTile>
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
  videoSrc?: string;
  videoStartTimeSeconds?: number;
  videoAutoPlay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  videoControls?: boolean;
  videoPlaybackRate?: number;
  label: string;
  description: string;
  aspect?: string;
  priority?: boolean;
}

export const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  src,
  videoSrc,
  videoStartTimeSeconds = 0,
  videoAutoPlay = true,
  videoMuted = true,
  videoLoop = true,
  videoControls = false,
  videoPlaybackRate = 1,
  label,
  description,
  aspect = 'aspect-[16/10]',
  priority = false,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;

    const setup = () => {
      if (videoStartTimeSeconds > 0 && Number.isFinite(videoStartTimeSeconds)) {
        video.currentTime = videoStartTimeSeconds;
      }
      if (videoPlaybackRate !== 1) {
        video.playbackRate = videoPlaybackRate;
      }
      if (videoAutoPlay) {
        video.play().catch(() => {
          // Autoplay with sound can be blocked by browser policy.
        });
      }
    };

    if (video.readyState >= 1) {
      setup();
      return;
    }

    video.addEventListener('loadedmetadata', setup);
    return () => {
      video.removeEventListener('loadedmetadata', setup);
    };
  }, [videoAutoPlay, videoPlaybackRate, videoSrc, videoStartTimeSeconds]);

  if (videoSrc) {
    return (
      <motion.div variants={fadeUp}>
        <GlassCard
          className={`relative ${aspect} overflow-hidden rounded-2xl ring-1 ring-white/[0.06]`}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-contain brightness-[0.9]"
            autoPlay={videoAutoPlay}
            muted={videoMuted}
            loop={videoLoop}
            controls={videoControls}
            playsInline
            preload="metadata"
            aria-label={label}
          />
        </GlassCard>
      </motion.div>
    );
  }

  if (src) {
    return (
      <>
        <motion.div variants={fadeUp}>
          <GlassCard
            className={`relative ${aspect} overflow-hidden rounded-2xl ring-1 ring-white/[0.06] cursor-pointer group/img`}
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
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-10 h-10 md:w-8 md:h-8 rounded-lg bg-obsidian-base/60 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
              <Expand className="w-4 h-4 text-white/70" />
            </div>
          </GlassCard>
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
    <motion.div variants={fadeUp}>
      <GlassCard
        className={`relative ${aspect} overflow-hidden rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_2px_rgba(255,255,255,0.03)] flex flex-col items-center justify-center gap-3 p-8`}
      >
        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
          <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>
        <SectionEyebrow className="font-medium">{label}</SectionEyebrow>
        <p className="text-xs text-content-faint font-urbanist text-center max-w-md leading-relaxed">{description}</p>
      </GlassCard>
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
                <GlassCard className="flex w-full sm:w-auto items-center gap-4 p-4 min-w-0 sm:min-w-[280px]" interactive>
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
                    <p className="meta-pill-label mb-0.5">
                      Next Project
                    </p>
                    <p className="text-sm text-content-primary font-urbanist font-medium truncate">
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-electric group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                </GlassCard>
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
