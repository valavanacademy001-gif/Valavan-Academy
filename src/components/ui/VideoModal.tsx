"use client";

/**
 * Valavan Academy — Reusable Video Modal
 * Allows playing video demos or YouTube/HTML5 videos on demand.
 */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen:   boolean;
  onClose:  () => void;
  title?:   string;
  videoSrc?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  title = "Valavan Academy Showcase",
  videoSrc,
}: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
              <h3 className="text-sm font-semibold text-white truncate">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player / Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {videoSrc ? (
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-[#1748BB]/20 border border-[#1748BB]/40 flex items-center justify-center text-[#1748BB] mb-4">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Video Preview</h4>
                  <p className="text-neutral-400 text-sm max-w-md">
                    Student transformation & course walkthrough video available in full program modules.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
