"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { getDifficultyBadgeColor } from "@/lib/utils"

type Lesson = {
  id: string
  title: string
  difficulty: string
  description: string
}

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Pitman Consonants",
    difficulty: "beginner",
    description:
      "Learn the basic consonant strokes in Pitman shorthand — the foundation of the system.",
  },
  {
    id: "2",
    title: "Gregg Brief Forms",
    difficulty: "intermediate",
    description:
      "Master common brief forms used in Gregg shorthand to write faster with fewer strokes.",
  },
  {
    id: "3",
    title: "Teeline Theory",
    difficulty: "intermediate",
    description:
      "Understand the core theory behind Teeline shorthand and how it simplifies writing.",
  },
  {
    id: "4",
    title: "Pitman Vowels",
    difficulty: "beginner",
    description:
      "Learn vowel placement and attachment rules in Pitman shorthand outlines.",
  },
  {
    id: "5",
    title: "Speed Building",
    difficulty: "advanced",
    description:
      "Advanced techniques to increase your shorthand writing speed to 80+ WPM.",
  },
  {
    id: "6",
    title: "Dictation Practice",
    difficulty: "advanced",
    description:
      "Real-world dictation exercises for all three shorthand systems at various speeds.",
  },
]

export function PopularLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLessons(mockLessons)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          Popular Lessons
        </h2>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[280px] flex-1 space-y-3 rounded-xl border p-6"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
          >
            <CarouselContent>
              {lessons.map((lesson) => (
                <CarouselItem
                  key={lesson.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="glass flex h-full flex-col justify-between rounded-xl p-6">
                    <div>
                      <span
                        className={cn(
                          "inline-block rounded-full border px-3 py-1 text-xs font-medium",
                          getDifficultyBadgeColor(lesson.difficulty)
                        )}
                      >
                        {lesson.difficulty}
                      </span>
                      <h3 className="mt-3 font-semibold">{lesson.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="mt-4 w-fit p-0"
                    >
                      Start Lesson
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  )
}
