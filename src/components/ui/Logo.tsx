/**
 * Valavan Academy — Logo Component
 * Renders the Valavan Academy logo with proper alt text and sizing.
 * Supports dark/light variants.
 */

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Use white logo for dark backgrounds */
  variant?: "default" | "white";
  /** Height in pixels (width auto-scales) */
  height?: number;
  className?: string;
  /** Wrap with a link to homepage */
  linked?: boolean;
  priority?: boolean;
}

export default function Logo({
  variant  = "default",
  height   = 40,
  className,
  linked   = true,
  priority = false,
}: LogoProps) {
  const src =
    variant === "white"
      ? "/assets/logo/white-logo.webp"
      : "/assets/logo/logo.jpeg";

  const alt = "Valavan Academy";

  // Approximate aspect ratio from the logo image (roughly 2.6:1)
  const width = Math.round(height * 2.6);

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height: `${height}px`, width: "auto" }}
    />
  );

  if (!linked) return img;

  return (
    <Link
      href="/"
      aria-label="Valavan Academy — Go to homepage"
      className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[--color-brand-primary] focus-visible:outline-offset-3 rounded-sm"
    >
      {img}
    </Link>
  );
}
