"use server";

import { db } from "@/lib/db";

export async function getLessons(courseType?: string, difficulty?: string) {
  return db.lesson.findMany({
    where: {
      published: true,
      ...(courseType && { courseType: courseType.toUpperCase() as any }),
      ...(difficulty && { difficulty: difficulty.toUpperCase() as any }),
    },
    include: { category: true },
    orderBy: { order: "asc" },
  });
}

export async function getLessonBySlug(slug: string) {
  return db.lesson.findUnique({
    where: { slug },
    include: {
      category: true,
      exercises: { orderBy: { order: "asc" } },
      quizzes: { orderBy: { order: "asc" } },
    },
  });
}

export async function getPopularLessons(limit = 6) {
  return db.lesson.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { category: true },
  });
}
