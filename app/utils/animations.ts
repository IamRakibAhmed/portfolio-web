'use client';

/**
 * Shared animation variants for consistent animations across components
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.2,
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20,
      mass: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)"
};

export const buttonTap = {
  scale: 0.95
};

export const progressBarVariants = {
  hidden: { width: 0 },
  visible: (level: string) => ({
    width: level === 'Advanced' ? '100%' : level === 'Intermediate' ? '65%' : '40%',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
}; 