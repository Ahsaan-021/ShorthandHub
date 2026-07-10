import { generateMetadata as genMeta } from "@/lib/seo";
import { getLessonBySlug } from "@/features/lessons/actions";
import { notFound } from "next/navigation";
import { LessonDetailContent } from "./LessonDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) return {};
  return genMeta({
    title: lesson.title,
    description: lesson.description,
    path: `/courses/pitman/${slug}`,
  });
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  return (
    <div className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <LessonDetailContent lesson={lesson as any} />
      </div>
    </div>
  );
}