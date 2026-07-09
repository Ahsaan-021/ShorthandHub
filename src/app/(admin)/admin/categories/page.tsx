import { db } from "@/lib/db";
import { CategoriesManager } from "./CategoriesManager";
export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { lessons: true, blogs: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">Manage content categories.</p>
      </div>
      <CategoriesManager categories={categories} />
    </div>
  );
}
