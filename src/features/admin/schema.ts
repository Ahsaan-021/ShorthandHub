import { z } from "zod";

export const lessonFormSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(10),
  theory: z.string().optional(),
  rules: z.string().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  courseType: z.enum(["PITMAN", "GREGG", "TEELINE"]),
  lessonType: z.enum(["THEORY", "EXERCISE", "QUIZ", "PRACTICE"]),
  order: z.coerce.number().int().positive(),
  xpReward: z.coerce.number().int().positive().default(100),
  published: z.boolean().default(false),
  categoryId: z.string().optional(),
});

export const blogFormSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  authorName: z.string().min(1),
  categoryId: z.string().min(1),
  tags: z.string().optional(),
});

export const dictionaryFormSchema = z.object({
  word: z.string().min(1),
  slug: z.string().min(1),
  pronunciation: z.string().optional(),
  meaning: z.string().min(1),
  outline: z.string().optional(),
  rule: z.string().optional(),
  courseType: z.enum(["PITMAN", "GREGG", "TEELINE"]),
  relatedWords: z.string().optional(),
});

export type LessonFormInput = z.infer<typeof lessonFormSchema>;
export type BlogFormInput = z.infer<typeof blogFormSchema>;
export type DictionaryFormInput = z.infer<typeof dictionaryFormSchema>;
