import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, asChild, ...props }, ref) => {
    const variants = {
      primary:
        'bg-electric text-obsidian-base hover:bg-electric-end ' +
        'shadow-glow hover:shadow-glow-lg',
      secondary:
        'bg-white/[0.05] text-ink hover:bg-white/[0.08] ' +
        'border border-white/10 hover:border-white/20',
      ghost:
        'bg-transparent text-muted hover:text-ink ' +
        'hover:bg-white/[0.03]',
      glass:
        'glass-interactive text-ink',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const Component = motion.button;

    return (
      <Component
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'rounded-full font-medium transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-base',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;