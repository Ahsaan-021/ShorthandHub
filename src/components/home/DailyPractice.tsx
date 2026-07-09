"use client"

import { motion } from "framer-motion"
import { Flame, Zap, Clock, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DailyPractice() {
  const today = new Date()
  const streak = 7
  const completion = 65
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (completion / 100) * circumference

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          Daily Practice
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto max-w-md rounded-xl p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">{streak} day streak</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <svg
                className="h-28 w-28 -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  className="text-muted"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-2xl font-bold">{completion}%</span>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <Zap className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Exercises</p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xl font-bold">15m</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
            <div className="text-center">
              <Trophy className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xl font-bold">250</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>

          <Button className="w-full">Start Daily Challenge</Button>
        </motion.div>
      </div>
    </section>
  )
}
