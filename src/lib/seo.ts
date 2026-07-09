import { APP_NAME, APP_DESCRIPTION, APP_URL } from "./constants";
import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  path = "",
  image = "/og-image.png",
  type = "website",
  publishedTime,
  tags,
}: SEOProps = {}): Metadata {
  const seoTitle = title
    ? `${title} | ${APP_NAME}`
    : `${APP_NAME} — ${APP_DESCRIPTION}`;
  const seoDescription = description ?? APP_DESCRIPTION;
  const url = `${APP_URL}${path}`;

  return {
    title: seoTitle,
    description: seoDescription,
    metadataBase: new URL(APP_URL),
    alternates: { canonical: url },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      siteName: APP_NAME,
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      ...(publishedTime && {
        article: { publishedTime, tags },
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [image],
      creator: "@shorthandhub",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}