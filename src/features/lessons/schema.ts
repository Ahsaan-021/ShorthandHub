import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(10),
  theory: z.string().optional(),
  rules: z.string().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  courseType: z.enum(["PITMAN", "GREGG", "TEELINE"]),
  lessonType: z.enum(["THEORY", "EXERCISE", "QUIZ", "PRACTICE"]),
  order: z.number(),
  xpReward: z.number().default(100),
  published: z.boolean().default(false),
  categoryId: z.string().optional(),
});

export type LessonInput = z.infer<typeof lessonSchema>;
