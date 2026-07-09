"use client";

import { motion } from "framer-motion";

interface RecentUsersProps {
  users: { id: string; name: string | null; email: string; role: string; createdAt: Date }[];
}

export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
      {users.length > 0 ? (
        <div className="space-y-3">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <div className="text-sm font-medium">{user.name ?? "Unknown"}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
                  {user.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-8 text-center">No users yet.</p>
      )}
    </div>
  );
}
