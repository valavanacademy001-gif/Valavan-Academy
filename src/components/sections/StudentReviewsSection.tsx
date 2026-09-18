"use client";

/**
 * StudentReviewsSection — "Hear from Our Students"
 * - Responsive 3-column masonry on desktop
 * - Sticky Stacking Deck Effect on mobile
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground";
import { CMSTestimonial, CMSSectionMeta } from "@/lib/cms";

/* ─────────────────── ICONS ─────────────────── */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#1748BB" stroke="#1748BB" strokeWidth="1"/>
  </svg>
);

/* ─────────────────── DATA ─────────────────── */
const REVIEWS = [
  {
    id: "r-1",
    name: "Gowri sh",
    rating: 5,
    platform: "star",
    text: "I attended Photoshop & Illustrator & Coreldraw class from sir. Teaching method romba clear-aa irundhuchu, basics-la irundhu advanced-vara step by step explain panninneenga. Practice works, tips & shortcuts ellam real-time design work-ku romba helpful-aa irukku. Beginner-aa irundhalum easy-aa understand panna mudiyum. Strongly recommend panneen. Thank you sir for your guidance...",
  },
  {
    id: "r-2",
    name: "Soban",
    rating: 5,
    platform: "google",
    text: "Before joining Valavan Academy, web design felt like a maze of codes and confusion. But their expert training unlocked everything — from layout basics to advanced UI/UX design. Today, I confidently build clean, responsive, and modern websites that not only look good but work perfectly on all devices. If you want to turn your web design dreams into real projects, this is the place to start! 🔥",
  },
  {
    id: "r-3",
    name: "Saranya Swetha",
    rating: 5,
    platform: "google",
    text: "I joined with zero experience, but thanks to the clear guidance and hands-on sessions, I now feel confident in using design tools like photoshop and premiere Pro. This academy truly helped me unlock my creative side.",
  },
  {
    id: "r-4",
    name: "Maran",
    rating: 5,
    platform: "google",
    text: "Joining the Valavan Academy for graphic design is really a valuable one. I have gained a lot of knowledge from scratch to pro. Now I feel very confident to take up any projects. The mentors are very friendly and clear all the doubts patiently. I strongly recommend this academy for all passionate beginners.",
  },
  {
    id: "r-5",
    name: "Raji G",
    rating: 5,
    platform: "google",
    text: "Learning from scratch was a breeze at Valavan Academy! The step-by-step guidance made everything easy to understand and implement in real-world scenarios.",
  },
  {
    id: "r-6",
    name: "Surya",
    rating: 5,
    platform: "google",
    text: "I took a Graphic Design Course at Valavan Academy, and it was a great experience. The classes were clear, easy to understand, and very practical. I learned Photoshop, Illustrator, and other design tools with hands-on practice. The mentors were supportive and cleared all my doubts patiently. Highly recommended for beginners who want to build a career in graphic design!",
  },
  {
    id: "r-7",
    name: "Sowndar Rajan",
    rating: 5,
    platform: "google",
    text: "Great experience. The session was very engaging and knowledgeable. Best coaching centre.",
  },
  {
    id: "r-8",
    name: "Rajesh Kannan",
    rating: 5,
    platform: "google",
    text: "One of the best academy to learn graphic design and video editing in Tamil. Mentors explain each concept with live practical examples. Best decision to join here!",
  },
  {
    id: "r-9",
    name: "Praveen Kumar",
    rating: 5,
    platform: "google",
    text: "I was looking for a practical course in Tamil and Valavan Academy exceeded all my expectations. The curriculum is completely industry-oriented and covers AI design workflows.",
  },
  {
    id: "r-10",
    name: "Karthik Raja",
    rating: 5,
    platform: "google",
    text: "Valavan sir and team provide incredible support throughout the journey. Today I am handling client branding projects on my own. Thank you so much!",
  },
  {
    id: "r-11",
    name: "Dinesh Babu",
    rating: 5,
    platform: "google",
    text: "The 1-on-1 portfolio reviews and community feedback helped me level up my design aesthetics significantly. Truly worth every rupee invested.",
  },
  {
    id: "r-12",
    name: "Yuvan U",
    rating: 5,
    platform: "linkedin",
    text: "It was a valuable experience where I learned directly from successful Investors and entrepreneurs. The sessions gave me clear insights into how startups grow, how to approach investors, and how to build strong business ideas.",
  },
  {
    id: "r-13",
    name: "Nagasubramanian S",
    rating: 5,
    platform: "google",
    text: "I Am Happy To Thank First Of All Valavan Academy And Entire Team Members For Supporting Me In All Aspects Regarding This Learning And Technical Support. I Want To Thank Sri Sundhar Sir And Sri Nandhalakumar Sir Also In Assisting Me For The Clarifications And All Excellent Coaching Centre This One. Hats Off To All Members Including Sri Valavan Sir.",
  },
  {
    id: "r-14",
    name: "Suganesh K",
    rating: 5,
    platform: "google",
    text: "The expert-led sessions at Valavan Academy are packed with practical knowledge — perfect for learners who want real results in tech and creativity.",
  },
];

