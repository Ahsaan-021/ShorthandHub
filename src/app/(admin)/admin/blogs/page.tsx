import { db } from "@/lib/db";
import { BlogsManager } from "./BlogsManager";
export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const [posts, categories] = await Promise.all([
    db.blog.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-muted-foreground mt-1">Manage your blog content.</p>
      </div>
      <BlogsManager posts={posts} categories={categories} />
    </div>
  );
}
