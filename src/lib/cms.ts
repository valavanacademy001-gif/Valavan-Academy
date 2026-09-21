/**
 * Valavan Academy — Central CMS Data Layer
 * Connects directly to Supabase to fetch published content for the Main Website.
 * Implements strict fallback defaults to guarantee 100% visual fidelity
 * even if database data is empty or temporarily unreachable.
 */

import { supabase } from "@/lib/supabase";
import { EXTERNAL_URLS, SOCIAL_LINKS, PROGRAMS as DEFAULT_PROGRAMS, SITE_CONFIG } from "@/data/site.config";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface CMSProgram {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  duration?: string | null;
  level?: string | null;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  cta_text?: string | null;
  cta_url?: string | null;
  price?: number | null;
  original_price?: number | null;
  currency?: string | null;
  is_featured?: boolean;
  is_visible?: boolean;
  sort_order?: number;
  status?: string;
  skills?: string[] | null;
  software_tools?: string[] | null;
  modules?: Array<{ title: string; duration?: string; lessons?: number }> | null;
}

export interface CMSTestimonial {
  id?: string;
  student_name: string;
  student_role?: string | null;
  student_photo_url?: string | null;
  testimonial: string;
  video_url?: string | null;
  youtube_url?: string | null;
  rating?: number | null;
  is_featured?: boolean;
  is_visible?: boolean;
  sort_order?: number;
}

export interface CMSLearnerStory {
  id?: string;
  title?: string | null;
  student_name?: string | null;
  video_url?: string | null;
  youtube_url?: string | null;
  youtube_video_id?: string | null;
  thumbnail_url?: string | null;
  duration?: string | null;
  is_visible?: boolean;
  sort_order?: number;
}

export interface CMSCertification {
  id?: string;
  title: string;
  description?: string | null;
  image_url: string;
  is_visible?: boolean;
  sort_order?: number;
}

export interface CMSSiteSettings {
  academy_name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address?: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  linkedin_url: string;
  community_url: string;
  login_url: string;
  signup_url: string;
}

export interface CMSHeroData {
  eyebrow?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  videoUrl?: string;
  posterImage?: string;
}

export interface CMSSectionMeta {
  badge?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  [key: string]: string | undefined;
}

// ─── DEFAULT FALLBACKS ───────────────────────────────────────────────────────

export const DEFAULT_SITE_SETTINGS: CMSSiteSettings = {
  academy_name: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  email: "valavanacademy001@gmail.com",
  phone: "+91 93452 79541",
  address: "Valavan Academy, Tirupattur / Vellore District, Tamil Nadu, India",
  facebook_url: SOCIAL_LINKS.find((s) => s.id === "facebook")?.url || "https://www.facebook.com/ValavanAcademy",
  instagram_url: SOCIAL_LINKS.find((s) => s.id === "instagram")?.url || "https://www.instagram.com/valavanacademy",
  youtube_url: SOCIAL_LINKS.find((s) => s.id === "youtube")?.url || "https://www.youtube.com/@ValavanAcademyofficial",
  linkedin_url: SOCIAL_LINKS.find((s) => s.id === "linkedin")?.url || "https://www.linkedin.com/in/valavan-p-813383337/",
  community_url: EXTERNAL_URLS.community,
  login_url: EXTERNAL_URLS.login,
  signup_url: EXTERNAL_URLS.signup,
};

export const DEFAULT_HERO_DATA: CMSHeroData = {
  eyebrow: "TAMIL NADU'S PREMIER DIGITAL SKILLS HUB",
  heading: "Your Career",
  highlightText: "Changing Partner",
  description: "Learn Graphic Design, Video Editing , Web Design & Advanced AI in Tamil with hands-on mentorship and real-world projects.",
  primaryButtonText: "Explore Courses",
  primaryButtonUrl: "/programs",
  secondaryButtonText: "Join TNCC Community →",
  secondaryButtonUrl: EXTERNAL_URLS.community,
  videoUrl: "/assets/videos/hero-bg.mp4",
  posterImage: "/assets/images/hero/hero-poster.webp",
};

export const DEFAULT_MARQUEE_ITEMS: string[] = [
  "Graphic Design",
  "Video Editing",
  "Web Design",
  "UI/UX",
  "AI Tools",
  "Creative Skills",
  "Career Growth",
  "Tamil-First Learning",
  "Real Projects",
  "Build Your Portfolio",
];

