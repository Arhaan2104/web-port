'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeLeft, fadeRight, smoothSpring } from '@/lib/motion';
import Tag from '@/components/ui/Tag';
import { CometCard } from '@/components/ui/comet-card';
import ImageShimmer from '@/components/ui/ImageShimmer';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import { useImagePreload } from '@/lib/hooks/useImagePreload';

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
  const { preloadImage } = useImagePreload();

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
      onMouseEnter={() => preloadImage(project.image)}
    >
      {/* Content */}
      <motion.div
        variants={contentVariants}
        className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}
      >
        <Tag>{project.tag}</Tag>

        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-urbanist font-bold text-ink">{project.title}</h3>
          <p className="text-lg font-urbanist text-white/70 leading-relaxed">
            {project.description}
          </p>
        </div>

        <MagneticWrapper strength={0.3} distance={60}>
          <Link
            href={project.href}
            className="inline-flex items-center gap-2 text-electric hover:gap-4 transition-all duration-300 font-urbanist font-medium"
            aria-label={`View ${project.title} case study`}
          >
            View Case Study
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </MagneticWrapper>
      </motion.div>

      {/* Image with CometCard effect + Ken Burns */}
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

            {/* Image with parallax + Ken Burns hover */}
            <motion.div
              className="relative w-full h-full"
              style={{ y: smoothY }}
            >
              <ImageShimmer
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                quality={100}
                className="object-cover rounded-2xl brightness-[0.82] transition-transform duration-[8000ms] ease-out group-hover:scale-[1.08] group-hover:translate-x-[8px] group-hover:translate-y-[4px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
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

export default FeaturedCard;
