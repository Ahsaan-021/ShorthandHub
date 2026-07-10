import { NextResponse } from "next/server";
import { searchDictionary } from "@/features/dictionary/actions";
import { generatePitmanOutline } from "@/features/dictionary/pitman-generator";
import { generatePitmanSentence } from "@/features/dictionary/pitman-sentence-generator";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "";
  const courseType = searchParams.get("courseType") ?? undefined;

  if (!query) {
    const all = await searchDictionary("", courseType);
    return NextResponse.json(all);
  }

  const trimmed = query.trim();

  // Sentence lookup (multiple words)
  if (trimmed.includes(" ") && trimmed.length > 2) {
    const generated = generatePitmanSentence(trimmed);
    return NextResponse.json({
      type: "sentence",
      ...generated,
    });
  }

  const exact = await searchDictionary(trimmed, courseType).then(
    (r) => r.find((e) => e.word.toLowerCase() === trimmed.toLowerCase())
  );

  if (exact) {
    return NextResponse.json([{
      ...exact,
      isGenerated: false,
    }]);
  }

  const generated = generatePitmanOutline(trimmed);
  return NextResponse.json([{
    id: `generated-${trimmed}`,
    word: generated.word,
    slug: generated.word.toLowerCase().replace(/\s+/g, "-"),
    pronunciation: generated.pronunciation,
    meaning: generated.meaning,
    outline: generated.outline,
    rule: generated.rule,
    courseType: "PITMAN" as const,
    relatedWords: null,
    isGenerated: true,
  }]);
}
