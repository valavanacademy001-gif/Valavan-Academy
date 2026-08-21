"use client";

/**
 * Valavan Academy — SlideReveal Animation Component
 * Reveals content sliding in from left or right.
 */

import { motion, useReducedMotion } from "framer-motion";
import { slideFromLeftVariants, slideFromRightVariants } from "@/lib/animation";

interface SlideRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function SlideReveal({
  children,
  direction = "left",
  delay = 0,
  className,
  as: Tag = "div",
}: SlideRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  const variants =
    direction === "left" ? slideFromLeftVariants : slideFromRightVariants;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={shouldReduceMotion ? {} : variants}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}
