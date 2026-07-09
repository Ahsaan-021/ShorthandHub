"use client";

import { motion } from "framer-motion";
import { BookOpen, Flame, Target, Zap, Brain, Bookmark } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { StreakDisplay } from "@/components/dashboard/StreakDisplay";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { AchievementCard } from "@/components/dashboard/AchievementCard";
import { LessonCard } from "@/components/lessons/LessonCard";

interface DashboardContentProps {
  user: { name: string | null; email: string; image: string | null };
  stats: {
    totalLessons: number;
    completedLessons: number;
    currentStreak: number;
    totalXP: number;
    averageAccuracy: number;
    averageWPM: number;
    achievements: number;
  };
  progress: Record<string, unknown>[];
  practiceSessions: Record<string, unknown>[];
  achievements: Record<string, unknown>[];
  bookmarks: Record<string, unknown>[];
}

export function DashboardContent({
  user,
  stats,
  progress,
  practiceSessions,
  achievements,
  bookmarks,
}: DashboardContentProps) {
  const xpData = progress
    .filter((p: any) => p.completedAt)
    .map((p: any) => ({
      date: p.completedAt,
      value: 100,
    }))
    .slice(-30);

  const lessonData = progress
    .filter((p: any) => p.completedAt)
    .map((p: any) => ({
      date: p.completedAt,
      value: 1,
    }))
    .slice(-30);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border bg-gradient-to-r from-primary/5 to-transparent p-8"
      >
        <h1 className="text-3xl font-bold">
          Welcome back{user.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Keep practicing to improve your shorthand skills.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <StatsCard icon={BookOpen} label="Completed" value={stats.completedLessons} />
        <StatsCard icon={Flame} label="Streak" value={stats.currentStreak} suffix=" days" />
        <StatsCard icon={Zap} label="XP" value={stats.totalXP} />
        <StatsCard icon={Target} label="Accuracy" value={Math.round(stats.averageAccuracy)} suffix="%" />
        <StatsCard icon={Brain} label="WPM" value={Math.round(stats.averageWPM)} />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <ProgressChart xpData={xpData} lessonData={lessonData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <StreakDisplay currentStreak={stats.currentStreak} bestStreak={Math.max(stats.currentStreak, 7)} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {progress.length > 0 ? (
          <div className="rounded-xl border bg-card divide-y">
            {progress.slice(0, 10).map((p: any) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <span className="font-medium">{p.lesson?.title ?? "Unknown Lesson"}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {p.completed ? "✓ Completed" : "In progress"}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {p.accuracy ? `${Math.round(p.accuracy)}%` : "-"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            No activity yet. Start a lesson to track your progress!
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        {achievements.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ua: any) => (
              <AchievementCard
                key={ua.id}
                icon={ua.achievement.icon}
                title={ua.achievement.title}
                description={ua.achievement.description}
                xpReward={ua.achievement.xpReward}
                unlocked={true}
                unlockedAt={ua.createdAt?.toISOString()}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            Complete lessons to earn achievements!
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Recent Lessons
        </h2>
        {bookmarks.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((lesson: any) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                slug={lesson.slug}
                description={lesson.description}
                difficulty={lesson.difficulty}
                courseType={lesson.courseType}
                imageUrl={lesson.imageUrl}
                progress={lesson.progress}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            No lessons yet. Start learning!
          </div>
        )}
      </motion.div>
    </div>
  );
}
