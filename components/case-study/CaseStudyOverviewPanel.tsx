'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import { cn } from '@/lib/utils';
import Tag from '@/components/ui/Tag';
import MetaPill from '@/components/ui/MetaPill';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import CaseStudyResourcesCompact from './CaseStudyResourcesCompact';
import { getCaseStudyBrandStyles } from './brandStyles';
import { StatCard, SectionDivider } from './shared';
import type { CaseStudyOverview, CaseStudyResource } from '@/lib/projects';

interface CaseStudyOverviewPanelProps {
  overview: CaseStudyOverview;
  resources?: CaseStudyResource[];
}

export default function CaseStudyOverviewPanel({ overview, resources }: CaseStudyOverviewPanelProps) {
  const pathname = usePathname();
  const brandStyles = getCaseStudyBrandStyles(pathname);

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
              <div className={cn('w-px h-full shrink-0', brandStyles.subheadDivider)} />
              <div>
                <SectionEyebrow className={cn('mb-3', brandStyles.subheadText)}>The Problem</SectionEyebrow>
                <p className="text-lg text-content-secondary font-urbanist leading-relaxed">{overview.problem}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className={cn('w-px h-full shrink-0', brandStyles.subheadDivider)} />
              <div>
                <SectionEyebrow className={cn('mb-3', brandStyles.subheadText)}>The Solution</SectionEyebrow>
                <p className="text-lg text-content-secondary font-urbanist leading-relaxed">{overview.solution}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <SectionDivider className="!px-0 !my-2" />

        {/* Outcomes — brand-colored metrics */}
        <motion.div variants={fadeUp} className="space-y-4">
          <SectionEyebrow className={brandStyles.subheadText}>Outcomes</SectionEyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overview.outcomes.map((outcome, i) => (
              <StatCard
                key={i}
                metric={outcome.metric}
                description={outcome.description}
                index={i}
                metricClassName={brandStyles.subheadText}
              />
            ))}
          </div>
        </motion.div>

        <SectionDivider className="!px-0 !my-2" />

        {/* Relevant Coursework */}
        {overview.courses && overview.courses.length > 0 && (
          <>
            <motion.div variants={fadeUp} className="space-y-4">
              <SectionEyebrow className={brandStyles.subheadText}>Relevant Coursework</SectionEyebrow>
              <div className="flex flex-wrap gap-2">
                {overview.courses.map((course) => (
                  <Tag key={course} variant="default" size="md">{course}</Tag>
                ))}
              </div>
            </motion.div>
            <SectionDivider className="!px-0 !my-2" />
          </>
        )}

        {/* Resources */}
        <CaseStudyResourcesCompact resources={resources} />

        {/* Meta + Tools grouped in GlassCard */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6 space-y-5">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <MetaPill label="Role" value={overview.role} />
              <MetaPill label="Timeline" value={overview.timeline} />
            </div>
            <div className="flex flex-wrap gap-2">
              {overview.tools.map((tool) => (
                <Tag key={tool} variant="default" size="md">{tool}</Tag>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Live site — glass button */}
        {overview.liveSiteUrl && (
          <motion.div variants={fadeUp}>
            <a
              href={overview.liveSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="glass" magnetic>
                Visit Live Site
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
