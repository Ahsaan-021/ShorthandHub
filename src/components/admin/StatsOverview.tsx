import { Users, BookOpen, FileText, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsOverviewProps {
  stats: {
    users: number;
    lessons: number;
    blogs: number;
    dictionary: number;
  };
  className?: string;
}

const STAT_CARDS = [
  { label: "Total Users", key: "users" as const, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Lessons", key: "lessons" as const, icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Total Blogs", key: "blogs" as const, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Dictionary Entries", key: "dictionary" as const, icon: BookMarked, color: "text-orange-500", bg: "bg-orange-500/10" },
] as const;

export function StatsOverview({ stats, className }: StatsOverviewProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {STAT_CARDS.map(({ label, key, icon: Icon, color, bg }) => (
        <div key={key} className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("p-2 rounded-lg", bg)}>
              <Icon className={cn("w-5 h-5", color)} />
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
          <div className="text-3xl font-bold tabular-nums">
            {stats[key].toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
