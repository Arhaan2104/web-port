import { Variants } from 'framer-motion';

/**
 * Fade up animation variant
 * Animates element from below with opacity transition
 */
export const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1], // Cubic bezier for smooth easing
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Fade left animation variant
 * Animates element from right to left with opacity
 */
export const fadeLeft: Variants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Fade right animation variant
 * Animates element from left to right with opacity
 */
export const fadeRight: Variants = {
  initial: {
    opacity: 0,
    x: -40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Stagger container variant
 * Creates staggered animation for child elements
 * @param staggerDelay - Delay between each child animation (default: 0.08s)
 */
export const stagger = (staggerDelay: number = 0.08): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: staggerDelay / 2,
      staggerDirection: -1,
    },
  },
});

/**
 * Scale animation variant
 * Used for hover effects and interactive elements
 */
export const scale: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Fade in variant
 * Simple opacity animation
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Parallax effect helper
 * Returns transform values for parallax scrolling
 * @param offset - Parallax offset amount
 */
export const parallaxY = (offset: number = 50) => ({
  initial: { y: -offset },
  animate: { y: offset },
});

/**
 * Glass morphism hover effect
 * Enhanced hover state for glass UI elements
 */
export const glassHover: Variants = {
  initial: {
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  hover: {
    backdropFilter: 'blur(16px)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Magnetic cursor effect configuration
 * Used for interactive elements that follow cursor
 */
export const magneticConfig = {
  strength: 0.5,
  distance: 100,
  ease: [0.4, 0, 0.2, 1],
  duration: 0.3,
};

/**
 * Spring configuration for smooth animations
 */
export const springConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

/**
 * Smooth spring for scroll-based animations
 */
export const smoothSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  restDelta: 0.001,
};

/**
 * Custom cursor spring configs
 * Dot is tight/fast, ring lags behind for premium feel
 */
export const cursorDotSpring = {
  stiffness: 300,
  damping: 25,
  mass: 0.5,
};

export const cursorRingSpring = {
  stiffness: 150,
  damping: 20,
  mass: 0.8,
};

/**
 * Fade in from slight scale
 * Used for callouts and special elements
 */
export const fadeScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.97,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};