export const DEFAULT_LEARNER_STORIES: CMSLearnerStory[] = [
  { title: "Student Transformation 01", student_name: "Valavan Academy Student", youtube_url: "https://www.youtube.com/shorts/BzQ9wNPit5I", youtube_video_id: "BzQ9wNPit5I", thumbnail_url: "https://img.youtube.com/vi/BzQ9wNPit5I/hqdefault.jpg", duration: "0:45", sort_order: 1 },
  { title: "Student Transformation 02", student_name: "Valavan Academy Student", youtube_url: "https://www.youtube.com/shorts/3oVzfOTkjWE", youtube_video_id: "3oVzfOTkjWE", thumbnail_url: "https://img.youtube.com/vi/3oVzfOTkjWE/hqdefault.jpg", duration: "0:50", sort_order: 2 },
  { title: "Student Transformation 03", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/N5a_d-R_eJw", youtube_video_id: "N5a_d-R_eJw", thumbnail_url: "https://img.youtube.com/vi/N5a_d-R_eJw/hqdefault.jpg", duration: "0:40", sort_order: 3 },
  { title: "Student Transformation 04", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/wZ5HiQO8g74", youtube_video_id: "wZ5HiQO8g74", thumbnail_url: "https://img.youtube.com/vi/wZ5HiQO8g74/hqdefault.jpg", duration: "0:55", sort_order: 4 },
  { title: "Student Transformation 05", student_name: "Valavan Academy Student", youtube_url: "https://www.youtube.com/shorts/h3uv9HAC3Ek", youtube_video_id: "h3uv9HAC3Ek", thumbnail_url: "https://img.youtube.com/vi/h3uv9HAC3Ek/hqdefault.jpg", duration: "0:48", sort_order: 5 },
  { title: "Student Transformation 06", student_name: "Valavan Academy Student", youtube_url: "https://www.youtube.com/shorts/tPPE5Jywfsg", youtube_video_id: "tPPE5Jywfsg", thumbnail_url: "https://img.youtube.com/vi/tPPE5Jywfsg/hqdefault.jpg", duration: "0:42", sort_order: 6 },
  { title: "Student Transformation 07", student_name: "Valavan Academy Student", youtube_url: "https://www.youtube.com/shorts/RRn6b8cIgxc", youtube_video_id: "RRn6b8cIgxc", thumbnail_url: "https://img.youtube.com/vi/RRn6b8cIgxc/hqdefault.jpg", duration: "0:52", sort_order: 7 },
  { title: "Student Transformation 08", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/GNLYaMdWF64", youtube_video_id: "GNLYaMdWF64", thumbnail_url: "https://img.youtube.com/vi/GNLYaMdWF64/hqdefault.jpg", duration: "0:46", sort_order: 8 },
  { title: "Student Transformation 09", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/R4nXDTTTq4g", youtube_video_id: "R4nXDTTTq4g", thumbnail_url: "https://img.youtube.com/vi/R4nXDTTTq4g/hqdefault.jpg", duration: "0:54", sort_order: 9 },
  { title: "Student Transformation 10", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/nCQ18VfjKUQ", youtube_video_id: "nCQ18VfjKUQ", thumbnail_url: "https://img.youtube.com/vi/nCQ18VfjKUQ/hqdefault.jpg", duration: "0:49", sort_order: 10 },
  { title: "Student Transformation 11", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/ezqLPTS8vHk", youtube_video_id: "ezqLPTS8vHk", thumbnail_url: "https://img.youtube.com/vi/ezqLPTS8vHk/hqdefault.jpg", duration: "0:51", sort_order: 11 },
  { title: "Student Transformation 12", student_name: "Valavan Academy Student", youtube_url: "https://youtube.com/shorts/YOhkWGcyTLw", youtube_video_id: "YOhkWGcyTLw", thumbnail_url: "https://img.youtube.com/vi/YOhkWGcyTLw/hqdefault.jpg", duration: "0:47", sort_order: 12 },
];

export const DEFAULT_TESTIMONIALS: CMSTestimonial[] = [
  {
    student_name: "Gowri sh",
    student_role: "Photoshop & Illustrator Student",
    rating: 5,
    testimonial: "I attended Photoshop & Illustrator & Coreldraw class from sir. Teaching method romba clear-aa irundhuchu, basics-la irundhu advanced-vara step by step explain panninneenga. Practice works, tips & shortcuts ellam real-time design work-ku romba helpful-aa irukku. Beginner-aa irundhalum easy-aa understand panna mudiyum. Strongly recommend panneen. Thank you sir for your guidance...",
    sort_order: 1,
  },
  {
    student_name: "Soban",
    student_role: "Web & UI/UX Designer",
    rating: 5,
    testimonial: "Before joining Valavan Academy, web design felt like a maze of codes and confusion. But their expert training unlocked everything — from layout basics to advanced UI/UX design. Today, I confidently build clean, responsive, and modern websites that not only look good but work perfectly on all devices. If you want to turn your web design dreams into real projects, this is the place to start! 🔥",
    sort_order: 2,
  },
  {
    student_name: "Saranya Swetha",
    student_role: "Digital Creator",
    rating: 5,
    testimonial: "I joined with zero experience, but thanks to the clear guidance and hands-on sessions, I now feel confident in using design tools like photoshop and premiere Pro. This academy truly helped me unlock my creative side.",
    sort_order: 3,
  },
  {
    student_name: "KR Naveen",
    student_role: "Graphic Designer",
    rating: 5,
    testimonial: "This academy is very help full to learn... The valavan academy is very help full to learn graphics designing courses in famillour language (Tamil).",
    sort_order: 4,
  },
  {
    student_name: "Bala Subramaniyam",
    student_role: "Freelance Creator",
    rating: 5,
    testimonial: "Sir you give me a good confidence and... Sir you give me a good confidence and my growth money and very simply understand the all your tutorial. Very useful me. Congratulation sir 🙏",
    sort_order: 5,
  },
  {
    student_name: "Sundhar",
    student_role: "Graphic Design Student",
    rating: 5,
    testimonial: "If you want to master Adobe Photoshop and Illustrator, Valavan Academy in Vellore district is the perfect choice. Their AI-powered Graphic Design classes are beginner-friendly and help you build a real portfolio. Truly a top-rated design training hub in Tamil Nadu...",
    sort_order: 6,
  },
  {
    student_name: "Sachin Roubert",
    student_role: "Design Student",
    rating: 5,
    testimonial: "This academy is very help full to learn... The valavan academy is very help full to learn graphics designing courses in famillour language (Tamil).",
    sort_order: 7,
  },
  {
    student_name: "Arun Pandi",
    student_role: "AI Graphic Designer",
    rating: 5,
    testimonial: "Their AI-powered Graphic Design classes are beginner-friendly and help you build a real portfolio. As frd solfitha joined pannuna (AI Powered Graphic Designer) course la joined panne... I had a wonderful learning experience at Valavan Academy! Weekly Saturday live class natakikum appo namma dout is clear pannikalum And The mentors are very supportive and always available to clear doubts. Adobe Photoshop, Illustrator, Video Editing And All course step by step soli tharanga. Truly a top-rated design training hub in Tamil Nadu.",
    sort_order: 8,
  },
  {
    student_name: "Rajesh D",
    student_role: "Creative Student",
    rating: 5,
    testimonial: "The Academy-course is useful for us. Concepts are clear and explained, practice sessions are for confidence. Beginners are the best place.",
    sort_order: 9,
  },
  {
    student_name: "Karnan k",
    student_role: "Beginner Designer",
    rating: 5,
    testimonial: "Sir naa ippo join panni 1 week than agathu ippethan learn panna start pannirukan. Unga class ellamma nala irukku Sir. Naa beginner athunala konjam pickup Panna late agathu so athutu oru video va 2 times papan. Sir Naa pinyuthu Sir innum poga poga eppudi irukkunu interest ahh irukku Sir. Thank you...",
    sort_order: 10,
  },
  {
    student_name: "Vijaykumar Palani",
    student_role: "Motion & Graphic Designer",
    rating: 5,
    testimonial: "Best academy in Vellore dist for Graphic Design and Video Editing coaching 👍 Classes romba engaging ah iruku, practical examples kuduthirukanga. Beginners ku easy ah understand pannuvanga, professionals ku advanced guidance kuduthirukanga. Highly recommend!",
    sort_order: 11,
  },
  {
    student_name: "Yuvan U",
    student_role: "Startup Creator",
    rating: 5,
    testimonial: "It was a valuable experience where I learned directly from successful Investors and entrepreneurs. The sessions gave me clear insights into how startups grow, how to approach investors, and how to build strong business ideas.",
    sort_order: 12,
  },
  {
    student_name: "Nagasubramanian S",
    student_role: "Student & Creator",
    rating: 5,
    testimonial: "I Am Happy To Thank First Of All Valavan Academy And Entire Team Members For Supporting Me In All Aspects Regarding This Learning And Technical Support. I Want To Thank Sri Sundhar Sir And Sri Nandhalakumar Sir Also In Assisting Me For The Clarifications And All Excellent Coaching Centre This One. Hats Off To All Members Including Sri Valavan Sir.",
    sort_order: 13,
  },
  {
    student_name: "Suganesh K",
    student_role: "Creative Tech Student",
    rating: 5,
    testimonial: "The expert-led sessions at Valavan Academy are packed with practical knowledge — perfect for learners who want real results in tech and creativity.",
    sort_order: 14,
  },
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

/**
 * Generic helper to fetch all key-value field pairs for a page & section
 */
export async function getSectionFieldMap(pageSlug: string, sectionSlug: string): Promise<Record<string, string>> {
  try {
    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", pageSlug)
      .maybeSingle();

    if (!page) return {};

    const { data: section } = await supabase
      .from("sections")
      .select("id")
      .eq("page_id", page.id)
      .eq("slug", sectionSlug)
      .maybeSingle();

    if (!section) return {};

    const { data: fieldVals } = await supabase
      .from("field_values")
      .select("*, field:fields(name)")
      .eq("section_id", section.id);

    if (!fieldVals || fieldVals.length === 0) return {};

    const map: Record<string, string> = {};
    for (const fv of fieldVals) {
      if (fv.field?.name) {
        const val = fv.published_value_text || fv.value_text || fv.value_url || (fv.value_json ? JSON.stringify(fv.value_json) : "") || "";
        map[fv.field.name] = val;
      }
    }

    return map;
  } catch {
    return {};
  }
}

/**
 * Get map of section visibility by section slug for any given page
 */
export async function getSectionVisibilityMap(pageSlug: string = "home"): Promise<Record<string, boolean>> {
  try {
    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", pageSlug)
      .maybeSingle();

    if (!page) return {};

    const { data: sections } = await supabase
      .from("sections")
      .select("slug, is_visible")
      .eq("page_id", page.id);

    if (!sections) return {};

    const visibilityMap: Record<string, boolean> = {};
    sections.forEach((s) => {
      visibilityMap[s.slug] = s.is_visible !== false;
    });

    return visibilityMap;
  } catch {
    return {};
  }
}

// ─── SPECIFIC SECTION DATA FETCHERS ──────────────────────────────────────────

/**
 * Fetch Hero Data with full alias support
 */
export async function getHeroData(): Promise<CMSHeroData> {
  try {
    const map = await getSectionFieldMap("home", "hero");
    if (!map || Object.keys(map).length === 0) return DEFAULT_HERO_DATA;

    return {
      eyebrow: map.eyebrow || DEFAULT_HERO_DATA.eyebrow,
      heading: map.headline_prefix || map.heading || map.hero_heading_1 || DEFAULT_HERO_DATA.heading,
      highlightText: map.headline_highlight || map.subheading || map.hero_heading_2 || DEFAULT_HERO_DATA.highlightText,
      description: map.description || map.hero_description || DEFAULT_HERO_DATA.description,
      primaryButtonText: map.primary_button_text || map.hero_cta_primary_text || DEFAULT_HERO_DATA.primaryButtonText,
      primaryButtonUrl: map.primary_button_url || map.hero_cta_primary_url || DEFAULT_HERO_DATA.primaryButtonUrl,
      secondaryButtonText: map.secondary_button_text || map.hero_cta_secondary_text || DEFAULT_HERO_DATA.secondaryButtonText,
      secondaryButtonUrl: map.secondary_button_url || map.hero_cta_secondary_url || DEFAULT_HERO_DATA.secondaryButtonUrl,
      videoUrl: map.background_video_url || map.hero_video_bg || map.video_url || DEFAULT_HERO_DATA.videoUrl,
      posterImage: DEFAULT_HERO_DATA.posterImage,
    };
  } catch {
    return DEFAULT_HERO_DATA;
  }
}

/**
 * Fetch Marquee Ribbon Data
 */
export async function getMarqueeRibbonData(): Promise<string[]> {
  try {
    const map = await getSectionFieldMap("home", "marquee_ribbon");
    if (map.ribbon_items) {
      const items = map.ribbon_items.split(",").map((s) => s.trim()).filter(Boolean);
      if (items.length > 0) return items;
    }
    return DEFAULT_MARQUEE_ITEMS;
  } catch {
    return DEFAULT_MARQUEE_ITEMS;
  }
}

/**
 * Fetch Learn Create Grow Section Data
 */
export async function getLearnCreateGrowData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "learn_create_grow");
    return {
      badge: map.badge || "LEARN • PRACTICE • CREATE • GROW",
      headline_prefix: map.headline_prefix || "Master Creative",
      headline_highlight: map.headline_highlight || "Digital Skills In Tamil",
      heading: map.heading || "Master Creative Digital Skills In Tamil",
      description: map.description || "Step-by-step career programs engineered to transform beginners into confident creative professionals.",
      step_1_keyword: map.step_1_keyword || "LEARN",
      step_1_title: map.step_1_title || "Acquire Skills That Matter",
      step_1_body: map.step_1_body || "Start from zero. Our Tamil-language curriculum breaks down Graphic Design, Video Editing, Web Design, UI/UX, and AI tools into clear, practical lessons — no jargon, no fluff.",
      step_2_keyword: map.step_2_keyword || "PRACTICE",
      step_2_title: map.step_2_title || "Build With Real Briefs",
      step_2_body: map.step_2_body || "Learning only clicks when you create. Every module comes with real-world project briefs, commercial design challenges, and hands-on exercises guided by experienced mentors.",
      step_3_keyword: map.step_3_keyword || "CREATE",
      step_3_title: map.step_3_title || "Build Your Portfolio",
      step_3_body: map.step_3_body || "Walk away with a professional portfolio of projects. Show potential clients and employers actual work — not theory. Your skills become visible, tangible, and high-converting.",
      step_4_keyword: map.step_4_keyword || "GROW",
      step_4_title: map.step_4_title || "Launch Your Career or Business",
      step_4_body: map.step_4_body || "Freelance, get hired, or build your own brand. With in-demand digital skills, a portfolio, and community support, you have everything you need to grow on your own terms.",
      ...map,
    };
  } catch {
    return {
      badge: "LEARN • PRACTICE • CREATE • GROW",
      headline_prefix: "Master Creative",
      headline_highlight: "Digital Skills In Tamil",
      heading: "Master Creative Digital Skills In Tamil",
      description: "Step-by-step career programs engineered to transform beginners into confident creative professionals.",
      step_1_keyword: "LEARN",
      step_1_title: "Acquire Skills That Matter",
      step_1_body: "Start from zero. Our Tamil-language curriculum breaks down Graphic Design, Video Editing, Web Design, UI/UX, and AI tools into clear, practical lessons — no jargon, no fluff.",
      step_2_keyword: "PRACTICE",
      step_2_title: "Build With Real Briefs",
      step_2_body: "Learning only clicks when you create. Every module comes with real-world project briefs, commercial design challenges, and hands-on exercises guided by experienced mentors.",
      step_3_keyword: "CREATE",
      step_3_title: "Build Your Portfolio",
      step_3_body: "Walk away with a professional portfolio of projects. Show potential clients and employers actual work — not theory. Your skills become visible, tangible, and high-converting.",
      step_4_keyword: "GROW",
      step_4_title: "Launch Your Career or Business",
      step_4_body: "Freelance, get hired, or build your own brand. With in-demand digital skills, a portfolio, and community support, you have everything you need to grow on your own terms.",
    };
  }
}

/**
 * Fetch Programs Section Header Meta Data
 */
export async function getProgramsSectionData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "programs");
    return {
      badge: map.badge || "OUR PROGRAMS",
      headline_prefix: map.headline_prefix || "Choose Your",
      headline_highlight: map.headline_highlight || "Learning Path.",
      heading: map.heading || "Choose Your Learning Path.",
      description: map.description || "Two programs. One goal — to give you the creative digital skills that open doors to careers, freelancing, and your own brand.",
      program_1_badge: map.program_1_badge || "90 Days Program",
      program_1_accent: map.program_1_accent || "Most Popular",
      program_2_badge: map.program_2_badge || "180 Days Program",
      program_2_accent: map.program_2_accent || "Flagship Track",
      ...map,
    };
  } catch {
    return {
      badge: "OUR PROGRAMS",
      headline_prefix: "Choose Your",
      headline_highlight: "Learning Path.",
      heading: "Choose Your Learning Path.",
      description: "Two programs. One goal — to give you the creative digital skills that open doors to careers, freelancing, and your own brand.",
      program_1_badge: "90 Days Program",
      program_1_accent: "Most Popular",
      program_2_badge: "180 Days Program",
      program_2_accent: "Flagship Track",
    };
  }
}

/**
 * Fetch Career Journey Section Data
 */
export async function getCareerJourneyData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "career_journey");
    return {
      badge: map.badge || "CAREER BLUEPRINT",
      headline_prefix: map.headline_prefix || "Your Path to a",
      headline_highlight: map.headline_highlight || "Creative Career.",
      heading: map.heading || "Your Path to a Creative Career.",
      description: map.description || "A structured 5-step milestone journey from zero experience to a thriving creative career.",
      step_1_number: map.step_1_number || "01",
      step_1_title: map.step_1_title || "START",
      step_1_desc: map.step_1_desc || "Zero experience, big ambition",
      step_2_number: map.step_2_number || "02",
      step_2_title: map.step_2_title || "LEARN",
      step_2_desc: map.step_2_desc || "Build skills in Tamil",
      step_3_number: map.step_3_number || "03",
      step_3_title: map.step_3_title || "PRACTICE",
      step_3_desc: map.step_3_desc || "Real briefs, live reviews",
      step_4_number: map.step_4_number || "04",
      step_4_title: map.step_4_title || "PORTFOLIO",
      step_4_desc: map.step_4_desc || "Showcase your best work",
      step_5_number: map.step_5_number || "05",
      step_5_title: map.step_5_title || "CAREER",
      step_5_desc: map.step_5_desc || "Freelance, hired, or studio",
      ...map,
    };
  } catch {
    return {
      badge: "CAREER BLUEPRINT",
      headline_prefix: "Your Path to a",
      headline_highlight: "Creative Career.",
      heading: "Your Path to a Creative Career.",
      description: "A structured 5-step milestone journey from zero experience to a thriving creative career.",
      step_1_number: "01",
      step_1_title: "START",
      step_1_desc: "Zero experience, big ambition",
      step_2_number: "02",
      step_2_title: "LEARN",
      step_2_desc: "Build skills in Tamil",
      step_3_number: "03",
      step_3_title: "PRACTICE",
      step_3_desc: "Real briefs, live reviews",
      step_4_number: "04",
      step_4_title: "PORTFOLIO",
      step_4_desc: "Showcase your best work",
      step_5_number: "05",
      step_5_title: "CAREER",
      step_5_desc: "Freelance, hired, or studio",
    };
  }
}

