'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/lib/hooks/useMagnetic';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  distance?: number;
  className?: string;
}

const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  strength,
  distance,
  className = '',
}) => {
  const { ref, style, handlers } = useMagnetic({ strength, distance });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;
