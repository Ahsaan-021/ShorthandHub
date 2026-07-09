import { db } from "@/lib/db";
import { LessonsManager } from "./LessonsManager";
export const dynamic = "force-dynamic";

export default async function AdminLessonsPage() {
  const [lessons, categories] = await Promise.all([
    db.lesson.findMany({ orderBy: { order: "asc" }, include: { category: true } }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lessons</h1>
        <p className="text-muted-foreground mt-1">Manage your shorthand lessons.</p>
      </div>
      <LessonsManager lessons={lessons} categories={categories} />
    </div>
  );
}
