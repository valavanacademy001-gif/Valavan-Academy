"use client";

/**
 * Valavan Academy — Navbar with Dynamic Mega Menus
 * Social Eagle-style 3-column Mega Menu layout on hover for:
 * - Programs
 * - About
 * - Community
 * - Contact
 * (Home remains a direct link without a dropdown, exactly as requested)
 */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS, EXTERNAL_URLS } from "@/data/site.config";
import { cn } from "@/lib/utils";

interface MegaMenuConfig {
  col1Title: string;
  col1Links: { label: string; href: string; external?: boolean }[];
  col2Title: string;
  col2Links: { label: string; href: string; external?: boolean }[];
  overview: {
    title: string;
    description: string;
    link: string;
    linkLabel: string;
    image: string;
    imageCaption: string;
  };
}

const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  programs: {
    col1Title: "PROGRAMS & WORKSHOPS",
    col1Links: [
      { label: "Live Workshop", href: "https://valavanacademy.in/workshop/", external: true },
      { label: "Graphic Design", href: "/programs/90-days-graphic-design" },
      { label: "Full Stack Creator", href: "/programs/full-stack-creator" },
      { label: "View All Programs", href: "/programs#programs" },
    ],
    col2Title: "TRACKS & TOPICS",
    col2Links: [
      { label: "Printing Business", href: "https://valavanacademy.in/workshop/", external: true },
      { label: "Design & Branding", href: "/programs/90-days-graphic-design" },
      { label: "Video & Web Creation", href: "/programs/full-stack-creator" },
      { label: "Need Guidance?", href: "/programs#community-help" },
    ],
    overview: {
      title: "OVERVIEW",
      description:
        "Job-ready creative programs and live business workshops designed to master high-income skills and build client-ready portfolios.",
      link: "/programs",
      linkLabel: "Explore All Programs",
      image: "/assets/workshop/printing-business-workshop.webp",
      imageCaption: "3 Hours Live Workshop & Programs",
    },
  },
  about: {
    col1Title: "ABOUT",
    col1Links: [
      { label: "Purpose", href: "/about#story" },
      { label: "Founder", href: "/about#founder" },
      { label: "Milestones", href: "/about#milestones" },
      { label: "Core Values", href: "/about#values" },
    ],
    col2Title: "DISCOVER",
    col2Links: [
      { label: "Mentors", href: "/about#mentors" },
      { label: "The Advantage", href: "/about#advantage" },
      { label: "Our Impact", href: "/about#impact" },
      { label: "Valavan Ventures", href: "/about#story" },
    ],
    overview: {
      title: "OVERVIEW",
      description:
        "Our story, our mentors, and the milestones that built Tamil Nadu's largest creative learning ecosystem.",
      link: "/about",
      linkLabel: "Explore About",
      image: "/assets/images/team/team.webp",
      imageCaption: "Valavan Academy Mentors & TNCC",
    },
  },
  community: {
    col1Title: "TNCC HUB",
    col1Links: [
      { label: "WhatsApp Group", href: EXTERNAL_URLS.community, external: true },
      { label: "Community Stats", href: "/community#stats" },
      { label: "Member Benefits", href: "/community#benefits" },
      { label: "Join Free Hub", href: "/community#join" },
    ],
    col2Title: "ACTIVITIES",
    col2Links: [
      { label: "Peer Networking", href: "/community#benefits" },
      { label: "Design Feedback", href: "/community#benefits" },
      { label: "Client Opportunities", href: "/community#benefits" },
      { label: "Workshops", href: "/community#benefits" },
    ],
    overview: {
      title: "OVERVIEW",
      description:
        "A thriving ecosystem of 40,000+ Tamil designers, video editors, and digital creators accelerating their growth together.",
      link: "/community",
      linkLabel: "Explore TNCC Community",
      image: "/assets/about/team-1024x682.webp",
      imageCaption: "Tamil Nadu Creators Club (40K+)",
    },
  },
  contact: {
    col1Title: "DIRECT DESK",
    col1Links: [
      { label: "Fastest Response", href: "/contact#support" },
      { label: "Admissions Desk", href: "/contact#admissions" },
      { label: "Direct Channels", href: "/contact#channels" },
      { label: "WhatsApp Support", href: EXTERNAL_URLS.community, external: true },
    ],
    col2Title: "CONNECT",
    col2Links: [
      { label: "Instagram", href: "https://instagram.com/valavanacademy", external: true },
      { label: "YouTube", href: "https://youtube.com/@valavanacademy", external: true },
      { label: "Social DM", href: "/contact#social" },
      { label: "Valavan Ventures", href: "/about#story" },
    ],
    overview: {
      title: "OVERVIEW",
      description:
        "Have questions about our programs, cohort schedules, or admissions? Reach out to our dedicated student helpdesk.",
      link: "/contact",
      linkLabel: "Contact Helpdesk",
      image: "/assets/about/valavan.webp",
      imageCaption: "Dedicated Student Support",
    },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Pages with dark hero background at the top
  const isDarkHeroPage =
    pathname === "/" ||
    pathname === "/programs/90-days-graphic-design" ||
    pathname === "/programs/full-stack-creator";

  // Use light nav styling on light pages, or when scrolled, or when mega menu is open
  const isLightNav = !isDarkHeroPage || scrolled || activeDropdown !== null;

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle smooth mouse enter with debounce cancellation
  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  // Handle smooth mouse leave with small bridge delay
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-[70]",
    "transition-all duration-300",
    isLightNav
      ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3.5"
      : "bg-transparent py-5"
  );

  return (
    <>
      <header className={navbarClasses} role="banner">
        <div className="va-container">
          <nav
            className="flex items-center justify-between"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <div className="shrink-0">
              <Logo
                variant={isLightNav ? "default" : "white"}
                height={38}
                className="h-5 sm:h-6 lg:h-9.5 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation Links */}
            <div
              className="hidden lg:flex items-center gap-1.5"
              ref={dropdownRef}
            >
              {NAV_LINKS.map((link) => {
                const isHome = link.id === "home";
                const menuData = MEGA_MENUS[link.id];
                const hasMegaMenu = !isHome && !!menuData;
                const isActive = activeDropdown === link.id;

                if (hasMegaMenu) {
                  return (
                    <div
                      key={link.id}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(link.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={link.href}
                        style={{ color: isLightNav ? "#1E2026" : "#FFFFFF" }}
                        className={cn(
                          "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer",
                          "focus-visible:outline-2 focus-visible:outline-[#1748BB]",
                          isLightNav
                            ? "hover:text-[#1748BB] hover:bg-neutral-100/80"
                            : "hover:text-[#4A90E2] hover:bg-white/10",
                          isActive
                            ? isLightNav
                              ? "!text-[#1748BB] bg-[#F0F6FF]"
                              : "!text-[#4A90E2] bg-white/15"
                            : ""
                        )}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-200",
                            isActive ? "rotate-180 text-[#1748BB]" : "opacity-60"
                          )}
                        />
                      </Link>

                      {/* ── UNIFIED MEGA MENU RENDER ── */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key={link.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed left-1/2 -translate-x-1/2 top-[68px] w-[94vw] max-w-5xl bg-white rounded-3xl border border-neutral-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.15)] overflow-hidden z-[90] p-7 sm:p-8"
                            onMouseEnter={() => handleMouseEnter(link.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="grid grid-cols-12 gap-8 items-start">
                              
                              {/* ── Column 1: Primary Section Links ── */}
                              <div className="col-span-3 space-y-4">
                                <p className="font-sans text-[11px] font-extrabold tracking-[0.2em] uppercase text-neutral-400">
                                  {menuData.col1Title}
                                </p>
                                <ul className="space-y-2.5">
                                  {menuData.col1Links.map((item) => (
                                    <li key={item.label}>
                                      {item.external ? (
                                        <a
                                          href={item.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => setActiveDropdown(null)}
                                          className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#1E2026] hover:text-[#1748BB] transition-colors"
                                        >
                                          <span>{item.label}</span>
                                          <ArrowUpRight
                                            size={14}
                                            className="text-neutral-400 group-hover:text-[#1748BB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                          />
                                        </a>
                                      ) : (
                                        <Link
                                          href={item.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#1E2026] hover:text-[#1748BB] transition-colors"
                                        >
                                          <span>{item.label}</span>
                                          <ArrowUpRight
                                            size={14}
                                            className="text-neutral-400 group-hover:text-[#1748BB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                          />
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* ── Column 2: Highlights / Explore Links ── */}
                              <div className="col-span-3 space-y-4 border-l border-neutral-100 pl-6">
                                <p className="font-sans text-[11px] font-extrabold tracking-[0.2em] uppercase text-neutral-400">
                                  {menuData.col2Title}
                                </p>
                                <ul className="space-y-2.5">
                                  {menuData.col2Links.map((item) => (
                                    <li key={item.label}>
                                      {item.external ? (
                                        <a
                                          href={item.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => setActiveDropdown(null)}
                                          className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#1E2026] hover:text-[#1748BB] transition-colors"
                                        >
                                          <span>{item.label}</span>
                                          <ArrowUpRight
                                            size={14}
                                            className="text-neutral-400 group-hover:text-[#1748BB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                          />
                                        </a>
                                      ) : (
                                        <Link
                                          href={item.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#1E2026] hover:text-[#1748BB] transition-colors"
                                        >
                                          <span>{item.label}</span>
                                          <ArrowUpRight
                                            size={14}
                                            className="text-neutral-400 group-hover:text-[#1748BB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                          />
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* ── Column 3: Overview Narrative & Visual Card ── */}
                              <div className="col-span-6 space-y-3.5 border-l border-neutral-100 pl-8">
                                <p className="font-sans text-[11px] font-extrabold tracking-[0.2em] uppercase text-neutral-400">
                                  {menuData.overview.title}
                                </p>
                                
                                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
                                  {menuData.overview.description}
                                </p>

                                <Link
                                  href={menuData.overview.link}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group inline-flex items-center gap-1 text-xs font-bold text-[#1748BB] hover:underline"
                                >
                                  <span>{menuData.overview.linkLabel}</span>
                                  <ArrowUpRight
                                    size={13}
                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                  />
                                </Link>

                                {/* Visual Image Banner Card */}
                                <Link
                                  href={menuData.overview.link}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block relative aspect-[16/8] w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm group hover:shadow-md transition-shadow cursor-pointer mt-2"
                                >
                                  <Image
                                    src={menuData.overview.image}
                                    alt={menuData.overview.imageCaption}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="500px"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm truncate mr-2">
                                      {menuData.overview.imageCaption}
                                    </span>
                                    <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/30 shrink-0">
                                      View All →
                                    </span>
                                  </div>
                                </Link>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Normal link for Home
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    style={{ color: isLightNav ? "#1E2026" : "#FFFFFF" }}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                      "focus-visible:outline-2 focus-visible:outline-[#1748BB]",
                      isLightNav
                        ? "hover:text-[#1748BB] hover:bg-neutral-100/80"
                        : "hover:text-[#4A90E2] hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={EXTERNAL_URLS.login}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: isLightNav ? "#1E2026" : "#FFFFFF" }}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 inline-flex items-center gap-1.5",
                  "focus-visible:outline-2 focus-visible:outline-[#1748BB]",
                  isLightNav
                    ? "hover:text-[#1748BB]"
                    : "hover:text-[#4A90E2]"
                )}
                aria-label="Login to your account"
              >
                <span>Login</span>
                <ExternalLink size={13} className="opacity-70" />
              </a>

              <a
                href={EXTERNAL_URLS.signup}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FFFFFF" }}
                className="bg-[#1748BB] hover:bg-[#0A3CA8] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(23,72,187,0.35)] hover:scale-105 transition-all inline-flex items-center justify-center"
                aria-label="Enroll now"
              >
                Join Now
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={cn(
                "lg:hidden flex flex-col justify-center items-center",
                "w-7.5 h-7.5 rounded-lg gap-1",
                "transition-colors duration-150",
                isLightNav
                  ? "hover:bg-neutral-100"
                  : "hover:bg-white/15",
                "focus-visible:outline-2 focus-visible:outline-[#1748BB]"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  "block h-[1.75px] rounded-full transition-all duration-300 w-3.5",
                  isLightNav ? "bg-neutral-800" : "bg-white shadow-sm"
                )}
              />
              <span
                className={cn(
                  "block h-[1.75px] rounded-full transition-all duration-300 w-2.5",
                  isLightNav ? "bg-neutral-800" : "bg-white shadow-sm"
                )}
              />
              <span
                className={cn(
                  "block h-[1.75px] rounded-full transition-all duration-300 w-3.5",
                  isLightNav ? "bg-neutral-800" : "bg-white shadow-sm"
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
