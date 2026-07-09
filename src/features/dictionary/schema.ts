import { z } from "zod";

export const courseTypeEnum = z.enum(["PITMAN", "GREGG", "TEELINE"]).optional();

export const dictionarySearchSchema = z.object({
  query: z.string().min(1),
  courseType: courseTypeEnum,
});

export type DictionarySearchInput = z.infer<typeof dictionarySearchSchema>;
