/**
 * Valavan Academy — Container Component
 * Max-width wrapper with consistent responsive horizontal padding.
 */

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use the wider container variant (1440px) */
  wide?: boolean;
  /** Use the narrow container variant (960px) */
  narrow?: boolean;
  /** Render as a different HTML element */
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer";
}

export default function Container({
  children,
  className,
  wide = false,
  narrow = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "va-container",
        wide   ? "va-container-wide"   : "",
        narrow ? "va-container-narrow" : "",
        className
      )}
    >
      {children}
    </Tag>
  );
}