/* ─────────────────── CARD ─────────────────── */
function ReviewCard({
  review,
  index,
  isMobileStack = false,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
  isMobileStack?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;
  const displayText =
    !isLong || expanded ? review.text : review.text.slice(0, 160) + "...";

  const topOffset = 80 + (index % 6) * 12;
  const zIndex = 10 + (index % 6) * 5;

  return (
    <div
      style={
        isMobileStack
          ? {
              position: "sticky",
              top: `${topOffset}px`,
              zIndex: zIndex,
            }
          : undefined
      }
      className={isMobileStack ? "mb-8" : ""}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
        className="rounded-[24px] bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-[0_6px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(23,72,187,0.08)] hover:border-[#1748BB]/40 transition-all duration-300 flex flex-col gap-4 relative"
      >
        {/* Top bar: Stars + platform logo */}
        <div className="flex items-center justify-between">
          {/* 5 Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>

          {/* Platform verified logo */}
          <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
            {review.platform === "google" && <GoogleIcon />}
            {review.platform === "linkedin" && <LinkedInIcon />}
            {review.platform === "star" && (
              <Star size={16} className="fill-[#1748BB] text-[#1748BB]" />
            )}
          </div>
        </div>

        {/* Reviewer Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1748BB]/10 text-[#1748BB] font-display font-bold text-sm flex items-center justify-center">
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-display font-bold text-neutral-900 text-sm sm:text-base">
              {review.name}
            </h4>
            <p className="font-sans text-[11px] text-neutral-600 font-medium">Verified Student</p>
          </div>
        </div>

        {/* Review Text */}
        <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed">
          <span>{displayText}</span>
        </p>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="self-start font-sans text-xs font-bold text-[#1748BB] hover:text-[#0A3CA8] flex items-center gap-1 transition-colors cursor-pointer pt-1"
          >
            {expanded ? "Show Less ↑" : "Read More →"}
          </button>
        )}
      </motion.div>
    </div>
  );
}

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  platform: string;
  text: string;
}

interface StudentReviewsSectionProps {
  reviews?: CMSTestimonial[];
  meta?: CMSSectionMeta;
}

/* ─────────────────── SECTION ─────────────────── */
export default function StudentReviewsSection({ reviews: cmsReviews, meta }: StudentReviewsSectionProps = {}) {
  const displayReviews: ReviewItem[] = (cmsReviews && cmsReviews.length > 0)
    ? cmsReviews.map((t, idx) => ({
        id: t.id || `r-${idx}`,
        name: t.student_name,
        rating: t.rating || 5,
        platform: "google",
        text: t.testimonial,
      }))
    : REVIEWS;

  // Split reviews into 3 columns for desktop masonry
  const col1 = displayReviews.filter((_, i) => i % 3 === 0);
  const col2 = displayReviews.filter((_, i) => i % 3 === 1);
  const col3 = displayReviews.filter((_, i) => i % 3 === 2);

  const badgeText = meta?.badge || "Student Feedbacks";
  const titlePrefix = meta?.headline_prefix || "Hear from";
  const titleHighlight = meta?.headline_highlight || "Our Students";
  const descriptionText = meta?.description || "Graphic Design, Video Editing & Web Design Success Stories from Tamil Students";

  return (
    <section className="bg-[#F8FAFF] py-14 sm:py-20 md:py-28 border-t border-[#E8EFFE] relative z-20 lg:shadow-[0_-25px_50px_rgba(0,0,0,0.18)] lg:rounded-t-[48px] lg:-mt-8 overflow-x-clip">
      {/* Pixel Gradient Pattern Background */}
      <InteractiveGridBackground />
      <Container className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-4 sm:mb-5"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#BFDBFE] text-[#1748BB] text-xs font-sans font-bold tracking-wider uppercase shadow-xs">
            <Star size={12} className="fill-[#1748BB] text-[#1748BB]" />
            {badgeText}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className="font-display font-bold text-[#1E2026] leading-[1.18] sm:leading-[1.06] tracking-tight"
            style={{ fontSize: "clamp(26px, 4.2vw, 52px)" }}
          >
            {titlePrefix}{" "}
            <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
              {titleHighlight}
            </span>
          </h2>
          <p className="font-sans text-neutral-600 text-sm sm:text-base mt-2.5 max-w-xl mx-auto font-normal">
            {descriptionText}
          </p>
        </motion.div>

        {/* ── MOBILE STICKY STACKING DECK (Visible only on mobile) ── */}
        <div className="sm:hidden flex flex-col max-w-md mx-auto pb-12">
          {displayReviews.map((r, i) => (
            <ReviewCard key={`mob-${r.id}`} review={r} index={i} isMobileStack={true} />
          ))}
        </div>

        {/* ── DESKTOP 3-COLUMN MASONRY GRID (Hidden on mobile) ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            {col1.map((r, i) => (
              <ReviewCard key={r.id || `c1-${i}`} review={r} index={i * 3} />
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-5">
            {col2.map((r, i) => (
              <ReviewCard key={r.id || `c2-${i}`} review={r} index={i * 3 + 1} />
            ))}
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            {col3.map((r, i) => (
              <ReviewCard key={r.id || `c3-${i}`} review={r} index={i * 3 + 2} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