/**
 * Fetch Skill Stack Section Data
 */
export async function getSkillStackData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "skill_stack");
    return {
      badge: map.badge || "Power of Stacking",
      headline_prefix: map.headline_prefix || "One Skill Is Good.",
      headline_highlight: map.headline_highlight || "A Skill Stack Is Powerful.",
      heading: map.heading || "One Skill Is Good. A Skill Stack Is Powerful.",
      description: map.description || "Scroll down to watch how combining Design, Video, Web, and AI gradually stacks together into one complete, high-demand Creator.",
      ...map,
    };
  } catch {
    return {
      badge: "Power of Stacking",
      headline_prefix: "One Skill Is Good.",
      headline_highlight: "A Skill Stack Is Powerful.",
      heading: "One Skill Is Good. A Skill Stack Is Powerful.",
      description: "Scroll down to watch how combining Design, Video, Web, and AI gradually stacks together into one complete, high-demand Creator.",
    };
  }
}

/**
 * Fetch Community Section Data
 */
export async function getCommunitySectionData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "community");
    return {
      badge: map.badge || "TAMIL NADU CREATORS CLUB",
      headline_prefix: map.headline_prefix || "You Don't Have to",
      headline_highlight: map.headline_highlight || "Learn Alone.",
      heading: map.heading || "You Don't Have to Learn Alone.",
      description: map.description || "Join the Tamil Nadu Creators Club — a thriving community of designers, creators, and digital professionals learning, sharing, and growing together.",
      primaryButtonText: map.cta_button_text || "Join the Community →",
      primaryButtonUrl: map.cta_button_url || "https://tamilnaducreatorsclub.com/",
      stat_members: map.stat_members || "40K+ Community Members",
      stat_workshops: map.stat_workshops || "100+ Workshops Held",
      stat_students: map.stat_students || "5K+ Students Trained",
      ...map,
    };
  } catch {
    return {
      badge: "TAMIL NADU CREATORS CLUB",
      headline_prefix: "You Don't Have to",
      headline_highlight: "Learn Alone.",
      heading: "You Don't Have to Learn Alone.",
      description: "Join the Tamil Nadu Creators Club — a thriving community of designers, creators, and digital professionals learning, sharing, and growing together.",
      primaryButtonText: "Join the Community →",
      primaryButtonUrl: "https://tamilnaducreatorsclub.com/",
      stat_members: "40K+ Community Members",
      stat_workshops: "100+ Workshops Held",
      stat_students: "5K+ Students Trained",
    };
  }
}

