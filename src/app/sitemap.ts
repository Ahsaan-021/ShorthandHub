import { APP_URL } from "@/lib/constants";

async function safeDbQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export default async function sitemap() {
  const { db } = await import("@/lib/db");

  const [lessons, blogs] = await Promise.all([
    safeDbQuery(() => db.lesson.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }), []),
    safeDbQuery(() => db.blog.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }), []),
  ]);

  const staticPages = [
    { url: APP_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${APP_URL}/about`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/courses/pitman`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/courses/gregg`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/courses/teeline`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/dictionary`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/practice`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${APP_URL}/contact`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const lessonPages = lessons.map((l) => ({
    url: `${APP_URL}/courses/pitman/${l.slug}`,
    lastModified: l.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogs.map((b) => ({
    url: `${APP_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...lessonPages, ...blogPages];
}