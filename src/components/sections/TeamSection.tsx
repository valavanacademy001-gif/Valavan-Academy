"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { RotateCw, Sparkles, CheckCircle2 } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  designation?: string;
  specialty: string;
  image: string;
  bio: string;
  skills: string[];
  experience: string;
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Valavan",
    role: "FOUNDER & LEAD MENTOR",
    designation: "Founder of Valavan Ventures Private Limited",
    specialty: "Graphic Design & Creative Strategy",
    image: "/assets/about/valavan.webp",
    bio: "Founder of Valavan Academy & Designee. Trained 10,000+ students with project-driven Graphic Design mentorship and established the TNCC community across Tamil Nadu.",
    skills: ["Branding", "Creative Direction", "Typography", "Visual Identity"],
    experience: "15+ Years",
  },
  {
    name: "RP Kiran Kumar",
    role: "CREATIVE DIRECTOR | BRAND STRATEGIST",
    designation: "Creative Director | Brand Strategist",
    specialty: "Brand Strategy, UI/UX & Creative Direction",
    image: "/assets/about/Kiran.webp",
    bio: "Spent over a decade guiding Tamil creative professionals to evolve into authoritative Full Stack Creative Directors who command high value and build future-proof brand systems.",
    skills: ["Brand Strategy", "Creative Direction", "Design Systems", "UI/UX"],
    experience: "10+ Years",
  },
  {
    name: "Ganapathi R",
    role: "SENIOR VIDEO EDITOR | CEO",
    designation: "Senior Video Editor | CEO",
    specialty: "Short-Form Video Editing & Viral Content",
    image: "/assets/about/gana.webp",
    bio: "Senior Video Editor with 5+ years experience. Generated 10M+ views and trained 1,000+ creators and brands to produce viral, high-performing short-form video content.",
    skills: ["Premiere Pro", "After Effects", "Viral Pacing", "Short-Form Content"],
    experience: "5+ Years",
  },
  {
    name: "Sundhar",
    role: "STUDENTS SUPPORT MANAGER | SENIOR GRAPHIC DESIGNER",
    designation: "Students Support Manager | Senior Graphic Designer",
    specialty: "Graphic Design & Practical Mentorship",
    image: "/assets/about/Nandha.webp",
    bio: "Senior Graphic Designer with 5+ years of industry experience. Guided and mentored 10,000+ students through hands-on project-based design training and continuous doubt clearing.",
    skills: ["Graphic Design", "Student Mentoring", "Portfolio Reviews", "Client Projects"],
    experience: "5+ Years",
  },
  {
    name: "Suganesh",
    role: "FULLSTACK CREATIVE MASTER | PORTFOLIO HEAD",
    designation: "Fullstack Creative Master | Student Portfolio Division Head",
    specialty: "Fullstack Creation, Web, Video & AI Design",
    image: "/assets/about/soban.webp",
    bio: "Student Portfolio Division Head with 5+ years of creative experience. Delivered 10,000+ designs and trained 10,000+ students across design, web, editing, branding, and AI.",
    skills: ["Fullstack Design", "Web Design", "Video Editing", "AI Creative Tools"],
    experience: "5+ Years",
  },
  {
    name: "Dhanush",
    role: "PROFESSIONAL THUMBNAIL DESIGNER",
    designation: "Professional Thumbnail Designer",
    specialty: "High-CTR Thumbnail Design & Visual Retention",
    image: "/assets/about/Dhanush.webp",
    bio: "Specialized in high-converting thumbnail design with 600M+ views generated across top creators in Tamil Nadu. Master in creating thumb-stopping commercial visuals using Photoshop.",
    skills: ["Photoshop", "Thumbnail Design", "CTR Optimization", "Visual Storytelling"],
    experience: "5+ Years",
  },
];

export function extractTeamMembersFromMap(
  teamMap: Record<string, string> | undefined,
  fallback: TeamMember[]
): TeamMember[] {
  if (!teamMap || Object.keys(teamMap).length === 0) return fallback;

  const mentorIndices = new Set<number>();
  for (const key of Object.keys(teamMap)) {
    const match = key.match(/^mentor_(\d+)_(?:name|role|designation|image|bio)$/);
    if (match) {
      mentorIndices.add(parseInt(match[1], 10));
    }
  }

  const sortedIndices = Array.from(mentorIndices).sort((a, b) => a - b);
  const members: TeamMember[] = [];

  for (const idx of sortedIndices) {
    const name = teamMap[`mentor_${idx}_name`];
    if (name && name.trim()) {
      const fallbackItem = fallback[idx - 1];
      const role = teamMap[`mentor_${idx}_role`] || teamMap[`mentor_${idx}_designation`] || fallbackItem?.role || "Mentor";
      const designation = teamMap[`mentor_${idx}_designation`] || fallbackItem?.designation || role;
      const specialty = teamMap[`mentor_${idx}_specialty`] || teamMap[`mentor_${idx}_specialization`] || fallbackItem?.specialty || "";
      const bio = teamMap[`mentor_${idx}_bio`] || teamMap[`mentor_${idx}_about`] || fallbackItem?.bio || "";
      const experience = teamMap[`mentor_${idx}_experience`] || fallbackItem?.experience || "5+ Years";
      const image = teamMap[`mentor_${idx}_image`] || fallbackItem?.image || "/assets/about/valavan.webp";
      const skillsRaw = teamMap[`mentor_${idx}_skills`] || "";
      const skills = skillsRaw
        ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
        : fallbackItem?.skills || [];

      members.push({
        name: name.trim(),
        role: role.trim(),
        designation: designation.trim(),
        specialty: specialty.trim(),
        bio: bio.trim(),
        experience: experience.trim(),
        skills,
        image: image.trim(),
      });
    }
  }

  return members.length > 0 ? members : fallback;
}

interface TeamSectionProps {
  teamMap?: Record<string, string>;
  members?: TeamMember[];
}

export default function TeamSection({ teamMap, members = DEFAULT_TEAM_MEMBERS }: TeamSectionProps = {}) {
  const effectiveMembers = teamMap ? extractTeamMembersFromMap(teamMap, members) : members;
  const eyebrow = teamMap?.eyebrow || "Expert Instructors";
  const heading = teamMap?.heading || "The Core of Valavan Academy.";
  const description =
    teamMap?.description ||
    "Learn directly from experienced practitioners dedicated to your creative and commercial growth.";

  return (
    <section id="mentors" className="py-20 sm:py-28 bg-[#F8FAFF] border-t border-[#E8EFFE] relative scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-bold">
              {eyebrow}
            </span>
            <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
          </div>

          <h2
            className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            {heading.includes("Valavan Academy") ? (
              <>
                {heading.replace(/Valavan Academy\.?/i, "").trim()}{" "}
                <span className="text-[#1748BB]">Valavan Academy.</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="font-sans text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* 3D Flip Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {effectiveMembers.map((member, i) => (
            <MentorFlipCard key={`${member.name}-${i}`} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MentorFlipCard({ member }: { member: TeamMember }) {
  const [isFlippedMobile, setIsFlippedMobile] = useState(false);
  const isImageUnoptimized = member.image.startsWith("data:") || member.image.startsWith("http");

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
              unoptimized={isImageUnoptimized}
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
                  unoptimized={isImageUnoptimized}
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-display font-bold text-lg text-white leading-tight truncate">
                  {member.name}
                </h4>
                <p style={{ color: "#BACFFF" }} className="font-sans text-xs font-medium truncate mt-0.5">
                  {member.designation || member.role}
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
                className="font-sans text-xs sm:text-sm leading-relaxed font-normal line-clamp-5 sm:line-clamp-6"
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
