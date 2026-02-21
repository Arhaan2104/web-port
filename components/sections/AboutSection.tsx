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

      <div className="max-w-[96rem] mx-auto">
        <motion.div
          variants={stagger()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Kicker label */}
          <motion.div variants={fadeUp} className="mb-3">
            <SectionEyebrow>
            Who am I
            </SectionEyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-urbanist font-semibold tracking-tight text-ink mb-10"
          >
            About Me
          </motion.h2>

          {/* Two-column grid: text-heavy asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] xl:grid-cols-[1.24fr_1fr] gap-3 lg:gap-2">
            {/* Left Column: Text content */}
            <div className="space-y-6">
              {/* Lead-in sentence */}
              <motion.p
                variants={fadeUp}
                className="text-2xl md:text-3xl text-content-primary font-urbanist font-medium leading-snug"
              >
                I&apos;m Arhaan &mdash; a product designer and founder working at the intersection of psychology, HCI, and product engineering.
              </motion.p>

              {/* Body paragraphs */}
              <motion.div variants={fadeUp} className="space-y-4">
                <p className="text-lg text-content-tertiary leading-relaxed">
                  I use behavioral insight to understand how humans interact with technology, which helps build user-centred products. Then carry it through
                  research → UX/UI → frontend so the shipped product stays true to my vision for it.
                </p>
                <p className="text-lg text-content-tertiary leading-relaxed">
                  I started in healthcare with TicVision (400+ U.S. App Store downloads,
                  a 13-clinician pilot, and 60+ clinician conversations). Those learnings led directly
                  to CoralEHR, an AI-native EHR for private-pay behavioral health.
                </p>
                <p className="text-lg text-content-tertiary leading-relaxed">
                  I also built StudBud, an AI study assistant that hit 60 users in its first three
                  days. Outside work, I&apos;m usually following sports, hunting for good food, or messing
                  with new tech.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-1">
                <MetaPill size="sm" label="Degree" value="BSc Psychology" />
                <MetaPill
                  size="sm"
                  label="College"
                  value={(
                    <a
                      href="https://www.ashoka.edu.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink transition-colors duration-200"
                    >
                      Ashoka University
                    </a>
                  )}
                />
                <MetaPill size="sm" label="Age" value="22" />
              </motion.div>

              <motion.div variants={fadeUp} className="pt-2">
                <a href="https://www.linkedin.com/in/arhaangupta-/" target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" magnetic>
                    <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Pixelated Portrait */}
            <motion.div variants={fadeUp} className="flex flex-col items-center justify-start">
              <div className="relative">
                {/* Ambient glow behind portrait */}
                <div
                  className="absolute inset-0 bg-electric/[0.04] blur-[60px] rounded-full pointer-events-none"
                  aria-hidden="true"
                />
                <div className="w-full max-w-[552px] sm:max-w-[744px] md:max-w-[936px] lg:max-w-[1008px]">
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

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
