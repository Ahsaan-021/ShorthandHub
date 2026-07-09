"use client";

import { motion } from "framer-motion";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogCard } from "@/components/blog/BlogCard";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  authorName: string;
  createdAt: Date;
  readingTime: number;
  tags: string[];
  category: { name: string; slug: string } | null;
}

interface BlogPostContentProps {
  post: Post;
  relatedPosts: Post[];
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BlogContent
        title={post.title}
        content={post.content}
        coverImage={post.coverImage}
        authorName={post.authorName}
        createdAt={post.createdAt}
        readingTime={post.readingTime}
        category={post.category}
        tags={post.tags}
        slug={post.slug}
      />

      {relatedPosts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <BlogCard
                key={rp.id}
                slug={rp.slug}
                title={rp.title}
                excerpt={rp.excerpt}
                coverImage={rp.coverImage}
                authorName={rp.authorName}
                createdAt={rp.createdAt}
                readingTime={rp.readingTime}
                category={rp.category}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
