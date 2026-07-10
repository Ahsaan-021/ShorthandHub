"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function searchDictionary(query: string, courseType?: string) {
  const results = await db.dictionary.findMany({
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

  // Sort: exact matches first, then starts-with, then contains
  if (query) {
    const q = query.toLowerCase();
    results.sort((a, b) => {
      const aWord = a.word.toLowerCase();
      const bWord = b.word.toLowerCase();
      const aExact = aWord === q ? 0 : aWord.startsWith(q) ? 1 : 2;
      const bExact = bWord === q ? 0 : bWord.startsWith(q) ? 1 : 2;
      return aExact - bExact || aWord.localeCompare(bWord);
    });
  }

  return results;
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
