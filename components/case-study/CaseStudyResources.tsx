'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Link as LinkIcon, MonitorPlay, Video } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import type { CaseStudyResource } from '@/lib/projects';
import GlassCard from '@/components/ui/GlassCard';
import SectionEyebrow from '@/components/ui/SectionEyebrow';

interface CaseStudyResourcesProps {
  resources?: CaseStudyResource[];
}

const typeLabel: Record<CaseStudyResource['type'], string> = {
  demo: 'Interactive Demo',
  website: 'Website',
  video: 'Video',
  link: 'Resource',
};

const typeIcon: Record<CaseStudyResource['type'], React.ComponentType<{ className?: string }>> = {
  demo: MonitorPlay,
  website: Globe,
  video: Video,
  link: LinkIcon,
};

const defaultCta: Record<CaseStudyResource['type'], string> = {
  demo: 'Open Demo',
  website: 'Visit Website',
  video: 'Watch Video',
  link: 'Open Link',
};

export default function CaseStudyResources({ resources = [] }: CaseStudyResourcesProps) {
  if (!resources.length) return null;

  return (
    <div className="space-y-5">
      {resources.map((resource) => {
        const Icon = typeIcon[resource.type];
        const ctaLabel = resource.ctaLabel ?? defaultCta[resource.type];
        const hasEmbed = Boolean(resource.embedUrl) && (resource.type === 'demo' || resource.type === 'video');

        return (
          <motion.div key={resource.id} variants={fadeUp}>
            <GlassCard className="p-5 md:p-6 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <SectionEyebrow className="!tracking-[0.14em]">{typeLabel[resource.type]}</SectionEyebrow>
                  <h3 className="text-lg text-ink font-urbanist font-semibold leading-tight">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-white/65 font-urbanist leading-relaxed max-w-2xl">
                      {resource.description}
                    </p>
                  )}
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-electric hover:gap-3 transition-all duration-200 font-urbanist font-medium shrink-0"
                >
                  {ctaLabel}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {hasEmbed ? (
                <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-white/[0.08] bg-black/30">
                  <iframe
                    src={resource.embedUrl}
                    title={resource.title}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <div className="rounded-xl ring-1 ring-white/[0.08] bg-white/[0.03] p-5 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white/55" />
                  </span>
                  <p className="text-sm text-white/60 font-urbanist leading-relaxed">
                    Open this resource in a new tab.
                  </p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
