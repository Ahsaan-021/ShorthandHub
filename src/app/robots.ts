import { APP_URL } from "@/lib/constants";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/dashboard/"] }],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