/**
 * Fetch Learner Stories Section Header Meta Data
 */
export async function getLearnerStoriesData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "learner_stories");
    return {
      badge: map.badge || "LEARNER STORIES",
      headline_prefix: map.headline_prefix || "Real People,",
      headline_highlight: map.headline_highlight || "Real Transformations.",
      heading: map.heading || "Real People, Real Transformations.",
      description: map.description || "Career changers who redefined their future with Valavan Academy — in their own words.",
      ...map,
    };
  } catch {
    return {
      badge: "LEARNER STORIES",
      headline_prefix: "Real People,",
      headline_highlight: "Real Transformations.",
      heading: "Real People, Real Transformations.",
      description: "Career changers who redefined their future with Valavan Academy — in their own words.",
    };
  }
}

/**
 * Fetch Testimonials / Student Reviews Section Header Meta Data
 */
export async function getTestimonialsSectionData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "testimonials");
    return {
      badge: map.badge || "STUDENT FEEDBACKS",
      headline_prefix: map.headline_prefix || "Hear from",
      headline_highlight: map.headline_highlight || "Our Students",
      heading: map.heading || "Hear from Our Students",
      description: map.description || "Graphic Design, Video Editing & Web Design Success Stories from Tamil Students",
      ...map,
    };
  } catch {
    return {
      badge: "STUDENT FEEDBACKS",
      headline_prefix: "Hear from",
      headline_highlight: "Our Students",
      heading: "Hear from Our Students",
      description: "Graphic Design, Video Editing & Web Design Success Stories from Tamil Students",
    };
  }
}

