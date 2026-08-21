"use client";

/**
 * Valavan Academy — FadeIn Animation Component
 * Pure opacity reveal using Framer Motion.
 */

import { motion, useReducedMotion } from "framer-motion";
import { fadeInVariants } from "@/lib/animation";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={shouldReduceMotion ? {} : fadeInVariants}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}
