import { NextResponse } from "next/server";
import { getLessons, getPopularLessons } from "@/features/lessons/actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const popular = searchParams.get("popular");
  const courseType = searchParams.get("courseType");
  const difficulty = searchParams.get("difficulty");

  if (popular) {
    const lessons = await getPopularLessons(Number(popular) || 6);
    return NextResponse.json(lessons);
  }

  const lessons = await getLessons(courseType ?? undefined, difficulty ?? undefined);
  return NextResponse.json(lessons);
}
