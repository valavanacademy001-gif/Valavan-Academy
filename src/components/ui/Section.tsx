/**
 * Valavan Academy — Section Component
 * Vertical spacing wrapper with semantic <section> element.
 * Provides consistent section padding throughout the site.
 */

import { cn } from "@/lib/utils";

type SectionSize = "sm" | "md" | "lg";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: SectionSize;
  id?: string;
  /** Background surface variant */
  surface?: "white" | "gray" | "brand-light";
  /** Render as a different semantic element */
  as?: "section" | "div" | "article";
}

const sizeClasses: Record<SectionSize, string> = {
  sm: "va-section-sm",
  md: "va-section",
  lg: "va-section-lg",
};

const surfaceClasses: Record<string, string> = {
  white:       "bg-white",
  gray:        "bg-surface",
  "brand-light": "bg-[--color-brand-xlight]",
};

export default function Section({
  children,
  className,
  size = "md",
  id,
  surface,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        sizeClasses[size],
        surface ? surfaceClasses[surface] : "",
        className
      )}
    >
      {children}
    </Tag>
  );
}
