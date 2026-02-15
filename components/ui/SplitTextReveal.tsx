'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  splitBy?: 'word' | 'char';
  staggerDelay?: number;
  blur?: boolean;
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  splitBy = 'word',
  staggerDelay = 0.04,
  blur = true,
}) => {
  const pieces = splitBy === 'word' ? text.split(' ') : text.split('');

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const pieceVariants = {
    initial: {
      opacity: 0,
      y: 15,
      filter: blur ? 'blur(4px)' : 'blur(0px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as number[],
      },
    },
  };

  // Use motion.div as container with the semantic tag for accessibility
  return (
    <motion.div
      role="heading"
      aria-level={Tag === 'h1' ? 1 : Tag === 'h2' ? 2 : Tag === 'h3' ? 3 : Tag === 'h4' ? 4 : undefined}
      className={className}
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-80px' }}
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          variants={pieceVariants}
          className="inline-block"
          style={{ marginRight: splitBy === 'word' ? '0.3em' : undefined }}
        >
          {piece}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitTextReveal;
