/**
 * Footer — Phase 8
 * Full footer with brand info, navigation, social links.
 * Light background with dark text (proper contrast).
 */

import Link from "next/link";
import Image from "next/image";
import {
  EXTERNAL_URLS,
  SOCIAL_LINKS,
  FOOTER_LINKS,
  SITE_CONFIG,
} from "@/data/site.config";
import { CMSSiteSettings } from "@/lib/cms";

// Social icons as simple SVG paths
function SocialIcon({ id }: { id: string }) {
  const paths: Record<string, React.ReactNode> = {
    facebook: (
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    youtube: (
      <>
        <path
          d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
  };
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      {paths[id]}
    </svg>
  );
}

interface FooterProps {
  settings?: CMSSiteSettings;
}

export default function Footer({ settings }: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      id: "facebook",
      label: "Facebook",
      url: settings?.facebook_url || SOCIAL_LINKS.find((s) => s.id === "facebook")?.url || "https://www.facebook.com/ValavanAcademy",
      icon: "facebook",
    },
    {
      id: "youtube",
      label: "YouTube",
      url: settings?.youtube_url || SOCIAL_LINKS.find((s) => s.id === "youtube")?.url || "https://www.youtube.com/@ValavanAcademyofficial",
      icon: "youtube",
    },
    {
      id: "instagram",
      label: "Instagram",
      url: settings?.instagram_url || SOCIAL_LINKS.find((s) => s.id === "instagram")?.url || "https://www.instagram.com/valavanacademy",
      icon: "instagram",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: settings?.linkedin_url || SOCIAL_LINKS.find((s) => s.id === "linkedin")?.url || "https://www.linkedin.com/in/valavan-p-813383337/",
      icon: "linkedin",
    },
  ];

  return (
    <footer className="bg-[#0D0F14] text-white relative z-20" aria-label="Site footer">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/assets/logo/white-logo.webp"
                alt="Valavan Academy"
                width={105}
                height={26}
                className="h-5 sm:h-5.5 w-auto object-contain"
                priority
              />
            </Link>
            <p className="font-sans text-neutral-400 text-sm leading-relaxed font-normal max-w-xs">
              {settings?.description || "Graphic Design · Video Editing · Web Design · UI/UX · AI Tools · Digital Skills — taught in Tamil, built for careers."}
            </p>
            {/* Social */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#1748BB] hover:border-[#1748BB]/40 transition-all duration-200"
                >
                  <SocialIcon id={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="font-sans font-semibold text-white text-sm uppercase tracking-wider">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Programs", href: "/programs" },
                { label: "About", href: "/about" },
                { label: "Community", href: "/community" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-neutral-400 hover:text-white text-sm font-normal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <p className="font-sans font-semibold text-white text-sm uppercase tracking-wider">
              Programs
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-neutral-400 hover:text-white text-sm font-normal transition-colors leading-snug"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <p className="font-sans font-semibold text-white text-sm uppercase tracking-wider">
              Account
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={EXTERNAL_URLS.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-neutral-400 hover:text-white text-sm font-normal transition-colors"
                >
                  Log In
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_URLS.signup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-neutral-400 hover:text-white text-sm font-normal transition-colors"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_URLS.community}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-neutral-400 hover:text-white text-sm font-normal transition-colors"
                >
                  TNCC Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-neutral-600 text-xs font-normal text-center sm:text-left">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="font-sans text-neutral-600 text-xs font-normal">
            Tamil-first Creative Learning Academy
          </p>
        </div>
      </div>
    </footer>
  );
}
