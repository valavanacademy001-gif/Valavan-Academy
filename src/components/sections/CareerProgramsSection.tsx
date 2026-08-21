"use client";

/**
 * Valavan Academy — Career Programs Section
 * Matching the Figma layout: Left heading & description, right program card showcase.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Award, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeUp from "@/components/animations/FadeUp";
import Button from "@/components/ui/Button";

const FEATURED_PROGRAMS = [
  {
    id: "90-days-graphic-design",
    slug: "/programs/90-days-graphic-design",
    badge: "90-DAY MASTERY",
    title: "90-Day Graphic Design Mastery",
    subtitle: "From beginner to confident commercial designer",
    description:
      "Master Photoshop, Illustrator, Canva, Logo Design, Branding, Social Media Creatives, and AI-assisted workflows in Tamil.",
    duration: "90 Days",
    rating: "4.9/5",
    image: "/assets/images/hero/ai-powered-GD.webp",
    skills: ["Photoshop", "Illustrator", "Canva", "Branding", "AI Design"],
  },
  {
    id: "full-stack-creator",
    slug: "/programs/full-stack-creator",
    badge: "FLAGSHIP PROGRAM",
    title: "Full Stack Digital Creator Program",
    subtitle: "Become a high-income multi-skilled digital professional",
    description:
      "Master Video Editing, Web Design, UI/UX, WordPress, AI Tools, and Freelance Client Acquisition in a comprehensive 6-month journey.",
    duration: "6 Months",
    rating: "5.0/5",
    image: "/assets/images/hero/full-stack-.jpg-1.webp",
    skills: ["Video Editing", "Web Design", "UI/UX", "WordPress", "Freelancing"],
  },
];

export default function CareerProgramsSection() {
  return (
    <Section surface="white" className="py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading, intro, and link */}
          <div className="lg:col-span-5 space-y-6">
            <FadeUp>
              <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.12] tracking-tight font-display text-[#1E2026]">
                Career <br />
                <span className="text-[#1748BB]">Programs</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                Structured, intensive programs tailored for Tamil learners. Every module is grounded in real-world briefs, portfolio reviews, and personal feedback.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-base font-bold text-[#1748BB] hover:text-[#0A3CA8] group transition-colors pt-2"
              >
                Explore More Programs
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="space-y-3 pt-4 border-t border-neutral-200 text-sm text-neutral-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#1748BB] shrink-0" />
                  <span>Tamil-medium mentorship by industry practitioners</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#1748BB] shrink-0" />
                  <span>Real commercial client projects and briefs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#1748BB] shrink-0" />
                  <span>Official certification & portfolio review</span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Program Showcase Cards */}
          <div className="lg:col-span-7 space-y-6">
            {FEATURED_PROGRAMS.map((program, idx) => (
              <FadeUp key={program.id} delay={0.15 * idx}>
                <div className="group rounded-2xl bg-[#0F121C] border border-neutral-800 p-6 text-white shadow-xl hover:border-[#1748BB]/50 transition-all duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Image */}
                    <div className="sm:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 250px"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#1748BB] text-[10px] font-bold uppercase tracking-wider text-white">
                        {program.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="sm:col-span-7 space-y-3">
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-[#4A90E2] transition-colors">
                        {program.title}
                      </h3>

                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        {program.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {program.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Footer info & CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
                        <div className="flex items-center gap-3 text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Clock size={13} className="text-[#1748BB]" /> {program.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award size={13} className="text-[#1748BB]" /> {program.rating}
                          </span>
                        </div>

                        <Button
                          href={program.slug}
                          variant="secondary"
                          size="sm"
                          className="bg-[#1748BB]/20 text-[#4A90E2] hover:bg-[#1748BB] hover:text-white border border-[#1748BB]/30 text-xs px-3.5 py-1.5"
                        >
                          Details →
                        </Button>
                      </div>

                    </div>

                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
