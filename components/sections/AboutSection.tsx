'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import Button from '@/components/ui/Button';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 lg:px-24 py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          variants={stagger()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Column: About Text */}
          <div className="space-y-6">
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold"
            >
              About Me
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-lg text-muted leading-relaxed">
                I'm a product designer based in Delhi, India, passionate about
                creating digital experiences that genuinely improve people's
                lives.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                My approach combines psychological insights with cutting-edge
                technology, ensuring that every design decision is both
                human-centered and technically sound.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Currently focused on healthcare and AI-driven solutions, I
                believe in the power of thoughtful design to solve complex
                problems and create meaningful impact.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 pt-4">
              <Link href="/about">
                <Button variant="glass">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="secondary">Get in Touch</Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Skills & Expertise */}
          <motion.div
            variants={fadeUp}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">Expertise</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Product Strategy',
                  'User Research',
                  'Interaction Design',
                  'Design Systems',
                  'Prototyping',
                  'AI/ML Integration',
                  'Healthcare UX',
                  'Accessibility',
                ].map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 rounded-lg glass text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Figma',
                  'Framer',
                  'React',
                  'TypeScript',
                  'Three.js',
                  'Tailwind',
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full border border-white/10 text-xs text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;