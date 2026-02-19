'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Button from '@/components/ui/Button';
import MetaPill from '@/components/ui/MetaPill';
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas';
import SectionEyebrow from '@/components/ui/SectionEyebrow';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 lg:px-24 py-20 md:py-32"
    >
      {/* Ambient light bleed — top of about section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[160px] bg-electric/[0.03] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Kicker label */}
          <motion.div variants={fadeUp} className="mb-10">
            <SectionEyebrow>
            A bit about me
            </SectionEyebrow>
          </motion.div>

          {/* Two-column grid: text-heavy asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
            {/* Left Column: Text content */}
            <div className="space-y-6">
              {/* Lead-in sentence */}
              <motion.p
                variants={fadeUp}
                className="text-2xl md:text-3xl text-content-primary font-urbanist font-medium leading-snug"
              >
                I&apos;m Arhaan &mdash; a product designer and design engineer based in Delhi.
              </motion.p>

              {/* Body paragraphs */}
              <motion.div variants={fadeUp} className="space-y-4">
                <p className="text-lg text-content-tertiary leading-relaxed">
                  I design and build products from scratch &mdash; research, UX, UI, frontend code,
                  and everything in between. Most of my work lives at the intersection of healthcare
                  and AI, where getting the details right matters more than usual.
                </p>
                <p className="text-lg text-content-tertiary leading-relaxed">
                  I built TicVision, a tic disorder tracking app with 400+ downloads that led to
                  conversations with 60+ clinicians across the U.S. That research turned into
                  CoralEHR, an AI-native EHR for behavioral health. I also shipped StudBud, an
                  AI study assistant that picked up 60 users in its first three days.
                </p>
                <p className="text-lg text-content-tertiary leading-relaxed">
                  I care about the gap between design and engineering &mdash; the part where most
                  ideas lose fidelity. I write code because it makes me a better designer, and I
                  design because it makes me write better code.
                </p>
              </motion.div>

              {/* Signal strip — glass pills */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: 'Shipped', value: '3 products' },
                  { label: 'Users', value: '400+' },
                  { label: 'Focus', value: 'Healthcare + AI' },
                ].map((signal) => (
                  <MetaPill
                    key={signal.label}
                    label={signal.label}
                    value={signal.value}
                  />
                ))}
              </motion.div>

              {/* Button */}
              <motion.div variants={fadeUp} className="pt-4">
                <a href="https://www.linkedin.com/in/arhaangupta-/" target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" magnetic>Get in Touch</Button>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Pixelated Portrait */}
            <motion.div variants={fadeUp} className="flex flex-col items-center justify-center">
              <div className="relative">
                {/* Ambient glow behind portrait */}
                <div
                  className="absolute inset-0 bg-electric/[0.04] blur-[60px] rounded-full pointer-events-none"
                  aria-hidden="true"
                />
                <div className="w-[280px] md:w-[480px]">
                  <PixelatedCanvas
                    src="/images/IMG.png"
                    width={320}
                    height={400}
                    cellSize={2}
                    dotScale={0.95}
                    shape="square"
                    backgroundColor="#0B0B0C"
                    responsive
                    interactive
                    distortionMode="swirl"
                    distortionStrength={3}
                    distortionRadius={80}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <p className="text-xs text-content-faint font-urbanist mt-4">Delhi, India</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
