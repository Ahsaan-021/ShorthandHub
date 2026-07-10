"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function searchDictionary(query: string, courseType?: string) {
  return db.dictionary.findMany({
    where: {
      ...(query
        ? {
            OR: [
              { word: { contains: query, mode: "insensitive" } },
              { meaning: { contains: query, mode: "insensitive" } },
              { outline: { contains: query, mode: "insensitive" } },
              { rule: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(courseType && { courseType: courseType.toUpperCase() as any }),
    },
    orderBy: { word: "asc" },
    take: 50,
  });
}

export async function getWordBySlug(slug: string) {
  return db.dictionary.findUnique({
    where: { slug },
  });
}

export async function getFavorites(userId: string) {
  return db.dictionaryFavorite.findMany({
    where: { userId },
    include: { dictionary: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function addFavorite(userId: string, dictId: string) {
  return db.dictionaryFavorite.create({
    data: { userId, dictionaryId: dictId },
  });
}

export async function removeFavorite(userId: string, dictId: string) {
  return db.dictionaryFavorite.deleteMany({
    where: { userId, dictionaryId: dictId },
  });
}