/**
 * Fetch Final CTA Section Data
 */
export async function getFinalCTAData(): Promise<CMSSectionMeta> {
  try {
    const map = await getSectionFieldMap("home", "cta");
    return {
      badge: map.badge || "Get Started",
      headline_prefix: map.headline_prefix || "Your next chapter",
      headline_highlight: map.headline_highlight || "Starts here.",
      heading: map.heading || "Your Next Chapter Starts Here.",
      description: map.description || "Learn practical digital skills. Build real projects. Create your future — in Tamil.",
      primaryButtonText: map.primary_button_text || "Explore Courses",
      primaryButtonUrl: map.primary_button_url || "/programs",
      secondaryButtonText: map.secondary_button_text || "Join TNCC Community →",
      secondaryButtonUrl: map.secondary_button_url || "https://tamilnaducreatorsclub.com/",
      ...map,
    };
  } catch {
    return {
      badge: "Get Started",
      headline_prefix: "Your next chapter",
      headline_highlight: "Starts here.",
      heading: "Your Next Chapter Starts Here.",
      description: "Learn practical digital skills. Build real projects. Create your future — in Tamil.",
      primaryButtonText: "Explore Courses",
      primaryButtonUrl: "/programs",
      secondaryButtonText: "Join TNCC Community →",
      secondaryButtonUrl: "https://tamilnaducreatorsclub.com/",
    };
  }
}

/**
 * Fetch Certifications Section Data (headings + image items)
 */
export async function getCertificationsSectionData(): Promise<{ meta: CMSSectionMeta; certifications: CMSCertification[] }> {
  try {
    const map = await getSectionFieldMap("home", "certifications");
    const certs = await getPublishedCertifications();

    return {
      meta: {
        badge: map.badge || "STUDENT ACHIEVEMENTS",
        heading: map.heading || "More than a Certificate.",
        headline_prefix: map.headline_prefix || "More than a",
        headline_highlight: map.headline_highlight || "Certificate.",
        subheading: map.subheading || "Skill Verification for High-Income Careers",
        description: map.description || "Valavan Academy certifications validate real-world portfolio deliverables, tool mastery, and hands-on client projects.",
      },
      certifications: certs,
    };
  } catch {
    const certs = await getPublishedCertifications();
    return {
      meta: {
        badge: "STUDENT ACHIEVEMENTS",
        heading: "More than a Certificate.",
        headline_prefix: "More than a",
        headline_highlight: "Certificate.",
        subheading: "Skill Verification for High-Income Careers",
        description: "Valavan Academy certifications validate real-world portfolio deliverables, tool mastery, and hands-on client projects.",
      },
      certifications: certs,
    };
  }
}

/**
 * Fetch published programs from Supabase (falls back to DEFAULT_PROGRAMS)
 */
export async function getPublishedPrograms(): Promise<CMSProgram[]> {
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("status", "published")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_PROGRAMS.map((p, idx) => ({
        slug: p.slug.replace("/programs/", ""),
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        duration: p.duration,
        level: p.level,
        thumbnail_url: p.image,
        banner_url: p.image,
        cta_text: "View Details",
        cta_url: p.slug,
        skills: [...p.skills],
        sort_order: idx + 1,
        status: "published",
        is_visible: true,
      }));
    }

    return data as CMSProgram[];
  } catch {
    return DEFAULT_PROGRAMS.map((p, idx) => ({
      slug: p.slug.replace("/programs/", ""),
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      duration: p.duration,
      level: p.level,
      thumbnail_url: p.image,
      banner_url: p.image,
      cta_text: "View Details",
      cta_url: p.slug,
      skills: [...p.skills],
      sort_order: idx + 1,
      status: "published",
      is_visible: true,
    }));
  }
}

/**
 * Fetch a single program by its slug from Supabase
 */
export async function getProgramBySlug(slug: string): Promise<CMSProgram | null> {
  try {
    const cleanSlug = slug.replace("/programs/", "").replace(/^\//, "");
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("slug", cleanSlug)
      .maybeSingle();

    if (error || !data) {
      const fallback = DEFAULT_PROGRAMS.find((p) => p.slug.includes(cleanSlug));
      if (fallback) {
        return {
          slug: cleanSlug,
          title: fallback.title,
          subtitle: fallback.subtitle,
          description: fallback.description,
          duration: fallback.duration,
          level: fallback.level,
          thumbnail_url: fallback.image,
          banner_url: fallback.image,
          cta_text: "Enroll Now",
          cta_url: cleanSlug.includes("full-stack")
            ? EXTERNAL_URLS.enrollFullStack
            : cleanSlug.includes("3-hours") || cleanSlug.includes("workshop")
            ? EXTERNAL_URLS.enroll3Hours
            : EXTERNAL_URLS.enroll90Days,
          skills: [...fallback.skills],
          status: "published",
          is_visible: true,
        };
      }
      return null;
    }

    return data as CMSProgram;
  } catch {
    return null;
  }
}

/**
 * Fetch published learner stories from Supabase (falls back to DEFAULT_LEARNER_STORIES)
 */
export async function getPublishedLearnerStories(): Promise<CMSLearnerStory[]> {
  try {
    const { data, error } = await supabase
      .from("learner_stories")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_LEARNER_STORIES;
    }

    return data as CMSLearnerStory[];
  } catch {
    return DEFAULT_LEARNER_STORIES;
  }
}

