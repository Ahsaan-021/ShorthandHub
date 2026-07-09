import { db } from "@/lib/db";
import { APP_NAME, APP_URL } from "@/lib/constants";

export async function GET() {
  const posts = await db.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const items = posts.map((p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${APP_URL}/blog/${p.slug}</link>
      <description>${escapeXml(p.excerpt ?? "")}</description>
      <pubDate>${p.createdAt.toUTCString()}</pubDate>
      <guid>${APP_URL}/blog/${p.slug}</guid>
    </item>
  `).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${APP_NAME} Blog</title>
        <link>${APP_URL}/blog</link>
        <description>Latest shorthand learning tips and updates</description>
        <language>en</language>
        <atom:link href="${APP_URL}/feed.xml" rel="self" type="application/rss+xml"/>
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
