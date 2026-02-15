'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageShimmerProps extends Omit<ImageProps, 'onLoad'> {
  shimmerClassName?: string;
}

const ImageShimmer: React.FC<ImageShimmerProps> = ({
  shimmerClassName = '',
  className = '',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 z-10 rounded-2xl bg-white/[0.02] overflow-hidden ${shimmerClassName}`}
          >
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, transparent, rgba(102, 163, 255, 0.04), transparent)',
                backgroundSize: '200% 100%',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        {...props}
        className={className}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ImageShimmer;
