import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface StatTileProps {
  className?: string;
  index?: number;
  children: React.ReactNode;
}

const StatTile: React.FC<StatTileProps> = ({ className, index = 0, children }) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    className={cn(
      'glass-card glass-card-interactive p-6 hover:border-line-electric hover:shadow-[0_0_20px_rgba(102,163,255,0.08)]',
      className
    )}
  >
    {children}
  </motion.div>
);

export default StatTile;
