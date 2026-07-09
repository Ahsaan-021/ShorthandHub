"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/lessons/LessonCard";
import type { Lesson } from "@/types";

interface PitmanCourseContentProps {
  lessons: Lesson[];
  whatYouLearn: string[];
}

export function PitmanCourseContent({ lessons, whatYouLearn }: PitmanCourseContentProps) {
  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Pitman Shorthand Course</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A comprehensive, step-by-step course to master Pitman shorthand from the
          ground up. Learn consonant strokes, vowel placement, advanced phrasing,
          and build speed through structured lessons and interactive exercises.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-6">What You&apos;ll Learn</h2>
          <ul className="space-y-3">
            {whatYouLearn.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-6 rounded-xl border bg-card p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Ready to Start?</h3>
          <p className="text-muted-foreground">
            Begin your journey with the first lesson. No prior experience required.
          </p>
          {lessons.length > 0 && (
            <Link href={`/courses/pitman/${lessons[0].slug}`}>
              <Button size="lg">
                Start First Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">Course Lessons</h2>
        {lessons.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <LessonCard
                  id={lesson.id}
                  title={lesson.title}
                  slug={lesson.slug}
                  description={lesson.description}
                  difficulty={lesson.difficulty}
                  courseType={lesson.courseType}
                  imageUrl={lesson.imageUrl}
                  progress={lesson.progress}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-12 text-center">
            <p className="text-muted-foreground">No lessons available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
