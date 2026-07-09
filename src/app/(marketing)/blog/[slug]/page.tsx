import { notFound } from "next/navigation";
import { generateMetadata } from "@/lib/seo";
import { getPostBySlug, getRelatedPosts } from "@/features/blog/actions";
import { BlogPostContent } from "./BlogPostContent";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadataFn({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return generateMetadata();
  return generateMetadata({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.createdAt.toISOString(),
    tags: Array.isArray(post.tags) ? (post.tags as string[]) : undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = post.category
    ? await getRelatedPosts(post.category.id, post.id)
    : [];

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <BlogPostContent
          post={post as any}
          relatedPosts={relatedPosts as any[]}
        />
      </div>
    </div>
  );
}