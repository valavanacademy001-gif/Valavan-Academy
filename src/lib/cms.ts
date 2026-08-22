/**
 * Valavan Academy — Central CMS Data Layer
 * Connects to Supabase to fetch published content for the Main Website.
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

export interface CMSRibbonItem {
  id: string;
  text: string;
  highlight?: boolean;
}

// ─── DEFAULT FALLBACKS (Guarantees zero UI regressions) ──────────────────────

export const DEFAULT_SITE_SETTINGS: CMSSiteSettings = {
  academy_name: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  email: "valavanacademy001@gmail.com",
  phone: "",
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
  secondaryButtonText: "Join TNCC Community",
  secondaryButtonUrl: EXTERNAL_URLS.community,
  videoUrl: "/assets/videos/hero-bg.mp4",
  posterImage: "/assets/images/hero/hero-poster.webp",
};

export const DEFAULT_LEARNER_STORIES: CMSLearnerStory[] = [
  {
    title: "Student Transformation 01",
    student_name: "Valavan Academy Student",
    youtube_url: "https://www.youtube.com/shorts/BzQ9wNPit5I",
    youtube_video_id: "BzQ9wNPit5I",
    thumbnail_url: "https://img.youtube.com/vi/BzQ9wNPit5I/hqdefault.jpg",
    duration: "0:45",
    sort_order: 1,
  },
  {
    title: "Student Transformation 02",
    student_name: "Valavan Academy Student",
    youtube_url: "https://www.youtube.com/shorts/3oVzfOTkjWE",
    youtube_video_id: "3oVzfOTkjWE",
    thumbnail_url: "https://img.youtube.com/vi/3oVzfOTkjWE/hqdefault.jpg",
    duration: "0:50",
    sort_order: 2,
  },
  {
    title: "Student Transformation 03",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/N5a_d-R_eJw",
    youtube_video_id: "N5a_d-R_eJw",
    thumbnail_url: "https://img.youtube.com/vi/N5a_d-R_eJw/hqdefault.jpg",
    duration: "0:40",
    sort_order: 3,
  },
  {
    title: "Student Transformation 04",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/wZ5HiQO8g74",
    youtube_video_id: "wZ5HiQO8g74",
    thumbnail_url: "https://img.youtube.com/vi/wZ5HiQO8g74/hqdefault.jpg",
    duration: "0:55",
    sort_order: 4,
  },
  {
    title: "Student Transformation 05",
    student_name: "Valavan Academy Student",
    youtube_url: "https://www.youtube.com/shorts/h3uv9HAC3Ek",
    youtube_video_id: "h3uv9HAC3Ek",
    thumbnail_url: "https://img.youtube.com/vi/h3uv9HAC3Ek/hqdefault.jpg",
    duration: "0:48",
    sort_order: 5,
  },
  {
    title: "Student Transformation 06",
    student_name: "Valavan Academy Student",
    youtube_url: "https://www.youtube.com/shorts/tPPE5Jywfsg",
    youtube_video_id: "tPPE5Jywfsg",
    thumbnail_url: "https://img.youtube.com/vi/tPPE5Jywfsg/hqdefault.jpg",
    duration: "0:42",
    sort_order: 6,
  },
  {
    title: "Student Transformation 07",
    student_name: "Valavan Academy Student",
    youtube_url: "https://www.youtube.com/shorts/RRn6b8cIgxc",
    youtube_video_id: "RRn6b8cIgxc",
    thumbnail_url: "https://img.youtube.com/vi/RRn6b8cIgxc/hqdefault.jpg",
    duration: "0:52",
    sort_order: 7,
  },
  {
    title: "Student Transformation 08",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/GNLYaMdWF64",
    youtube_video_id: "GNLYaMdWF64",
    thumbnail_url: "https://img.youtube.com/vi/GNLYaMdWF64/hqdefault.jpg",
    duration: "0:46",
    sort_order: 8,
  },
  {
    title: "Student Transformation 09",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/R4nXDTTTq4g",
    youtube_video_id: "R4nXDTTTq4g",
    thumbnail_url: "https://img.youtube.com/vi/R4nXDTTTq4g/hqdefault.jpg",
    duration: "0:54",
    sort_order: 9,
  },
  {
    title: "Student Transformation 10",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/nCQ18VfjKUQ",
    youtube_video_id: "nCQ18VfjKUQ",
    thumbnail_url: "https://img.youtube.com/vi/nCQ18VfjKUQ/hqdefault.jpg",
    duration: "0:49",
    sort_order: 10,
  },
  {
    title: "Student Transformation 11",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/ezqLPTS8vHk",
    youtube_video_id: "ezqLPTS8vHk",
    thumbnail_url: "https://img.youtube.com/vi/ezqLPTS8vHk/hqdefault.jpg",
    duration: "0:51",
    sort_order: 11,
  },
  {
    title: "Student Transformation 12",
    student_name: "Valavan Academy Student",
    youtube_url: "https://youtube.com/shorts/YOhkWGcyTLw",
    youtube_video_id: "YOhkWGcyTLw",
    thumbnail_url: "https://img.youtube.com/vi/YOhkWGcyTLw/hqdefault.jpg",
    duration: "0:47",
    sort_order: 12,
  },
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

// ─── DATA FETCHERS (Server-Side / Client-Side) ───────────────────────────────

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
        cta_text: "Enroll Now",
        cta_url: EXTERNAL_URLS.signup,
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
      cta_text: "Enroll Now",
      cta_url: EXTERNAL_URLS.signup,
      skills: [...p.skills],
      sort_order: idx + 1,
      status: "published",
      is_visible: true,
    }));
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
 * Fetch site settings from Supabase (falls back to DEFAULT_SITE_SETTINGS)
 */
