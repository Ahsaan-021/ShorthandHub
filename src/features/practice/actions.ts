"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { practiceSessionSchema, type PracticeSessionInput } from "./schema";

export async function createPracticeSession(data: PracticeSessionInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = practiceSessionSchema.parse(data);

  return db.practiceSession.create({
    data: {
      userId: session.user.id,
      type: validated.type,
      duration: validated.duration,
      wpm: validated.wpm,
      accuracy: validated.accuracy,
      mistakes: validated.mistakes,
      completed: true,
    },
  });
}

export async function getPracticeSessions(userId: string) {
  return db.practiceSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDailyChallenge() {
  const count = await db.lesson.count({
    where: { published: true, lessonType: "PRACTICE" },
  });

  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);

  return db.lesson.findFirst({
    where: { published: true, lessonType: "PRACTICE" },
    skip: randomIndex,
    include: { exercises: true },
  });
}
