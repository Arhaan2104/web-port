import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  className,
  interactive = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('glass-card', interactive && 'glass-card-interactive', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
