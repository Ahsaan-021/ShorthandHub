import { db } from "@/lib/db";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { QuickActions } from "./QuickActions";
import { RecentUsers } from "./RecentUsers";
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [users, lessons, blogs, dictionary, recentUsers] = await Promise.all([
    db.user.count(),
    db.lesson.count(),
    db.blog.count(),
    db.dictionary.count(),
    db.user.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your ShorthandHub platform.</p>
      </div>

      <StatsOverview stats={{ users, lessons, blogs, dictionary }} />

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentUsers users={recentUsers} />
        <QuickActions />
      </div>
    </div>
  );
}
