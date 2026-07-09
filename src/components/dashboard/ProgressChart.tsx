"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  date: string;
  value: number;
}

interface ProgressChartProps {
  xpData?: DataPoint[];
  lessonData?: DataPoint[];
  className?: string;
}

export function ProgressChart({ xpData = [], lessonData = [], className }: ProgressChartProps) {
  const formattedXpData = useMemo(
    () => xpData.map((d) => ({ ...d, date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) })),
    [xpData]
  );

  const formattedLessonData = useMemo(
    () => lessonData.map((d) => ({ ...d, date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) })),
    [lessonData]
  );

  return (
    <div className={cn("space-y-8", className)}>
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">XP Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedXpData.length > 0 ? formattedXpData : [{ date: "No data", value: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs text-muted-foreground" />
            <YAxis className="text-xs text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Lessons Completed</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={formattedLessonData.length > 0 ? formattedLessonData : [{ date: "No data", value: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs text-muted-foreground" />
            <YAxis className="text-xs text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
