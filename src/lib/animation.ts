/**
 * Valavan Academy — Animation System
 * Centralized animation constants, presets, and utility functions.
 * Used by both GSAP (scroll animations) and Framer Motion (UI interactions).
 */

// ─── Duration Constants (in seconds) ─────────────────────────────────────────
export const DURATION = {
  instant:   0.1,
  fast:      0.25,
  normal:    0.45,
  slow:      0.7,
  cinematic: 1.1,
  epic:      1.5,
} as const;

// ─── Easing Presets ───────────────────────────────────────────────────────────
// GSAP easing strings
export const EASE = {
  // Smooth deceleration — most common reveal
  smooth:    "power2.out",
  // Strong deceleration — headings, hero
  strong:    "power3.out",
  // Cinematic — full section reveals
  cinematic: "power4.out",
  // Elastic — interactive feedback (subtle)
  elastic:   "back.out(1.2)",
  // Expo — fast in, slow out
  expo:      "expo.out",
  // Custom cubic-bezier for Framer Motion
  fm: {
    smooth:    [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    strong:    [0.16, 1, 0.3, 1]        as [number, number, number, number],
    cinematic: [0.76, 0, 0.24, 1]       as [number, number, number, number],
    bounce:    [0.34, 1.56, 0.64, 1]    as [number, number, number, number],
  },
} as const;

// ─── Delay Presets ────────────────────────────────────────────────────────────
export const DELAY = {
  none:    0,
  short:   0.1,
  normal:  0.2,
  medium:  0.35,
  long:    0.5,
  // Stagger step
  stagger: 0.08,
  staggerSlow: 0.14,
} as const;

// ─── Scroll Trigger Defaults ──────────────────────────────────────────────────
export const SCROLL_TRIGGER_DEFAULTS = {
  // Start animation when element is 15% into the viewport
  start:        "top 85%",
  // Default trigger point for once-only animations
  startOnce:    "top 80%",
  // Pin-worthy sections
  startPinned:  "top top",
  end:          "bottom 15%",
  toggleActions: "play none none none" as const,
  // For scrub animations
  scrub:        1,
} as const;

// ─── Framer Motion Variants ───────────────────────────────────────────────────

// Fade Up — most common reveal (optimized for high-fps mobile smoothness)
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE.fm.strong,
      delay,
    },
  }),
};

// Fade In — pure opacity
export const fadeInVariants = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASE.fm.smooth,
      delay,
    },
  }),
};

// Scale Reveal — gentle scale up
export const scaleRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.fm.strong,
      delay,
    },
  }),
};

// Slide from Left
export const slideFromLeftVariants = {
  hidden: {
    opacity: 0,
    x: -48,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.fm.strong,
      delay,
    },
  }),
};

// Slide from Right
export const slideFromRightVariants = {
  hidden: {
    opacity: 0,
    x: 48,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.fm.strong,
      delay,
    },
  }),
};

// Stagger container
export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: DELAY.stagger,
      delayChildren: 0,
    },
  },
};

// Stagger container (slow)
export const staggerContainerSlowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: DELAY.staggerSlow,
      delayChildren: 0.1,
    },
  },
};

// Stagger item — used as child inside stagger container
export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.fm.strong,
    },
  },
};

// ─── Button/Interactive Variants ──────────────────────────────────────────────
export const buttonTapVariants = {
  tap: { scale: 0.97 },
};

export const buttonHoverVariants = {
  hover: { scale: 1.02 },
};

// ─── Utility: Get stagger delay ───────────────────────────────────────────────
export function getStaggerDelay(index: number, step = DELAY.stagger): number {
  return index * step;
}

// ─── Utility: Check reduced motion preference ─────────────────────────────────
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
