import { z } from "zod";

export const practiceTypeEnum = z.enum(["TIMED", "DICTATION", "TYPING", "DAILY", "CHALLENGE"]);

export const practiceSessionSchema = z.object({
  type: practiceTypeEnum,
  duration: z.number().int().positive(),
  wpm: z.number().min(0).optional(),
  accuracy: z.number().min(0).max(100).optional(),
  mistakes: z.number().int().min(0).optional(),
});

export type PracticeSessionInput = z.infer<typeof practiceSessionSchema>;
