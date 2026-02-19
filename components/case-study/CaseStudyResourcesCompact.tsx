'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import type { CaseStudyResource } from '@/lib/projects';
import GlassCard from '@/components/ui/GlassCard';
import SectionEyebrow from '@/components/ui/SectionEyebrow';

interface CaseStudyResourcesCompactProps {
  resources?: CaseStudyResource[];
}

const typeLabel: Record<CaseStudyResource['type'], string> = {
  demo: 'Demo',
  website: 'Website',
  video: 'Video',
  link: 'Resource',
};

const defaultCta: Record<CaseStudyResource['type'], string> = {
  demo: 'Open Demo',
  website: 'Visit Website',
  video: 'Watch Video',
  link: 'Open Link',
};

export default function CaseStudyResourcesCompact({ resources = [] }: CaseStudyResourcesCompactProps) {
  if (!resources.length) return null;

  return (
    <motion.div variants={fadeUp} className="space-y-4">
      <SectionEyebrow>Resources</SectionEyebrow>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GlassCard className="p-4 h-full" interactive>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 font-urbanist mb-2">
                {typeLabel[resource.type]}
              </p>
              <p className="text-sm text-ink font-urbanist font-medium leading-snug mb-2">
                {resource.title}
              </p>
              {resource.description && (
                <p className="text-xs text-white/55 font-urbanist leading-relaxed line-clamp-2 mb-3">
                  {resource.description}
                </p>
              )}
              <span className="inline-flex items-center gap-2 text-electric text-xs font-urbanist font-medium">
                {resource.ctaLabel ?? defaultCta[resource.type]}
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </GlassCard>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
