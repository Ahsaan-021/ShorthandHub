import { generateMetadata } from "@/lib/seo";
import { getPosts, getCategories } from "@/features/blog/actions";
import { BlogListingContent } from "./BlogListingContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Blog",
  description: "Tips, guides, and updates on shorthand learning.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <BlogListingContent posts={posts} categories={categories} />
      </div>
    </div>
  );
}
