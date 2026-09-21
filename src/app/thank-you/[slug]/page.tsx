import { Metadata } from "next";
import { getThankYouPageData } from "@/lib/cms";
import ThankYouView from "@/components/sections/ThankYouView";

export const revalidate = 60;

interface ThankYouSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ThankYouSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getThankYouPageData(slug);

  return {
    title: `Thank You For Enrolling in ${data.programTitle} — Valavan Academy`,
    description: `Thank you for purchasing ${data.programTitle}. Join the community group and get course access.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ThankYouSlugPage({ params }: ThankYouSlugPageProps) {
  const { slug } = await params;
  const data = await getThankYouPageData(slug);

  return <ThankYouView data={data} />;
}
