import { NextResponse } from "next/server";
import { searchDictionary } from "@/features/dictionary/actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "";
  const courseType = searchParams.get("courseType") ?? undefined;
  const results = await searchDictionary(query, courseType);
  return NextResponse.json(results);
}
