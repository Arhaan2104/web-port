import React from 'react';
import { cn } from '@/lib/utils';

interface MetaPillProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  size?: 'md' | 'sm';
}

const MetaPill: React.FC<MetaPillProps> = ({
  label,
  value,
  className,
  size = 'md',
}) => {
  const isSmall = size === 'sm';

  return (
    <div className={cn('meta-pill', isSmall && 'meta-pill-sm', className)}>
      <span className={cn('meta-pill-label', isSmall && 'meta-pill-label-sm')}>{label}</span>
      <span className={cn('meta-pill-divider', isSmall && 'meta-pill-divider-sm')} />
      <span className={cn('meta-pill-value', isSmall && 'meta-pill-value-sm')}>{value}</span>
    </div>
  );
};

export default MetaPill;
