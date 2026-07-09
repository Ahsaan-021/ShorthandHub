"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function markLessonComplete(lessonId: string, score?: number, accuracy?: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const existing = await db.progress.findUnique({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
  });

  if (existing) {
    return db.progress.update({
      where: { id: existing.id },
      data: { completed: true, score, accuracy, completedAt: new Date() },
    });
  }

  return db.progress.create({
    data: {
      userId: session.user.id,
      lessonId,
      completed: true,
      score,
      accuracy,
      completedAt: new Date(),
    },
  });
}

export async function getUserProgress() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return db.progress.findMany({
    where: { userId: session.user.id },
    include: { lesson: true },
  });
}

export async function getUserStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const progress = await db.progress.findMany({
    where: { userId: session.user.id },
  });

  const practice = await db.practiceSession.findMany({
    where: { userId: session.user.id },
  });

  const achievements = await db.userAchievement.findMany({
    where: { userId: session.user.id },
  });

  const completed = progress.filter((p) => p.completed);
  const avgAccuracy = completed.length > 0
    ? completed.reduce((sum, p) => sum + (p.accuracy ?? 0), 0) / completed.length
    : 0;
  const avgWPM = practice.length > 0
    ? practice.reduce((sum, p) => sum + (p.wpm ?? 0), 0) / practice.length
    : 0;

  return {
    totalLessons: progress.length,
    completedLessons: completed.length,
    currentStreak: 0,
    totalXP: completed.length * 100,
    averageAccuracy: avgAccuracy,
    averageWPM: avgWPM,
    achievements: achievements.length,
  };
}
