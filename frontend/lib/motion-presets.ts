// ============================================
// FRAMER MOTION PRESETS
// Apple Vision Pro + Linear inspired animations
// ============================================

import type { Transition, Variants } from "framer-motion";

// ============================================
// SPRING PHYSICS
// ============================================
export const spring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 1,
  restDelta: 0.001,
  restSpeed: 0.01,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 15,
  mass: 0.8,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1.2,
};

export const smooth: Transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1.0],
};

export const snap: Transition = {
  duration: 0.2,
  ease: [0.5, 0, 0.5, 1],
};

// ============================================
// PAGE TRANSITIONS
// ============================================
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smooth,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

export const staggerSlow: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================
export const cardHover: Variants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: spring,
  },
  tap: {
    scale: 0.98,
    transition: snap,
  },
};

export const cardFloat: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-1, 1, -1],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const cardEntrance: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: spring,
  },
};

// ============================================
// BUTTON ANIMATIONS
// ============================================
export const buttonHover: Variants = {
  hover: {
    scale: 1.05,
    transition: springBouncy,
  },
  tap: {
    scale: 0.95,
    transition: snap,
  },
};

export const buttonGlow: Variants = {
  hover: {
    boxShadow: "0 0 30px rgba(255, 0, 51, 0.5)",
    transition: { duration: 0.3 },
  },
};

// ============================================
// TEXT ANIMATIONS
// ============================================
export const textReveal: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const textSlide: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: spring,
  },
};

export const wordReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================
// MODAL / DIALOG ANIMATIONS
// ============================================
export const modalAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: spring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export const backdropAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ============================================
// FLOATING ANIMATIONS
// ============================================
export const float: Variants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatLarge: Variants = {
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// ROTATION ANIMATIONS
// ============================================
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const rotateGentle: Variants = {
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================
export const scaleIn: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: springBouncy,
  },
};

export const scalePulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================
export const slideUp: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideDown: Variants = {
  initial: { y: "-100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideLeft: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideRight: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ============================================
// BLUR ANIMATIONS
// ============================================
export const blurReveal: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5 },
  },
};

// ============================================
// SKELETON LOADING
// ============================================
export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================
// LIST ITEM ANIMATIONS
// ============================================
export const listItem: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: spring,
  },
};

// ============================================
// ICON ANIMATIONS
// ============================================
export const iconPulse: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.3,
    },
  },
};

export const iconRotate: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

// ============================================
// EXPORT ALL AS OBJECT
// ============================================
export const presets = {
  spring,
  springBouncy,
  springGentle,
  smooth,
  snap,
  pageTransition,
  pageFade,
  staggerContainer,
  staggerFast,
  staggerSlow,
  cardHover,
  cardFloat,
  cardEntrance,
  buttonHover,
  buttonGlow,
  textReveal,
  textSlide,
  wordReveal,
  modalAnimation,
  backdropAnimation,
  float,
  floatLarge,
  rotate,
  rotateGentle,
  scaleIn,
  scalePulse,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  blurReveal,
  shimmer,
  listItem,
  iconPulse,
  iconRotate,
};