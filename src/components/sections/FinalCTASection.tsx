"use client";

/**
 * Final CTA Section — Phase 8
 * YOUR NEXT CHAPTER STARTS HERE.
 * Background: #BACFFF (light blue theme)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { EXTERNAL_URLS } from "@/data/site.config";

export default function FinalCTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="bg-white py-24 sm:py-32 relative z-20 overflow-hidden border-t border-neutral-100">
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display font-bold whitespace-nowrap"
          style={{ fontSize: "clamp(100px, 20vw, 280px)", color: "#1748BB", opacity: 0.025 }}
        >
          START NOW
        </span>
      </div>

      <Container className="relative z-10 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: "#1748BB", opacity: 0.4 }} />
            <span className="font-sans text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: "#1748BB" }}>
              Get Started
            </span>
            <div className="w-8 h-[2px]" style={{ backgroundColor: "#1748BB", opacity: 0.4 }} />
          </div>

          <h2
            className="font-display font-bold leading-[1.02] sm:leading-[1.06] tracking-tight mx-auto"
            style={{ fontSize: "clamp(36px, 5.5vw, 76px)", maxWidth: "14ch", color: "#1E2026" }}
          >
            Your Next Chapter{" "}
            <span style={{ color: "#1748BB" }}>Starts Here.</span>
          </h2>

          <p
            className="font-sans text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ color: "#525252" }}
          >
            Learn practical digital skills. Build real projects. Create your
            future — in Tamil.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary Blue Button */}
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full hover:scale-105 transition-all duration-200"
            style={{
              backgroundColor: "#1748BB",
              boxShadow: "0 10px 30px rgba(23, 72, 187,0.45)",
            }}
          >
            <ArrowUpRight size={18} className="text-white" />
            <span className="text-white font-bold">Explore Courses</span>
          </Link>

          {/* Secondary Button */}
          <a
            href={EXTERNAL_URLS.community}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full border-2 hover:scale-105 transition-all duration-200"
            style={{
              color: "#1748BB",
              backgroundColor: "#ffffff",
              borderColor: "#1748BB",
            }}
          >
            <span className="font-semibold" style={{ color: "#1748BB" }}>
              Join TNCC Community
            </span>
            <span style={{ color: "#1748BB" }}>→</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
