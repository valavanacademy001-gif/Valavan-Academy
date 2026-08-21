/**
 * Valavan Academy — Badge Component
 * Small label/pill for program types, statuses, categories, etc.
 */

import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "success" | "warning" | "neutral" | "outline";
type BadgeSize    = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?:    BadgeSize;
  className?: string;
  dot?:     boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  brand:   "bg-[--color-brand-light] text-[--color-brand-primary] border border-[--color-brand-accent]/20",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  neutral: "bg-[--color-neutral-100] text-[--color-neutral-600] border border-[--color-neutral-200]",
  outline: "bg-transparent text-[--color-foreground] border border-[--color-border]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-[0.6875rem] px-2   py-0.5 gap-1",
  md: "text-[0.75rem]   px-2.5 py-1   gap-1.5",
};

export default function Badge({
  children,
  variant  = "neutral",
  size     = "md",
  className,
  dot      = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold leading-none uppercase tracking-wider",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "rounded-full size-1.5 shrink-0",
            variant === "brand"   ? "bg-[--color-brand-primary]" :
            variant === "success" ? "bg-green-500" :
            variant === "warning" ? "bg-amber-500" :
            "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}
