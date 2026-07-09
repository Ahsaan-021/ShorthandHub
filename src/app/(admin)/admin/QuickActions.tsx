"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FileText, BookMarked, Users, FolderTree, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { href: "/admin/lessons", label: "New Lesson", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
  { href: "/admin/blogs", label: "New Blog Post", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
  { href: "/admin/dictionary", label: "Add Dictionary Entry", icon: BookMarked, color: "text-orange-500", bg: "bg-orange-500/10" },
  { href: "/admin/users", label: "Manage Users", icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
  { href: "/admin/categories", label: "Manage Categories", icon: FolderTree, color: "text-pink-500", bg: "bg-pink-500/10" },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={action.href}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors hover:bg-muted/50",
                )}
              >
                <div className={cn("p-2 rounded-lg", action.bg)}>
                  <Icon className={cn("w-5 h-5", action.color)} />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
