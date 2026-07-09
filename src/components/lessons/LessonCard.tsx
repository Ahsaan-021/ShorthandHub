"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type ProgressData = {
  completed: boolean
  score: number | null
  accuracy: number | null
}

type LessonCardProps = {
  id: string
  title: string
  slug: string
  description: string
  difficulty: string
  courseType: string
  imageUrl?: string | null
  progress?: ProgressData[]
}

const difficultyStyles: Record<string, string> = {
  BEGINNER: "bg-green-500/10 text-green-500 border-green-500/20",
  INTERMEDIATE: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  ADVANCED: "bg-red-500/10 text-red-500 border-red-500/20",
}

export function LessonCard({
  id,
  title,
  slug,
  description,
  difficulty,
  courseType,
  imageUrl,
  progress,
}: LessonCardProps) {
  const lessonProgress = progress?.[0]
  const progressPercent = lessonProgress?.accuracy ?? 0

  return (
    <Link href={`/courses/${courseType.toLowerCase()}/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass group flex h-full flex-col rounded-xl border border-transparent transition-colors hover:border-primary/20"
      >
        <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-t-xl bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block rounded-full border px-3 py-1 text-xs font-medium",
                difficultyStyles[difficulty] ?? difficultyStyles.BEGINNER
              )}
            >
              {difficulty}
            </span>
          </div>

          <h3 className="mt-3 font-semibold">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="mt-auto pt-4">
            {lessonProgress?.completed && (
              <div className="mb-3">
                <Progress value={progressPercent}>
                  <ProgressTrack>
                    <ProgressIndicator />
                  </ProgressTrack>
                  <span className="ml-auto text-sm text-muted-foreground tabular-nums">{Math.round(progressPercent)}%</span>
                </Progress>
              </div>
            )}

            <Button
              variant={lessonProgress?.completed ? "outline" : "default"}
              className="w-full"
            >
              {lessonProgress?.completed ? "Review Lesson" : "Start Lesson"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
