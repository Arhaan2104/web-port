'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'live' | 'wip' | 'concept';
}

export default function LabPage() {
  const experiments: Experiment[] = [
    {
      id: 'gesture-ui',
      title: 'Gesture-Based UI',
      description: 'Exploring hand gesture controls for touchless interfaces using MediaPipe.',
      tags: ['Machine Learning', 'WebGL', 'MediaPipe'],
      liveUrl: '#',
      githubUrl: '#',
      status: 'live',
    },
    {
      id: 'voice-ux',
      title: 'Voice UX Patterns',
      description: 'Designing conversational interfaces with natural language understanding.',
      tags: ['Voice UI', 'NLP', 'Web Speech API'],
      status: 'wip',
    },
    {
      id: '3d-dataviz',
      title: '3D Data Visualization',
      description: 'Interactive 3D graphs for complex data relationships using Three.js.',
      tags: ['Three.js', 'D3.js', 'WebGL'],
      liveUrl: '#',
      status: 'live',
    },
    {
      id: 'ar-navigation',
      title: 'AR Navigation',
      description: 'Augmented reality wayfinding for indoor spaces.',
      tags: ['WebXR', 'AR', 'Computer Vision'],
      status: 'concept',
    },
    {
      id: 'biometric-auth',
      title: 'Biometric Authentication',
      description: 'Exploring passwordless authentication with WebAuthn.',
      tags: ['WebAuthn', 'Security', 'UX'],
      githubUrl: '#',
      status: 'wip',
    },
    {
      id: 'generative-ui',
      title: 'Generative UI',
      description: 'AI-powered interface generation based on user behavior.',
      tags: ['AI', 'Generative Design', 'React'],
      status: 'concept',
    },
  ];

  const getStatusColor = (status: Experiment['status']) => {
    switch (status) {
      case 'live':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'wip':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'concept':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: Experiment['status']) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'wip':
        return 'In Progress';
      case 'concept':
        return 'Concept';
      default:
        return '';
    }
  };

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
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              Lab
            </h1>
            <Sparkles className="w-8 h-8 text-electric animate-pulse" />
          </div>
          <p className="text-xl text-muted max-w-3xl">
            Experiments, prototypes, and explorations at the intersection of
            design and technology. This is where I push boundaries and test new
            ideas.
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger(0.05)}
          initial="initial"
          animate="animate"
        >
          {experiments.map((experiment) => (
            <motion.article
              key={experiment.id}
              variants={fadeUp}
              className="group glass rounded-xl p-6 hover:bg-white/[0.03] transition-all duration-300"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    experiment.status
                  )}`}
                >
                  {getStatusLabel(experiment.status)}
                </span>

                {/* Links */}
                <div className="flex gap-2">
                  {experiment.liveUrl && (
                    <a
                      href={experiment.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {experiment.githubUrl && (
                    <a
                      href={experiment.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
                      aria-label="View source code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-electric transition-colors duration-300">
                {experiment.title}
              </h3>
              <p className="text-sm text-muted mb-4">
                {experiment.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {experiment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-2xs rounded-full border border-white/10 text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-lg text-muted mb-6">
            Interested in collaborating on experimental projects?
          </p>
          <Link
            href="/about#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-interactive text-ink font-medium hover:gap-4 transition-all duration-300"
          >
            Let's Experiment Together
            <Sparkles className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}