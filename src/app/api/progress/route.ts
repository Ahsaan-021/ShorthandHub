import { NextResponse } from "next/server";
import { getUserProgress } from "@/features/progress/actions";

export async function GET() {
  const progress = await getUserProgress();
  return NextResponse.json(progress);
}
