import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  authorName: z.string().min(1),
  categoryId: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
