/**
 * Valavan Academy — Centralized Site Configuration
 * All external links, social links, navigation, and brand data live here.
 * Import from this file rather than scattering URLs across components.
 */

// ─── External URLs ────────────────────────────────────────────────────────────
export const EXTERNAL_URLS = {
  login:     "https://learn.valavanacademy.com/clientapp/login",
  signup:    "https://learn.valavanacademy.com/clientapp/signup",
  community: "https://tamilnaducreatorsclub.com/",
  workshop:  "https://valavanacademy.in/workshop/",
} as const;

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  {
    id:       "facebook",
    label:    "Facebook",
    url:      "https://www.facebook.com/ValavanAcademy",
    icon:     "facebook",
  },
  {
    id:       "youtube",
    label:    "YouTube",
    url:      "https://www.youtube.com/@ValavanAcademyofficial",
    icon:     "youtube",
  },
  {
    id:       "instagram",
    label:    "Instagram",
    url:      "https://www.instagram.com/valavanacademy",
    icon:     "instagram",
  },
  {
    id:       "linkedin",
    label:    "LinkedIn",
    url:      "https://www.linkedin.com/in/valavan-p-813383337/",
    icon:     "linkedin",
  },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  {
    id:    "home",
    label: "Home",
    href:  "/",
  },
  {
    id:    "programs",
    label: "Programs",
    href:  "/programs",
    children: [
      {
        id:          "graphic-design",
        label:       "90-Day Graphic Design Mastery",
        href:        "/programs/90-days-graphic-design",
        description: "Master Photoshop, Illustrator & Canva in 90 days",
      },
      {
        id:          "full-stack",
        label:       "Full Stack Creator Program",
        href:        "/programs/full-stack-creator",
        description: "Become a high-income digital creator",
      },
    ],
  },
  {
    id:    "about",
    label: "About",
    href:  "/about",
  },
  {
    id:    "community",
    label: "Community",
    href:  "/community",
  },
  {
    id:    "contact",
    label: "Contact",
    href:  "/contact",
  },
] as const;

// ─── Programs Data ────────────────────────────────────────────────────────────
export const PROGRAMS = [
  {
    id:          "90-days-graphic-design",
    slug:        "/programs/90-days-graphic-design",
    title:       "90-Day Graphic Design Mastery",
    subtitle:    "From beginner to confident designer",
    description:
      "A practical, project-driven program covering Photoshop, Illustrator, Canva, Logo Design, Social Media Design, Branding, and AI-powered design workflows.",
    duration:    "90 Days",
    language:    "Tamil",
    level:       "Beginner to Intermediate",
    image:       "/assets/images/hero/ai-powered-GD.webp",
    skills: [
      "Photoshop",
      "Illustrator",
      "Canva",
      "Logo Design",
      "Branding",
      "Social Media Design",
      "AI Graphic Design",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    id:          "full-stack-creator",
    slug:        "/programs/full-stack-creator",
    title:       "Full Stack Digital Creator Program",
    subtitle:    "Master high-income digital skills",
    description:
      "A comprehensive program covering Video Editing, Web Design, UI/UX, WordPress, AI Tools, and everything you need to become a full-stack digital creator.",
    duration:    "6 Months",
    language:    "Tamil",
    level:       "Beginner to Advanced",
    image:       "/assets/images/hero/full-stack-.jpg-1.webp",
    skills: [
      "Video Editing",
      "Web Design",
      "UI/UX",
      "WordPress",
      "AI Tools",
      "Digital Marketing",
      "Freelancing",
    ],
    featured: true,
    badge: "Comprehensive",
  },
] as const;

// ─── Learning Areas (Skills) ──────────────────────────────────────────────────
export const LEARNING_AREAS = [
  { id: "graphic-design",  label: "Graphic Design",  icon: "palette" },
  { id: "video-editing",   label: "Video Editing",   icon: "video" },
  { id: "web-design",      label: "Web Design",      icon: "globe" },
  { id: "ui-ux",           label: "UI/UX Design",    icon: "layout" },
  { id: "ai-tools",        label: "AI Tools",        icon: "cpu" },
  { id: "digital-skills",  label: "Digital Skills",  icon: "trending-up" },
  { id: "full-stack",      label: "Full Stack Creator", icon: "layers" },
] as const;

// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE_CONFIG = {
  name:             "Valavan Academy",
  tagline:          "Learn · Practice · Create · Grow",
  description:
    "Valavan Academy is a Tamil-first creative learning academy focused on practical digital skills — Graphic Design, Video Editing, Web Design, UI/UX, and AI Tools.",
  shortDescription: "Tamil-first creative learning academy for digital skills",
  url:              "https://valavanacademy.com",
  locale:           "en_IN",
  twitter:          "@valavanacademy",
  ogImage:          "/assets/logo/logo.jpeg",
  themeColor:       "#1748BB",
  language:         "Tamil / English",
  location:         "India",
} as const;

// ─── Footer Links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  programs: [
    { label: "90-Day Graphic Design", href: "/programs/90-days-graphic-design" },
    { label: "Full Stack Creator",    href: "/programs/full-stack-creator" },
  ],
  company: [
    { label: "About Us",  href: "/about" },
    { label: "Community", href: "/community" },
    { label: "Contact",   href: "/contact" },
  ],
  account: [
    { label: "Login",    href: EXTERNAL_URLS.login,  external: true },
    { label: "Sign Up",  href: EXTERNAL_URLS.signup, external: true },
  ],
} as const;
