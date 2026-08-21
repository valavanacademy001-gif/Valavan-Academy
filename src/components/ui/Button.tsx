/**
 * Valavan Academy — Button Component
 * Reusable button with multiple variants, sizes, and states.
 * Supports external links, internal links, and button actions.
 */

import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type ButtonSize    = "sm" | "md" | "lg" | "xl";

// Shared props
export interface ButtonBaseProps {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children:   React.ReactNode;
  /** Show a loading spinner */
  loading?:   boolean;
  /** Prepend icon */
  iconLeft?:  React.ReactNode;
  /** Append icon */
  iconRight?: React.ReactNode;
}

// Button element props
export type ButtonElementProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
    external?: undefined;
  };

// Link props (internal or external)
export type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonElementProps | ButtonLinkProps;

// ─── Styles ───────────────────────────────────────────────────────────────────

const baseStyles = [
  "inline-flex items-center justify-center gap-2",
  "font-semibold leading-none",
  "rounded-md",
  "transition-all duration-200",
  "cursor-pointer",
  "select-none",
  "focus-visible:outline-2 focus-visible:outline-offset-3",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "whitespace-nowrap",
].join(" ");

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#1748BB] text-white",
    "hover:bg-[#0A3CA8]",
    "active:scale-[0.98]",
    "shadow-[0_8px_32px_-4px_rgba(23,72,187,0.28)]",
    "hover:shadow-lg",
  ].join(" "),

  secondary: [
    "bg-[#E8F0FE] text-[#1748BB]",
    "hover:bg-[#4A90E2] hover:text-white",
    "active:scale-[0.98]",
  ].join(" "),

  ghost: [
    "bg-transparent text-neutral-900",
    "hover:bg-neutral-100",
    "active:scale-[0.98]",
  ].join(" "),

  outline: [
    "bg-transparent text-[#1748BB]",
    "border border-[#1748BB]",
    "hover:bg-[#1748BB] hover:text-white",
    "active:scale-[0.98]",
  ].join(" "),

  danger: [
    "bg-red-600 text-white",
    "hover:opacity-90",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8  px-3   text-[0.8125rem] gap-1.5",
  md: "h-10 px-5   text-[0.9375rem] gap-2",
  lg: "h-12 px-7   text-base        gap-2",
  xl: "h-14 px-9   text-[1.0625rem] gap-2.5",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Button(props: ButtonProps) {
  const {
    variant   = "primary",
    size      = "md",
    fullWidth = false,
    className,
    children,
    loading   = false,
    iconLeft,
    iconRight,
    ...restProps
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : iconLeft ? (
        <span className="shrink-0">{iconLeft}</span>
      ) : null}
      {children}
      {!loading && iconRight && (
        <span className="shrink-0">{iconRight}</span>
      )}
    </>
  );

  // Render as anchor or Next.js Link if href is provided
  if ("href" in props && props.href) {
    const { href, external, ...anchorProps } = restProps as {
      href?: string;
      external?: boolean;
      [key: string]: unknown;
    };

    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={props.href}
        className={classes}
        {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  // Render as standard button
  return (
    <button
      className={classes}
      disabled={loading || (restProps as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
      {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
