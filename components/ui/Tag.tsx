import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'electric' | 'muted';
  size?: 'sm' | 'md';
}

const Tag: React.FC<TagProps> = ({
  children,
  className,
  variant = 'default',
  size = 'sm',
}) => {
  const variants = {
    default: 'bg-white/[0.03] text-white/50 border-white/10',
    electric: 'bg-electric-dim text-electric border-electric/20',
    muted: 'bg-white/[0.01] text-white/40 border-white/5',
  };

  const sizes = {
    sm: 'px-3 py-1 text-2xs',
    md: 'px-4 py-1.5 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-urbanist font-medium uppercase tracking-[0.15em] transition-all duration-200',
        variants[variant],
        sizes[size],
        'hover:bg-white/[0.05] hover:border-white/20',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag;