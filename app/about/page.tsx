'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Download, Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function AboutPage() {
  const experience = [
    {
      role: 'Product Design Lead',
      company: 'Healthcare Startup',
      period: '2023 - Present',
      description: 'Leading design for AI-powered healthcare solutions.',
    },
    {
      role: 'Senior Product Designer',
      company: 'Tech Consultancy',
      period: '2021 - 2023',
      description: 'Designed enterprise SaaS products for Fortune 500 clients.',
    },
    {
      role: 'UX Designer',
      company: 'Digital Agency',
      period: '2019 - 2021',
      description: 'Created user experiences for consumer mobile applications.',
    },
  ];

  const values = [
    {
      title: 'Human-Centered',
      description: 'Every design decision starts with understanding real human needs.',
    },
    {
      title: 'Evidence-Based',
      description: 'Combining user research with psychological insights for better outcomes.',
    },
    {
      title: 'Technically Sound',
      description: 'Deep understanding of implementation ensures feasible, scalable designs.',
    },
    {
      title: 'Ethically Driven',
      description: 'Committed to accessibility, privacy, and positive social impact.',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            About Me
          </h1>
          <div className="max-w-3xl space-y-6 text-lg text-muted">
            <p>
              I'm Arhaan Gupta, a product designer based in Delhi, India, with
              a passion for creating digital experiences that bridge the gap
              between human psychology and technology.
            </p>
            <p>
              With a background in cognitive science and years of experience in
              product design, I specialize in crafting intuitive solutions for
              complex problems, particularly in healthcare and AI-driven
              applications.
            </p>
            <p>
              My work is guided by the belief that great design isn't just
              about aesthetics—it's about understanding people, solving real
              problems, and creating lasting positive impact.
            </p>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.section
          className="mb-20"
          variants={stagger()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Experience
          </motion.h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="glass rounded-xl p-6 hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <span className="text-sm text-muted">{job.period}</span>
                </div>
                <p className="text-electric mb-2">{job.company}</p>
                <p className="text-muted">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-20"
          variants={stagger()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Design Philosophy
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-3 text-electric">
                  {value.title}
                </h3>
                <p className="text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="glass rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-muted mb-8 max-w-2xl">
            I'm always interested in new opportunities and collaborations.
            Whether you have a project in mind or just want to chat about
            design, feel free to reach out.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="mailto:hello@arhaangupta.com">
              <Button variant="primary" size="lg">
                <Mail className="w-5 h-5" />
                Get in Touch
              </Button>
            </a>
            <a href="/resume.pdf" download>
              <Button variant="secondary" size="lg">
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/arhaangupta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-white/[0.05] transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/arhaangupta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-white/[0.05] transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/arhaangupta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-white/[0.05] transition-colors duration-300"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}