/**
 * Fetch published testimonials from Supabase (falls back to DEFAULT_TESTIMONIALS)
 */
export async function getPublishedTestimonials(): Promise<CMSTestimonial[]> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_TESTIMONIALS;
    }

    return data as CMSTestimonial[];
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}

/**
 * Fetch published certifications
 */
export async function getPublishedCertifications(): Promise<CMSCertification[]> {
  try {
    // 1. Try field_values from section 'certifications'
    const map = await getSectionFieldMap("home", "certifications");
    const certFields = Object.entries(map)
      .filter(([key, val]) => key.startsWith("cert_image_") && val)
      .map(([key, val], idx) => ({
        id: `cert-${idx + 1}`,
        title: `Certificate ${idx + 1}`,
        image_url: val,
        is_visible: true,
        sort_order: idx + 1,
      }));

    if (certFields.length > 0) return certFields;

    return [
      { id: "c1", title: "Certificate 1", image_url: "/assets/certifications/2.webp", is_visible: true },
      { id: "c2", title: "Certificate 2", image_url: "/assets/certifications/3.webp", is_visible: true },
      { id: "c3", title: "Certificate 3", image_url: "/assets/certifications/4.webp", is_visible: true },
      { id: "c4", title: "Certificate 4", image_url: "/assets/certifications/5.webp", is_visible: true },
      { id: "c5", title: "Certificate 5", image_url: "/assets/certifications/6.webp", is_visible: true },
      { id: "c6", title: "Certificate 6", image_url: "/assets/certifications/7.webp", is_visible: true },
      { id: "c7", title: "Certificate 7", image_url: "/assets/certifications/8.webp", is_visible: true },
      { id: "c8", title: "Certificate 8", image_url: "/assets/certifications/9.webp", is_visible: true },
    ];
  } catch {
    return [
      { id: "c1", title: "Certificate 1", image_url: "/assets/certifications/2.webp", is_visible: true },
      { id: "c2", title: "Certificate 2", image_url: "/assets/certifications/3.webp", is_visible: true },
      { id: "c3", title: "Certificate 3", image_url: "/assets/certifications/4.webp", is_visible: true },
      { id: "c4", title: "Certificate 4", image_url: "/assets/certifications/5.webp", is_visible: true },
      { id: "c5", title: "Certificate 5", image_url: "/assets/certifications/6.webp", is_visible: true },
      { id: "c6", title: "Certificate 6", image_url: "/assets/certifications/7.webp", is_visible: true },
      { id: "c7", title: "Certificate 7", image_url: "/assets/certifications/8.webp", is_visible: true },
      { id: "c8", title: "Certificate 8", image_url: "/assets/certifications/9.webp", is_visible: true },
    ];
  }
}

/**
 * Fetch site settings from Supabase
 */
