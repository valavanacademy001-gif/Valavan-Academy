"use client";

/**
 * Valavan Academy — StaggerReveal Animation Component
 * Wraps children and staggers their reveal animations.
 * Each child should be wrapped in a motion element or use staggerItemVariants.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerContainerSlowVariants,
  staggerItemVariants,
} from "@/lib/animation";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  slow?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export function StaggerReveal({
  children,
  className,
  slow = false,
  as: Tag = "div",
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={
        shouldReduceMotion
          ? {}
          : slow
          ? staggerContainerSlowVariants
          : staggerContainerVariants
      }
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={shouldReduceMotion ? {} : staggerItemVariants}
    >
      {children}
    </MotionTag>
  );
}
