'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import MetaPill from '@/components/ui/MetaPill';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import CaseStudyResourcesCompact from './CaseStudyResourcesCompact';
import { StatCard, SectionDivider } from './shared';
import type { CaseStudyOverview, CaseStudyResource } from '@/lib/projects';

interface CaseStudyOverviewPanelProps {
  overview: CaseStudyOverview;
  resources?: CaseStudyResource[];
}

export default function CaseStudyOverviewPanel({ overview, resources }: CaseStudyOverviewPanelProps) {
  return (
    <motion.div
      className="px-6 md:px-12 lg:px-24 pt-12 pb-20"
      variants={stagger()}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Headline */}
        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl text-content-muted font-urbanist leading-relaxed max-w-3xl"
        >
          {overview.headline}
        </motion.p>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div variants={fadeUp} className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="w-px h-full shrink-0 bg-gradient-to-b from-electric/30 via-electric/10 to-transparent" />
              <div>
                <SectionEyebrow className="mb-3">The Problem</SectionEyebrow>
                <p className="text-lg text-content-secondary font-urbanist leading-relaxed">{overview.problem}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="w-px h-full shrink-0 bg-gradient-to-b from-electric/30 via-electric/10 to-transparent" />
              <div>
                <SectionEyebrow className="mb-3">The Solution</SectionEyebrow>
                <p className="text-lg text-content-secondary font-urbanist leading-relaxed">{overview.solution}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <SectionDivider className="!px-0 !my-2" />

        {/* Outcomes */}
        <motion.div variants={fadeUp} className="space-y-4">
          <SectionEyebrow>Outcomes</SectionEyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overview.outcomes.map((outcome, i) => (
              <StatCard key={i} metric={outcome} description="" index={i} />
            ))}
          </div>
        </motion.div>

        <SectionDivider className="!px-0 !my-2" />

        {/* Meta bar: Role, Timeline */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-3 md:gap-4"
        >
          <MetaPill label="Role" value={overview.role} />
          <MetaPill label="Timeline" value={overview.timeline} />
        </motion.div>

        <CaseStudyResourcesCompact resources={resources} />

        {/* Tools */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {overview.tools.map((tool) => (
            <Tag key={tool} variant="default" size="md">{tool}</Tag>
          ))}
        </motion.div>

        {/* Live site link */}
        {overview.liveSiteUrl && (
          <motion.div variants={fadeUp}>
            <a
              href={overview.liveSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-electric hover:gap-3 transition-all duration-200 font-urbanist font-medium"
            >
              Visit Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
