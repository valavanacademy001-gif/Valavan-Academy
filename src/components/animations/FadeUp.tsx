"use client";

/**
 * Valavan Academy — FadeUp Animation Component
 * Reveals content with a fade + upward translate using Framer Motion.
 * Falls back gracefully when prefers-reduced-motion is set.
 */

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants } from "@/lib/animation";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Override the element type (default: div) */
  as?: keyof React.JSX.IntrinsicElements;
}

export default function FadeUp({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={shouldReduceMotion ? {} : fadeUpVariants}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}
