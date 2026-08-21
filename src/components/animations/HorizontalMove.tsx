"use client";

/**
 * Valavan Academy — HorizontalMove Animation Component
 * Smooth horizontal translate reveal using Framer Motion.
 */

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/animation";

interface HorizontalMoveProps {
  children: React.ReactNode;
  /** Distance in pixels to move from. Positive = from right, negative = from left */
  from?: number;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function HorizontalMove({
  children,
  from = 60,
  delay = 0,
  className,
  as: Tag = "div",
}: HorizontalMoveProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: DURATION.slow,
        ease: EASE.fm.strong,
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
