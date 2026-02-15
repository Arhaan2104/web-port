'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = React.useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setShow(latest > 0.3);
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full glass-interactive flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-white/60 group-hover:text-electric transition-colors duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
