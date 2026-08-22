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
import { CMSTestimonial } from "@/lib/cms";

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
    name: "KR Naveen",
    rating: 5,
    platform: "star",
    text: "This academy is very help full to learn... The valavan academy is very help full to learn graphics designing courses in famillour language (Tamil).",
  },
  {
    id: "r-5",
    name: "Bala Subramaniyam",
    rating: 5,
    platform: "star",
    text: "Sir you give me a good confidence and... Sir you give me a good confidence and my growth money and very simply understand the all your tutorial. Very useful me. Congratulation sir 🙏",
  },
  {
    id: "r-6",
    name: "Sundhar",
    rating: 5,
    platform: "google",
    text: "If you want to master Adobe Photoshop and Illustrator, Valavan Academy in Vellore district is the perfect choice. Their AI-powered Graphic Design classes are beginner-friendly and help you build a real portfolio. Truly a top-rated design training hub in Tamil Nadu...",
  },
  {
    id: "r-7",
    name: "Sachin Roubert",
    rating: 5,
    platform: "star",
    text: "This academy is very help full to learn... The valavan academy is very help full to learn graphics designing courses in famillour language (Tamil).",
  },
  {
    id: "r-8",
    name: "Arun Pandi",
    rating: 5,
    platform: "google",
    text: "Their AI-powered Graphic Design classes are beginner-friendly and help you build a real portfolio. As frd solfitha joined pannuna ('AI Powered Graphic Designer)' course la joined panne... I had a wonderful learning experience at Valavan Academy! Weekly Saturday live class natakikum appo namma dout is clear pannikalum And The mentors are very supportive and always available to clear doubts. Adobe Photoshop, Illustrator, Video Editing And All course step by step soli tharanga. Truly a top-rated design training hub in Tamil Nadu.",
  },
  {
    id: "r-9",
    name: "Rajesh D",
    rating: 5,
    platform: "google",
    text: "The Academy-course is useful for us. Concepts are clear and explained, practice sessions are for confidence. Beginners are the best place.",
  },
  {
    id: "r-10",
    name: "Karnan k",
    rating: 5,
    platform: "star",
    text: "Sir naa ippo join panni 1 week than agathu ippethan learn panna start pannirukan. Unga class ellamma nala irukku Sir. Naa beginner athunala konjam pickup Panna late agathu so athutu oru video va 2 times papan. Sir Naa pinyuthu Sir innum poga poga eppudi irukkunu interest ahh irukku Sir. Thank you...",
  },
  {
    id: "r-11",
    name: "Vijaykumar Palani",
    rating: 5,
    platform: "google",
    text: "Best academy in Vellore dist for Graphic Design and Video Editing coaching 👍 Classes romba engaging ah iruku, practical examples kuduthirukanga. Beginners ku easy ah understand pannuvanga, professionals ku advanced guidance kuduthirukanga. Highly recommend!",
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: isMobileStack ? 0 : (index % 5) * 0.05 }}
        className="bg-white rounded-[22px] border border-neutral-200/80 shadow-[0_8px_30px_rgba(23,72,187,0.08)] p-5 sm:p-6 flex flex-col gap-3 hover:shadow-[0_12px_36px_rgba(23,72,187,0.15)] hover:-translate-y-0.5 transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1748BB] to-[#60A5FA] flex items-center justify-center text-white font-bold text-sm font-sans flex-shrink-0 shadow-xs">
              {review.name.charAt(0)}
            </div>
            <div>
              <p className="font-sans font-bold text-[#1E2026] text-sm sm:text-base leading-tight">
                {review.name}
              </p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            {review.platform === "google" && <GoogleIcon />}
            {review.platform === "linkedin" && <LinkedInIcon />}
            {review.platform === "star" && <StarIcon />}
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
}

/* ─────────────────── SECTION ─────────────────── */
export default function StudentReviewsSection({ reviews: cmsReviews }: StudentReviewsSectionProps = {}) {
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

  return (
    <section className="bg-[#F8FAFF] py-10 sm:py-20 md:py-28 border-t border-[#E8EFFE] relative z-20 overflow-x-clip">
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
            Student Feedbacks
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
            Hear from Our Students
          </h2>
          <p className="font-sans text-neutral-600 text-sm sm:text-base mt-2.5 max-w-xl mx-auto font-normal">
            Graphic Design, Video Editing &amp; Web Design Success Stories from Tamil Students
          </p>
        </motion.div>

        {/* ── MOBILE STICKY STACKING DECK (Visible only on mobile) ── */}
        <div className="sm:hidden flex flex-col max-w-md mx-auto pb-12">
          {REVIEWS.map((r, i) => (
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