export async function getSiteSettings(): Promise<CMSSiteSettings> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error || !data || data.length === 0) {
      return DEFAULT_SITE_SETTINGS;
    }

    const settingsMap: Record<string, string> = {};
    for (const item of data) {
      settingsMap[item.key] = item.value;
    }

    return {
      academy_name: settingsMap.academy_name || DEFAULT_SITE_SETTINGS.academy_name,
      tagline: settingsMap.tagline || DEFAULT_SITE_SETTINGS.tagline,
      description: settingsMap.description || DEFAULT_SITE_SETTINGS.description,
      email: settingsMap.email || DEFAULT_SITE_SETTINGS.email,
      phone: settingsMap.phone || DEFAULT_SITE_SETTINGS.phone,
      facebook_url: settingsMap.facebook_url || DEFAULT_SITE_SETTINGS.facebook_url,
      instagram_url: settingsMap.instagram_url || DEFAULT_SITE_SETTINGS.instagram_url,
      youtube_url: settingsMap.youtube_url || DEFAULT_SITE_SETTINGS.youtube_url,
      linkedin_url: settingsMap.linkedin_url || DEFAULT_SITE_SETTINGS.linkedin_url,
      community_url: settingsMap.community_url || DEFAULT_SITE_SETTINGS.community_url,
      login_url: settingsMap.login_url || DEFAULT_SITE_SETTINGS.login_url,
      signup_url: settingsMap.signup_url || DEFAULT_SITE_SETTINGS.signup_url,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Fetch dynamic CMS page by slug
 */
export async function getPublishedPageBySlug(slug: string) {
  try {
    const { data: page, error: pageErr } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (pageErr || !page) return null;

    const { data: sections, error: secErr } = await supabase
      .from("sections")
      .select(`
        *,
        section_type:section_types(*),
        fields(
          *,
          value:field_values(*)
        )
      `)
      .eq("page_id", page.id)
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    return {
      ...page,
      sections: secErr || !sections ? [] : sections,
    };
  } catch {
    return null;
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
      .single();

    if (error || !data) {
      // Fallback from default programs
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
          cta_url: EXTERNAL_URLS.signup,
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
 * Fetch published certifications from Supabase
 */
export async function getPublishedCertifications(): Promise<CMSCertification[]> {
  try {
    // 1. Try certifications table
    const { data: certs } = await supabase
      .from("certifications")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (certs && certs.length > 0) {
      return certs as CMSCertification[];
    }

    // 2. Try certifications section in field_values
    const { data: certFields } = await supabase
      .from("field_values")
      .select("*, field:fields(name, label)")
      .not("value_url", "is", null);

    if (certFields && certFields.length > 0) {
      const mapped = certFields
        .filter((cf) => cf.field?.name?.startsWith("cert_image_") && cf.value_url)
        .map((cf, idx) => ({
          id: cf.id,
          title: cf.field?.label || `Certificate ${idx + 1}`,
          image_url: cf.value_url,
          is_visible: true,
          sort_order: idx + 1,
        }));
      if (mapped.length > 0) return mapped;
    }

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
 * Fetch Hero Data from Supabase fields or default
 */
export async function getHeroData(): Promise<CMSHeroData> {
  try {
    const { data: heroSection } = await supabase
      .from("sections")
      .select("id")
      .eq("name", "Hero Section")
      .single();

    if (!heroSection) return DEFAULT_HERO_DATA;

    const { data: fieldVals } = await supabase
      .from("field_values")
      .select("*, field:fields(name)")
      .eq("section_id", heroSection.id);

    if (!fieldVals || fieldVals.length === 0) return DEFAULT_HERO_DATA;

    const map: Record<string, string> = {};
    for (const fv of fieldVals) {
      if (fv.field?.name) {
        map[fv.field.name] = fv.value_text || fv.value_url || "";
      }
    }

    return {
      heading: map.hero_heading_1 || DEFAULT_HERO_DATA.heading,
      highlightText: map.hero_heading_2 || DEFAULT_HERO_DATA.highlightText,
      description: map.hero_description || DEFAULT_HERO_DATA.description,
      primaryButtonText: map.hero_cta_primary_text || DEFAULT_HERO_DATA.primaryButtonText,
      primaryButtonUrl: map.hero_cta_primary_url || DEFAULT_HERO_DATA.primaryButtonUrl,
      secondaryButtonText: map.hero_cta_secondary_text || DEFAULT_HERO_DATA.secondaryButtonText,
      secondaryButtonUrl: map.hero_cta_secondary_url || DEFAULT_HERO_DATA.secondaryButtonUrl,
      videoUrl: map.hero_video_bg || DEFAULT_HERO_DATA.videoUrl,
    };
  } catch {
    return DEFAULT_HERO_DATA;
  }
}
