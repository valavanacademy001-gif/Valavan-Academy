/**
 * Valavan Academy — Design Tokens (TypeScript)
 * Mirrors the CSS custom properties in globals.css.
 * Use for programmatic access (GSAP, Framer Motion, dynamic styles).
 */

export const colors = {
  brand: {
    primary:   "#1748BB",
    secondary: "#0A3CA8",
    accent:    "#4A90E2",
    light:     "#E8F0FE",
    xlight:    "#F0F6FF",
  },
  neutral: {
    50:  "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#1E2026",
  },
  semantic: {
    background:    "#FFFFFF",
    foreground:    "#1E2026",
    heading:       "#1E2026",
    surface:       "#F7F8FA",
    surfaceRaised: "#FFFFFF",
    muted:         "#6B7280",
    mutedLight:    "#9CA3AF",
    border:        "#E5E7EB",
    borderSubtle:  "#F3F4F6",
  },
  status: {
    success: "#16A34A",
    warning: "#D97706",
    error:   "#DC2626",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: '"Poppins", ui-sans-serif, system-ui, sans-serif',
    mono: "ui-monospace, SFMono-Regular, monospace",
  },
  fontSize: {
    displayXl:  "clamp(3.5rem, 7vw, 5.5rem)",
    displayLg:  "clamp(2.75rem, 5.5vw, 4.25rem)",
    displayMd:  "clamp(2.25rem, 4.5vw, 3.25rem)",
    h1:         "clamp(2rem, 3.5vw, 2.75rem)",
    h2:         "clamp(1.625rem, 2.75vw, 2.25rem)",
    h3:         "clamp(1.25rem, 2vw, 1.625rem)",
    h4:         "clamp(1.125rem, 1.5vw, 1.25rem)",
    bodyXl:     "1.25rem",
    bodyLg:     "1.125rem",
    body:       "1rem",
    bodySm:     "0.9375rem",
    small:      "0.875rem",
    caption:    "0.75rem",
    label:      "0.6875rem",
  },
  lineHeight: {
    display:  1.05,
    tight:    1.2,
    snug:     1.35,
    normal:   1.5,
    relaxed:  1.65,
    loose:    1.8,
  },
  letterSpacing: {
    tighter: "-0.04em",
    tight:   "-0.02em",
    normal:  "0em",
    wide:    "0.04em",
    wider:   "0.08em",
    widest:  "0.16em",
  },
  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold:800,
    black:    900,
  },
} as const;

export const spacing = {
  container: {
    max:      "1280px",
    wide:     "1440px",
    narrow:   "960px",
    prose:    "680px",
    px: {
      mobile:  "1.25rem",
      tablet:  "2rem",
      desktop: "3rem",
      wide:    "4rem",
    },
  },
} as const;

export const radius = {
  xs:   "2px",
  sm:   "4px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  "2xl":"24px",
  "3xl":"32px",
  pill: "9999px",
} as const;

export const shadows = {
  sm:    "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
  md:    "0 4px 12px -2px rgb(0 0 0 / 0.10), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
  lg:    "0 12px 32px -4px rgb(0 0 0 / 0.12), 0 4px 12px -2px rgb(0 0 0 / 0.07)",
  xl:    "0 24px 48px -8px rgb(0 0 0 / 0.14), 0 8px 20px -4px rgb(0 0 0 / 0.08)",
  brand: "0 8px 32px -4px rgb(23 72 187 / 0.28)",
} as const;

export const breakpoints = {
  xs:  375,
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1440,
  "3xl": 1920,
} as const;

export const zIndex = {
  below:   -1,
  base:     0,
  raised:  10,
  float:   20,
  overlay: 30,
  drawer:  40,
  modal:   50,
  tooltip: 60,
  nav:     70,
  top:     80,
} as const;

// ─── Type Exports ─────────────────────────────────────────────────────────────
export type BrandColor    = keyof typeof colors.brand;
export type SemanticColor = keyof typeof colors.semantic;
export type FontSize      = keyof typeof typography.fontSize;
export type Breakpoint    = keyof typeof breakpoints;
