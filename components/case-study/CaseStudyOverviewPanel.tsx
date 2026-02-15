'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import { StatCard, SectionDivider } from './shared';
import type { CaseStudyOverview } from '@/lib/projects';

interface CaseStudyOverviewPanelProps {
  overview: CaseStudyOverview;
}

export default function CaseStudyOverviewPanel({ overview }: CaseStudyOverviewPanelProps) {
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
          className="text-xl md:text-2xl text-white/60 font-urbanist leading-relaxed max-w-3xl"
        >
          {overview.headline}
        </motion.p>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div variants={fadeUp} className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="w-px h-full shrink-0 bg-gradient-to-b from-electric/30 via-electric/10 to-transparent" />
              <div>
                <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-3">The Problem</p>
                <p className="text-lg text-white/80 font-urbanist leading-relaxed">{overview.problem}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="w-px h-full shrink-0 bg-gradient-to-b from-electric/30 via-electric/10 to-transparent" />
              <div>
                <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-3">The Solution</p>
                <p className="text-lg text-white/80 font-urbanist leading-relaxed">{overview.solution}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <SectionDivider className="!px-0 !my-2" />

        {/* Outcomes */}
        <motion.div variants={fadeUp} className="space-y-4">
          <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em]">Outcomes</p>
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
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-2xs text-white/[0.45] font-urbanist uppercase tracking-[0.15em]">Role</span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span className="text-sm text-ink font-urbanist font-medium">{overview.role}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-2xs text-white/[0.45] font-urbanist uppercase tracking-[0.15em]">Timeline</span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span className="text-sm text-ink font-urbanist font-medium">{overview.timeline}</span>
          </div>
        </motion.div>

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
