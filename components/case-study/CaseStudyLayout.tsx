'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import type { Project } from '@/lib/projects';

interface CaseStudyLayoutProps {
  project: Project;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ project }) => {
  const cs = project.caseStudy!;

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Back navigation */}
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors duration-200 font-urbanist"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </div>
      </div>

      {/* Hero */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24"
        variants={stagger()}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="mb-6">
            <Tag variant="electric" size="md">{project.tag}</Tag>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-geist font-bold text-ink mb-6 tracking-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-white/60 font-urbanist leading-relaxed max-w-3xl mb-10"
          >
            {project.description}
          </motion.p>

          {/* Overview bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 md:gap-12 py-6 border-t border-b border-white/[0.06]"
          >
            {project.year && (
              <div>
                <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-1">Year</p>
                <p className="text-sm text-ink font-urbanist font-medium">{project.year}</p>
              </div>
            )}
            {project.role && (
              <div>
                <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-1">Role</p>
                <p className="text-sm text-ink font-urbanist font-medium">{project.role}</p>
              </div>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-1">Technologies</p>
                <p className="text-sm text-ink font-urbanist font-medium">{project.technologies.join(' · ')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Hero Image */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-obsidian-dark">
            <Image
              src={project.image}
              alt={`${project.title} project overview`}
              fill
              quality={100}
              className="object-cover brightness-[0.82]"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.06]" />
          </div>
        </div>
      </motion.section>

      {/* Problem */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        variants={stagger()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] lg:pt-1">The Problem</p>
            </div>
            <div>
              <p className="text-lg md:text-xl text-white/80 font-urbanist leading-relaxed">
                {cs.problem}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Solution */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        variants={stagger()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] lg:pt-1">The Solution</p>
            </div>
            <div>
              <p className="text-lg md:text-xl text-white/80 font-urbanist leading-relaxed">
                {cs.solution}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery */}
      {cs.gallery.length > 1 && (
        <motion.section
          className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
          variants={stagger(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className={`grid gap-6 ${cs.gallery.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {cs.gallery.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-obsidian-dark"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    quality={100}
                    className="object-cover brightness-[0.82]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-white/[0.06]" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Results */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        variants={stagger(0.1)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.p
            variants={fadeUp}
            className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-8"
          >
            Results & Impact
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cs.results.map((result, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
              >
                <p className="text-lg text-ink font-urbanist font-medium">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-4 pt-8 border-t border-white/[0.06]">
            <a href={cs.liveSiteUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="glass">
                Visit Live Site
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <Link href="/work">
              <Button variant="secondary">
                View All Work
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CaseStudyLayout;
