"use client";

/**
 * Valavan Academy — Mobile Menu
 * Full-screen slide-in menu for mobile devices.
 * Animated with Framer Motion, keyboard accessible.
 */

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { NAV_LINKS, EXTERNAL_URLS, SOCIAL_LINKS } from "@/data/site.config";
import { cn } from "@/lib/utils";
import { SOCIAL_ICON_MAP } from "@/components/ui/SocialIcons";

interface MobileMenuProps {
  isOpen:   boolean;
  onClose:  () => void;
}



export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const containerVariants = {
    hidden:  { x: "100%" },
    visible: { x: 0 },
  };

  const overlayVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  };

  const itemVariants = {
    hidden:  { opacity: 0, x: 24 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.06,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className={cn(
              "fixed right-0 top-0 bottom-0 z-[80] w-full max-w-sm",
              "bg-white flex flex-col",
              "lg:hidden overflow-y-auto"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[--color-border]">
              <Logo height={34} />
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className={cn(
                  "flex items-center justify-center",
                  "w-9 h-9 rounded-lg",
                  "text-[--color-neutral-600]",
                  "hover:bg-[--color-neutral-100] hover:text-[--color-foreground]",
                  "transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-[--color-brand-primary]"
                )}
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6" aria-label="Mobile navigation">
              <ul className="space-y-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.id}>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between",
                          "px-4 py-3.5 rounded-xl",
                          "text-[--color-foreground] font-medium text-base",
                          "hover:bg-[--color-brand-xlight] hover:text-[--color-brand-primary]",
                          "transition-colors duration-150",
                          "focus-visible:outline-2 focus-visible:outline-[--color-brand-primary]"
                        )}
                        onClick={onClose}
                      >
                        {link.label}
                        <ChevronRight
                          size={16}
                          className="text-[--color-neutral-400]"
                        />
                      </Link>

                      {/* Sub-links */}
                      {"children" in link && link.children && (
                        <ul className="mt-1 ml-4 space-y-1" role="list">
                          {link.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2.5 rounded-lg",
                                  "text-[--color-muted] text-sm font-medium",
                                  "hover:text-[--color-brand-primary] hover:bg-[--color-brand-xlight]",
                                  "transition-colors duration-150"
                                )}
                                onClick={onClose}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTAs */}
            <div className="px-4 py-4 border-t border-[--color-border] space-y-3">
              <a
                href={EXTERNAL_URLS.login}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2",
                  "w-full px-5 py-3 rounded-xl",
                  "text-[--color-foreground] text-sm font-semibold",
                  "border border-[--color-border]",
                  "hover:border-[--color-brand-primary] hover:text-[--color-brand-primary]",
                  "transition-colors duration-150"
                )}
                onClick={onClose}
              >
                Login to Account
                <ExternalLink size={14} />
              </a>

              <Button
                href={EXTERNAL_URLS.signup}
                external
                variant="primary"
                size="lg"
                fullWidth
                onClick={onClose}
              >
                Enroll Now →
              </Button>
            </div>

            {/* Social Links */}
            <div className="px-4 py-4 border-t border-[--color-border]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[--color-muted-light] mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.icon];
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.label}`}
                      className={cn(
                        "flex items-center justify-center",
                        "w-9 h-9 rounded-full",
                        "bg-[--color-neutral-100] text-[--color-neutral-500]",
                        "hover:bg-[--color-brand-primary] hover:text-white",
                        "transition-all duration-200"
                      )}
                    >
                      {Icon && <Icon size={16} />}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
