import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ReducedMotionProvider from "@/components/animations/ReducedMotionProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import { SITE_CONFIG } from "@/data/site.config";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// ─── Google Fonts (Self-hosted & optimized by Next.js) ────────────────────────
const inter = Inter({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display:  "swap",
  preload:  true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  weight:   ["500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display:  "swap",
  preload:  true,
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:              "device-width",
  initialScale:       1,
  themeColor:         SITE_CONFIG.themeColor,
  colorScheme:        "light",
};

// ─── Default Metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default:  `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "graphic design course Tamil",
    "video editing Tamil",
    "digital skills Tamil Nadu",
    "web design course",
    "UI UX design Tamil",
    "AI tools course",
    "Valavan Academy",
    "online design course India",
    "full stack creator",
    "Tamil creative education",
  ],
  authors:  [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator:  SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type:        "website",
    locale:      SITE_CONFIG.locale,
    url:         SITE_CONFIG.url,
    siteName:    SITE_CONFIG.name,
    title:       `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url:    SITE_CONFIG.ogImage,
        width:  1200,
        height: 630,
        alt:    SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    site:        SITE_CONFIG.twitter,
    creator:     SITE_CONFIG.twitter,
    title:       `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images:      [SITE_CONFIG.ogImage],
  },
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:          true,
      follow:         true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
  icons: {
    icon:        "/logo-icon.png",
    shortcut:    "/logo-icon.png",
    apple:       "/logo-icon.png",
  },
};

import { Suspense } from "react";
import Script from "next/script";
import { getSiteSettings, getTrackingSettings, getPageTrackingRules } from "@/lib/cms";
import GlobalTrackingEngine from "@/components/tracking/GlobalTrackingEngine";

// ─── Layout Props ─────────────────────────────────────────────────────────────
interface RootLayoutProps {
  children: React.ReactNode;
}

import PwaDisableProvider from "@/components/layout/PwaDisableProvider";

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default async function RootLayout({ children }: RootLayoutProps) {
  const [settings, trackingSettings, pageRules] = await Promise.all([
    getSiteSettings(),
    getTrackingSettings(),
    getPageTrackingRules(),
  ]);

  const metaPixelId = trackingSettings.meta_pixel_id || '1773816340532641';

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {/* GA4 & GTM DataLayer Initialization */}
        <Script
          id="ga4-datalayer-base"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-[--color-background] text-[--color-foreground]`}>
        <PwaDisableProvider />
        <CustomCursor />
        {/* Unified Global Tracking Engine (Meta Pixel, GA4, GTM dataLayer & CMS Page Rules) */}
        <Suspense fallback={null}>
          <GlobalTrackingEngine settings={trackingSettings} initialRules={pageRules} />
        </Suspense>
        <ReducedMotionProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-1">
              {children}
            </main>
            <Footer settings={settings} />
          </SmoothScrollProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}

