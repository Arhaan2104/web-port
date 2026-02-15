'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasNav?: boolean;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  hasNav = false,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian-base/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass-interactive flex items-center justify-center group"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </button>

          {/* Navigation arrows */}
          {hasNav && onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-interactive flex items-center justify-center group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>
          )}
          {hasNav && onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-interactive flex items-center justify-center group"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>
          )}

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1400}
              height={900}
              className="object-contain max-h-[85vh] w-auto rounded-2xl"
              quality={100}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
