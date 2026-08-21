"use client";

/**
 * Valavan Academy — ScaleReveal Animation Component
 * Reveals content with a gentle scale-up animation.
 */

import { motion, useReducedMotion } from "framer-motion";
import { scaleRevealVariants } from "@/lib/animation";

interface ScaleRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ScaleReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: ScaleRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={shouldReduceMotion ? {} : scaleRevealVariants}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}
