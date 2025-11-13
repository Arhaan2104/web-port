'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeLeft, fadeRight, smoothSpring } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import { CometCard } from '@/components/ui/comet-card';

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
}

interface FeaturedCardProps {
  project: Project;
  index: number;
  isReversed?: boolean;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ project, index, isReversed = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for image
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const smoothY = useSpring(y, smoothSpring);

  // Content animation variants
  const contentVariants = isReversed ? fadeRight : fadeLeft;
  const imageVariants = isReversed ? fadeLeft : fadeRight;

  return (
    <motion.div
      ref={cardRef}
      className={`
        group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16
        items-center
      `}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Content */}
      <motion.div
        variants={contentVariants}
        className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}
      >
        <Tag>{project.tag}</Tag>

        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
          <p className="text-lg text-muted leading-relaxed">
            {project.description}
          </p>
        </div>

        <Link
          href={project.href}
          className="inline-flex items-center gap-2 text-electric hover:gap-4 transition-all duration-300 font-medium"
          aria-label={`View ${project.title} case study`}
        >
          View Case Study
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </motion.div>

      {/* Image with CometCard effect */}
      <motion.div
        variants={imageVariants}
        className={isReversed ? 'lg:order-1' : ''}
      >
        <CometCard rotateDepth={12} translateDepth={15}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-obsidian-dark">
            {/* Border glow */}
            <div
              className="
                absolute inset-0 z-20 rounded-2xl
                ring-1 ring-electric/10 group-hover:ring-electric/30
                transition-all duration-500
                pointer-events-none
              "
            />

            {/* Image with parallax */}
            <motion.div
              className="relative w-full h-full"
              style={{ y: smoothY }}
            >
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </motion.div>

            {/* Subtle gradient overlay */}
            <div
              className="
                absolute inset-0 z-10 opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                bg-gradient-to-t from-obsidian-base/40 to-transparent
                pointer-events-none
                rounded-2xl
              "
            />
          </div>
        </CometCard>
      </motion.div>
    </motion.div>
  );
};

// Magnetic cursor effect component
const MagneticArea: React.FC = () => {
  const magnetRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetRef.current) return;

    const rect = magnetRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      const translateX = x * strength * 0.3;
      const translateY = y * strength * 0.3;

      magnetRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (!magnetRef.current) return;
    magnetRef.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={magnetRef}
      className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    />
  );
};

export default FeaturedCard;