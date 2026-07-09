"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog/BlogCard";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { blogs: number };
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  authorName: string;
  createdAt: Date;
  readingTime: number;
  category: { name: string; slug: string } | null;
}

interface BlogListingContentProps {
  posts: Post[];
  categories: Category[];
}

export function BlogListingContent({ posts, categories }: BlogListingContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      selectedCategory
        ? posts.filter((p) => p.category?.slug === selectedCategory)
        : posts,
    [posts, selectedCategory]
  );

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">ShorthandHub Blog</h1>
        <p className="text-muted-foreground">
          Tips, guides, and updates to help you master shorthand faster.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
            !selectedCategory
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
              selectedCategory === cat.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.name} ({cat._count.blogs})
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                authorName={post.authorName}
                createdAt={post.createdAt}
                readingTime={post.readingTime}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No posts found in this category.
          </div>
        )}
      </motion.div>
    </div>
  );
}
