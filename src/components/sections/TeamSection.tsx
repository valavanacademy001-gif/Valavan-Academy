"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { RotateCw, Sparkles, CheckCircle2 } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  skills: string[];
  experience: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Valavan",
    role: "Founder & Lead Mentor",
    specialty: "Graphic Design & Creative Strategy",
    image: "/assets/about/valavan.webp",
    bio: "Founder of Valavan Academy and Pixel Panther. Over 8+ years of industry expertise empowering 5,000+ students to turn creative design into high-income careers.",
    skills: ["Branding", "Creative Direction", "Typography", "Visual Identity"],
    experience: "8+ Years",
  },
  {
    name: "Nandha Kumar",
    role: "Video Editing Mentor",
    specialty: "Premiere Pro, DaVinci & Motion Graphics",
    image: "/assets/about/Nandha.webp",
    bio: "Professional video editor and colorist specializing in cinematic YouTube storytelling, viral reels pacing, and advanced color grading workflows.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design"],
    experience: "5+ Years",
  },
  {
    name: "Dhanush",
    role: "Design & AI Tools Mentor",
    specialty: "Photoshop, Illustrator & Midjourney",
    image: "/assets/about/Dhanush.webp",
    bio: "Commercial poster designer and GenAI specialist guiding creators to blend classic graphic craftsmanship with modern AI-assisted productivity.",
    skills: ["Photoshop", "Illustrator", "Midjourney", "Prompt Design"],
    experience: "4+ Years",
  },
  {
    name: "Kiran",
    role: "UI/UX & Web Mentor",
    specialty: "Figma, WordPress & Responsive Web",
    image: "/assets/about/Kiran.webp",
    bio: "Product & web designer crafting conversion-focused landing pages, intuitive UI prototypes, and clean WordPress client deployments.",
    skills: ["Figma", "UI/UX Design", "WordPress", "Web Strategy"],
    experience: "5+ Years",
  },
  {
    name: "Soban",
    role: "Community Lead",
    specialty: "Student Success & TNCC Operations",
    image: "/assets/about/soban.webp",
    bio: "Directs TNCC community growth, organizes portfolio review meetups, and coordinates daily 1-on-1 student doubt clearing sessions.",
    skills: ["Community Growth", "Student Success", "Event Ops", "Networking"],
    experience: "4+ Years",
  },
  {
    name: "Gana",
    role: "Creative Support",
    specialty: "Technical Operations & Production",
    image: "/assets/about/gana.webp",
    bio: "Manages live training cohort systems, curriculum assets, and technical infrastructure ensuring every workshop runs seamlessly.",
    skills: ["Studio Production", "Live Streaming", "Technical Ops", "Media Management"],
    experience: "3+ Years",
  },
];

export default function TeamSection() {
  return (
    <section id="mentors" className="py-20 sm:py-28 bg-[#F8FAFF] border-t border-[#E8EFFE] relative scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-bold">
              Expert Instructors
            </span>
            <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
          </div>

          <h2
            className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            The Core of <span className="text-[#1748BB]">Valavan Academy.</span>
          </h2>
          <p className="font-sans text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            Learn directly from experienced practitioners dedicated to your creative and commercial growth.
          </p>
        </div>

        {/* 3D Flip Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <MentorFlipCard key={i} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MentorFlipCard({ member }: { member: TeamMember }) {
  const [isFlippedMobile, setIsFlippedMobile] = useState(false);

  return (
    <div
      onClick={() => setIsFlippedMobile((prev) => !prev)}
      className="group relative h-[450px] [perspective:1200px] cursor-pointer select-none"
    >
      {/* 3D Rotating Inner Box */}
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
          isFlippedMobile ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ── FRONT FACE ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden [backface-visibility:hidden] border border-neutral-200/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_50px_rgba(23,72,187,0.15)] flex flex-col justify-between transition-all duration-300">
          
          {/* Main Portrait */}
          <div className="relative w-full flex-1 bg-[#233876] overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            
            {/* Front Tag & Name */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#1748BB] text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-md">
                {member.role}
              </span>
              <h3 className="font-display font-bold text-xl text-white leading-tight">
                {member.name}
              </h3>
            </div>


          </div>

          {/* Bottom Specialization Banner */}
          <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
            <div className="min-w-0">
              <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#1748BB]">
                Specialization
              </p>
              <p className="font-sans text-xs text-neutral-700 font-semibold truncate mt-0.5">
                {member.specialty}
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#EBF2FE] text-[#1748BB] flex items-center justify-center shrink-0 ml-2">
              <RotateCw size={13} />
            </div>
          </div>
        </div>

        {/* ── BACK FACE (REVEAL DETAILS) ────────────────────────────── */}
        <div className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1143B2] text-white border border-[#1143B2] p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_45px_rgba(17,67,178,0.35)]">
          
          {/* Top Row: Mini Avatar + Name & Experience */}
          <div>
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/20">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/20 border border-white/30 shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-display font-bold text-lg text-white leading-tight truncate">
                  {member.name}
                </h4>
                <p style={{ color: "#BACFFF" }} className="font-sans text-xs font-medium truncate mt-0.5">
                  {member.role}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#1143B2] shadow-sm">
                  {member.experience}
                </span>
              </div>
            </div>

            {/* About / Bio Description */}
            <div className="mt-4">
              <p style={{ color: "#BACFFF" }} className="font-sans text-xs uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#BACFFF]" />
                About Mentor
              </p>
              <p
                style={{ color: "#BACFFF" }}
                className="font-sans text-xs sm:text-sm leading-relaxed font-normal"
              >
                {member.bio}
              </p>
            </div>
          </div>

          {/* Bottom Skills & Highlights */}
          <div className="pt-3 border-t border-white/20">
            <p style={{ color: "#BACFFF" }} className="font-sans text-[11px] font-bold uppercase tracking-wider mb-2 opacity-90">
              Key Skills &amp; Tools
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{ color: "#BACFFF" }}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/15 hover:bg-white hover:!text-[#1143B2] px-2.5 py-1 rounded-lg border border-white/25 transition-colors"
                >
                  <CheckCircle2 size={10} className="text-[#BACFFF]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
