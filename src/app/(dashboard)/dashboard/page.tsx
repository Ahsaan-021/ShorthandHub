import { generateMetadata } from "@/lib/seo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserStats, getUserProgress } from "@/features/progress/actions";
import { getPracticeSessions } from "@/features/practice/actions";
import { db } from "@/lib/db";
import { DashboardContent } from "./DashboardContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "Your shorthand learning dashboard.",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const [statsResult, progress, practiceSessions, achievements, bookmarks] = await Promise.all([
    getUserStats(),
    getUserProgress(),
    getPracticeSessions(session.user.id),
    db.userAchievement.findMany({
      where: { userId: session.user.id },
      include: { achievement: true },
    }),
    db.lesson.findMany({
      where: { progress: { some: { userId: session.user.id, completed: true } } },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = statsResult ?? {
    totalLessons: 0,
    completedLessons: 0,
    currentStreak: 0,
    totalXP: 0,
    averageAccuracy: 0,
    averageWPM: 0,
    achievements: 0,
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <DashboardContent
          user={{ name: session.user.name ?? null, email: session.user.email ?? "", image: session.user.image ?? null }}
          stats={stats}
          progress={progress ?? []}
          practiceSessions={practiceSessions}
          achievements={achievements}
          bookmarks={bookmarks}
        />
      </div>
    </div>
  );
}
