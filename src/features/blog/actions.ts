"use server";

import { db } from "@/lib/db";

export async function getPosts() {
  return db.blog.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return db.blog.findUnique({
    where: { slug, published: true },
    include: { category: true },
  });
}

export async function getRelatedPosts(categoryId: string, excludeId: string) {
  return db.blog.findMany({
    where: {
      categoryId,
      published: true,
      id: { not: excludeId },
    },
    include: { category: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategories() {
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { blogs: true } } },
  });
}