export async function getSiteSettings(): Promise<CMSSiteSettings> {
  try {
    const contactMap = await getSectionFieldMap("contact", "contact_info");
    return {
      academy_name: DEFAULT_SITE_SETTINGS.academy_name,
      tagline: DEFAULT_SITE_SETTINGS.tagline,
      description: DEFAULT_SITE_SETTINGS.description,
      email: contactMap.email || DEFAULT_SITE_SETTINGS.email,
      phone: contactMap.phone || DEFAULT_SITE_SETTINGS.phone,
      address: contactMap.address || DEFAULT_SITE_SETTINGS.address,
      facebook_url: DEFAULT_SITE_SETTINGS.facebook_url,
      instagram_url: DEFAULT_SITE_SETTINGS.instagram_url,
      youtube_url: DEFAULT_SITE_SETTINGS.youtube_url,
      linkedin_url: DEFAULT_SITE_SETTINGS.linkedin_url,
      community_url: DEFAULT_SITE_SETTINGS.community_url,
      login_url: DEFAULT_SITE_SETTINGS.login_url,
      signup_url: DEFAULT_SITE_SETTINGS.signup_url,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Fetch About Page Data
 */
export async function getAboutPageData() {
  try {
    const heroMap = await getSectionFieldMap("about", "hero");
    const storyMap = await getSectionFieldMap("about", "story");
    const pillarsMap = await getSectionFieldMap("about", "pillars");

    return {
      hero: {
        eyebrow: heroMap.eyebrow || "ABOUT VALAVAN ACADEMY",
        heading: heroMap.heading || "Empowering Tamil Creators with High-Income Skills",
        description: heroMap.description || "From humble beginnings to Tamil Nadu premier digital skills academy — bridging the gap between passionate learners and high-demand commercial digital careers.",
      },
      story: {
        heading: storyMap.heading || "Built from Passion, Designed for Impact",
        description: storyMap.description || "Founded by Valavan, our mission is to deliver world-class creative education entirely in Tamil — empowering every ambitious student with real-world skills.",
      },
      pillars: {
        mission_title: pillarsMap.mission_title || "Our Mission",
        mission_desc: pillarsMap.mission_desc || "To empower Tamil-speaking learners with practical, industry-aligned skills in Graphic Design, Video Editing, UI/UX, and AI Tools that lead to real freelance careers and financial independence.",
        vision_title: pillarsMap.vision_title || "Our Vision",
        vision_desc: pillarsMap.vision_desc || "To build the world's largest Tamil creative ecosystem — empowering 100,000+ skilled creators, designers, and entrepreneurs to compete on a global stage.",
      }
    };
  } catch {
    return {
      hero: {
        eyebrow: "ABOUT VALAVAN ACADEMY",
        heading: "Empowering Tamil Creators with High-Income Skills",
        description: "From humble beginnings to Tamil Nadu premier digital skills academy — bridging the gap between passionate learners and high-demand commercial digital careers.",
      },
      story: {
        heading: "Built from Passion, Designed for Impact",
        description: "Founded by Valavan, our mission is to deliver world-class creative education entirely in Tamil — empowering every ambitious student with real-world skills.",
      },
      pillars: {
        mission_title: "Our Mission",
        mission_desc: "To empower Tamil-speaking learners with practical, industry-aligned skills in Graphic Design, Video Editing, UI/UX, and AI Tools that lead to real freelance careers and financial independence.",
        vision_title: "Our Vision",
        vision_desc: "To build the world's largest Tamil creative ecosystem — empowering 100,000+ skilled creators, designers, and entrepreneurs to compete on a global stage.",
      }
    };
  }
}

/**
 * Fetch Community Page Data
 */
export async function getCommunityPageData() {
  try {
    const heroMap = await getSectionFieldMap("community", "hero");
    return {
      eyebrow: heroMap.eyebrow || "TAMIL NADU CREATORS CLUB",
      heading: heroMap.heading || "The Largest Community of Tamil Creators & Designers",
      description: heroMap.description || "Over 40,000+ passionate creators collaborating, sharing client opportunities, attending offline summits, and mastering modern digital skills together.",
      cta_text: heroMap.cta_button_text || "Join the Community Now →",
      cta_url: heroMap.cta_button_url || "https://tamilnaducreatorsclub.com/",
    };
  } catch {
    return {
      eyebrow: "TAMIL NADU CREATORS CLUB",
      heading: "The Largest Community of Tamil Creators & Designers",
      description: "Over 40,000+ passionate creators collaborating, sharing client opportunities, attending offline summits, and mastering modern digital skills together.",
      cta_text: "Join the Community Now →",
      cta_url: "https://tamilnaducreatorsclub.com/",
    };
  }
}

/**
 * Fetch Contact Page Data
 */
export async function getContactPageData() {
  try {
    const heroMap = await getSectionFieldMap("contact", "hero");
    const contactMap = await getSectionFieldMap("contact", "contact_info");

    return {
      hero: {
        eyebrow: heroMap.eyebrow || "GET IN TOUCH",
        heading: heroMap.heading || "Let's Start a Conversation",
        description: heroMap.description || "Have questions about our programs, workshop enrollment, corporate training, or TNCC community? We are here to help.",
      },
      contactInfo: {
        email: contactMap.email || "valavanacademy001@gmail.com",
        phone: contactMap.phone || "+91 93452 79541",
        address: contactMap.address || "Valavan Academy, Tirupattur / Vellore District, Tamil Nadu, India",
        workingHours: contactMap.working_hours || "Monday - Saturday: 9:00 AM - 7:00 PM IST",
      }
    };
  } catch {
    return {
      hero: {
        eyebrow: "GET IN TOUCH",
        heading: "Let's Start a Conversation",
        description: "Have questions about our programs, workshop enrollment, corporate training, or TNCC community? We are here to help.",
      },
      contactInfo: {
        email: "valavanacademy001@gmail.com",
        phone: "+91 93452 79541",
        address: "Valavan Academy, Tirupattur / Vellore District, Tamil Nadu, India",
        workingHours: "Monday - Saturday: 9:00 AM - 7:00 PM IST",
      }
    };
  }
}

/**
 * Fetch 90-Days Graphic Design Program Section Data
 */
export async function getGraphicDesignProgramData() {
  try {
    const [hero, tools, roadmap, projects, outcomes, testimonials, support, faq, sticky] = await Promise.all([
      getSectionFieldMap("90-days-graphic-design", "hero"),
      getSectionFieldMap("90-days-graphic-design", "tools"),
      getSectionFieldMap("90-days-graphic-design", "roadmap"),
      getSectionFieldMap("90-days-graphic-design", "projects"),
      getSectionFieldMap("90-days-graphic-design", "outcomes"),
      getSectionFieldMap("90-days-graphic-design", "testimonials"),
      getSectionFieldMap("90-days-graphic-design", "enrollment_support"),
      getSectionFieldMap("90-days-graphic-design", "faq"),
      getSectionFieldMap("90-days-graphic-design", "sticky_cta"),
    ]);
    return { hero, tools, roadmap, projects, outcomes, testimonials, support, faq, sticky };
  } catch {
    return {
      hero: {},
      tools: {},
      roadmap: {},
      projects: {},
      outcomes: {},
      testimonials: {},
      support: {},
      faq: {},
      sticky: {},
    };
  }
}

/**
 * Fetch Full Stack Digital Creator Program Section Data
 */
export async function getFullStackCreatorProgramData() {
  try {
    const [hero, tools, syllabus, skillsMoney, certification, creatorEconomy, templatesBonus, whoIsThisFor, mentors, offer, finalCta, faq, sticky] = await Promise.all([
      getSectionFieldMap("full-stack-creator", "hero"),
      getSectionFieldMap("full-stack-creator", "tools"),
      getSectionFieldMap("full-stack-creator", "syllabus"),
      getSectionFieldMap("full-stack-creator", "skills_money"),
      getSectionFieldMap("full-stack-creator", "certification"),
      getSectionFieldMap("full-stack-creator", "creator_economy"),
      getSectionFieldMap("full-stack-creator", "templates_bonus"),
      getSectionFieldMap("full-stack-creator", "who_is_this_for"),
      getSectionFieldMap("full-stack-creator", "guidance_mentors"),
      getSectionFieldMap("full-stack-creator", "offer"),
      getSectionFieldMap("full-stack-creator", "final_cta"),
      getSectionFieldMap("full-stack-creator", "faq"),
      getSectionFieldMap("full-stack-creator", "sticky_cta"),
    ]);
    return { hero, tools, syllabus, skillsMoney, certification, creatorEconomy, templatesBonus, whoIsThisFor, mentors, offer, finalCta, faq, sticky };
  } catch {
    return {
      hero: {},
      tools: {},
      syllabus: {},
      skillsMoney: {},
      certification: {},
      creatorEconomy: {},
      templatesBonus: {},
      whoIsThisFor: {},
      mentors: {},
      offer: {},
      finalCta: {},
      faq: {},
      sticky: {},
    };
  }
}

/**
 * Fetch 3 Hours Live Workshop Section Data
 */
export async function getWorkshopProgramData() {
  try {
    const [hero, whatYouDiscover, bonuses, whoShouldAttend, mentorBio, pricingCta, faq, sticky] = await Promise.all([
      getSectionFieldMap("3-hours-live-workshop", "hero"),
      getSectionFieldMap("3-hours-live-workshop", "what_you_discover"),
      getSectionFieldMap("3-hours-live-workshop", "bonuses"),
      getSectionFieldMap("3-hours-live-workshop", "who_should_attend"),
      getSectionFieldMap("3-hours-live-workshop", "mentor_bio"),
      getSectionFieldMap("3-hours-live-workshop", "pricing_cta"),
      getSectionFieldMap("3-hours-live-workshop", "faq"),
      getSectionFieldMap("3-hours-live-workshop", "sticky_cta"),
    ]);
    return { hero, whatYouDiscover, bonuses, whoShouldAttend, mentorBio, pricingCta, faq, sticky };
  } catch {
    return {
      hero: {},
      whatYouDiscover: {},
      bonuses: {},
      whoShouldAttend: {},
      mentorBio: {},
      pricingCta: {},
      faq: {},
      sticky: {},
    };
  }
}

export interface CMSTrackingSettings {
  meta_pixel_id?: string;
  meta_pixel_enabled?: string;
  ga4_measurement_id?: string;
  ga4_enabled?: string;
  gtm_container_id?: string;
  gtm_enabled?: string;
  clarity_project_id?: string;
  clarity_enabled?: string;
  tiktok_pixel_id?: string;
  tiktok_enabled?: string;
  linkedin_partner_id?: string;
  linkedin_enabled?: string;
  hotjar_site_id?: string;
  hotjar_enabled?: string;
  custom_head_code?: string;
  custom_body_top_code?: string;
  custom_footer_code?: string;
  cookie_consent_enabled?: string;
  conversion_goals_data?: string;
}

/**
 * Fetch Global Tracking & Analytics Configuration
 */
export async function getTrackingSettings(): Promise<CMSTrackingSettings> {
  try {
    const map = await getSectionFieldMap("global_settings", "tracking_analytics");
    return map as CMSTrackingSettings;
  } catch (err) {
    console.error("Error fetching tracking settings:", err);
    return {};
  }
}

export interface CMSThankYouData {
  heading: string;
  programTitle: string;
  journeySubtext: string;
  inboxNote: string;
  activationNote: string;
  courseAccessBtnText: string;
  courseAccessPhone: string;
  courseAccessUrl: string;
  whatsappGroupBtnText: string;
  whatsappGroupUrl: string;
  metaEvent: string;
  conversionValue: number;
}

/**
 * Fetch Thank You Page content for a specific program slug (with CMS overrides & full fallbacks)
 */
export async function getThankYouPageData(slug?: string): Promise<CMSThankYouData> {
  const cleanSlug = (slug || "").toLowerCase();

  let canonicalPageSlug = "90-days-graphic-design";
  let defaultTitle = "90-Day Graphic Design Mastery Program";
  let defaultJourney = "Your Creative Design Journey Starts Now";
  let defaultGroupUrl = "https://chat.whatsapp.com/JfBplPD1MisAt0RMgrylRj";
  let defaultMetaEvent = "Purchase";
  let defaultVal = 0;

  if (cleanSlug.includes("full-stack") || cleanSlug.includes("fullstack") || cleanSlug.includes("creator")) {
    canonicalPageSlug = "full-stack-creator";
    defaultTitle = "Full Stack Digital Creator Program";
    defaultJourney = "Your Digital Creator Journey Starts Now";
    defaultGroupUrl = "https://chat.whatsapp.com/JfBplPD1MisAt0RMgrylRj";
    defaultMetaEvent = "Purchase";
    defaultVal = 0;
  } else if (cleanSlug.includes("3-hours") || cleanSlug.includes("workshop") || cleanSlug.includes("live") || cleanSlug.includes("printing")) {
    canonicalPageSlug = "3-hours-live-workshop";
    defaultTitle = "3 Hours Live Workshop";
    defaultJourney = "Your Graphic Design & Printing Business Journey Starts Now";
    defaultGroupUrl = "https://chat.whatsapp.com/JfBplPD1MisAt0RMgrylRj";
    defaultMetaEvent = "CompleteRegistration";
    defaultVal = 99;
  }

  try {
    let dedicatedSlug = `thank-you/${canonicalPageSlug}`;
    if (!slug || cleanSlug === "default" || cleanSlug === "general" || cleanSlug === "thank-you") {
      dedicatedSlug = "thank-you";
    }

    let map = await getSectionFieldMap(dedicatedSlug, "thank_you");
    if (!map || Object.keys(map).length === 0) {
      map = await getSectionFieldMap(canonicalPageSlug, "thank_you");
    }

    const programTitle = map.program_title || defaultTitle;
    const phone = (map.course_access_phone || "+91 82205 11273").replace(/[^0-9]/g, "");
    const waText = encodeURIComponent(`Hi Valavan Academy, I have enrolled in the ${programTitle} and need course access.`);
    const computedCourseAccessUrl = `https://wa.me/${phone || "918220511273"}?text=${waText}`;

    return {
      heading: map.heading || "Thank You For Purchasing",
      programTitle,
      journeySubtext: map.journey_subtext || defaultJourney,
      inboxNote: map.inbox_note || "Check Your Inbox! ✉️ We Have Sent Your Order Confirmation, Your Registered Email Address.",
      activationNote: map.activation_note || "In Case Your Course Access Is Not Activated Instantly After Purchase, Kindly Note That It Will Be Activated Within Our Working Hours, Between 10:00 AM To 7:00 PM.",
      courseAccessBtnText: map.course_access_btn_text || "I Need Course Access",
      courseAccessPhone: map.course_access_phone || "+91 82205 11273",
      courseAccessUrl: map.course_access_btn_url || computedCourseAccessUrl,
      whatsappGroupBtnText: map.whatsapp_group_btn_text || "Join Whatsapp Community Group",
      whatsappGroupUrl: map.whatsapp_group_url || defaultGroupUrl,
      metaEvent: map.meta_event || defaultMetaEvent,
      conversionValue: map.conversion_value ? Number(map.conversion_value) : defaultVal,
    };
  } catch (err) {
    console.error("Error fetching thank you data:", err);
    return {
      heading: "Thank You For Purchasing",
      programTitle: defaultTitle,
      journeySubtext: defaultJourney,
      inboxNote: "Check Your Inbox! ✉️ We Have Sent Your Order Confirmation, Your Registered Email Address.",
      activationNote: "In Case Your Course Access Is Not Activated Instantly After Purchase, Kindly Note That It Will Be Activated Within Our Working Hours, Between 10:00 AM To 7:00 PM.",
      courseAccessBtnText: "I Need Course Access",
      courseAccessPhone: "+91 82205 11273",
      courseAccessUrl: `https://wa.me/918220511273?text=${encodeURIComponent(`Hi Valavan Academy, I have enrolled in the ${defaultTitle} and need course access.`)}`,
      whatsappGroupBtnText: "Join Whatsapp Community Group",
      whatsappGroupUrl: defaultGroupUrl,
      metaEvent: defaultMetaEvent,
      conversionValue: defaultVal,
    };
  }
}


