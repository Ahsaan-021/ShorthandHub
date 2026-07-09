import { z } from "zod";

export const progressSchema = z.object({
  lessonId: z.string(),
  score: z.number().optional(),
  accuracy: z.number().min(0).max(100).optional(),
});

export type ProgressInput = z.infer<typeof progressSchema>;
