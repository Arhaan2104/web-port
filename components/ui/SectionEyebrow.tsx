import React from 'react';
import { cn } from '@/lib/utils';

interface SectionEyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'h2' | 'h3';
}

const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  as: Tag = 'p',
  className,
  children,
  ...props
}) => {
  return (
    <Tag className={cn('eyebrow', className)} {...props}>
      {children}
    </Tag>
  );
};

export default SectionEyebrow;
