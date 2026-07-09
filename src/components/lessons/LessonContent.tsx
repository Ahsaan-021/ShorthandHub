"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, PenLine, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type LessonContentProps = {
  lesson: {
    id: string
    title: string
    theory?: string | null
    rules?: string | null
    content: string
  }
  isCompleted?: boolean
  onMarkComplete?: () => void
}

const sectionVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export function LessonContent({ lesson, isCompleted, onMarkComplete }: LessonContentProps) {
  const hasTheory = !!lesson.theory
  const hasRules = !!lesson.rules

  const tabs = [
    ...(hasTheory ? [{ value: "theory", label: "Theory", icon: BookOpen }] : []),
    ...(hasRules ? [{ value: "rules", label: "Rules", icon: FileText }] : []),
    { value: "examples", label: "Examples", icon: PenLine },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue={tabs[0]?.value ?? "examples"}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="relative mt-4 min-h-[200px]">
          <AnimatePresence mode="wait">
            {hasTheory && (
              <TabContent key="theory" value="theory" content={lesson.theory!} />
            )}
            {hasRules && (
              <TabContent key="rules" value="rules" content={lesson.rules!} />
            )}
            <TabContent key="examples" value="examples" content={lesson.content} />
          </AnimatePresence>
        </div>
      </Tabs>

      <div className="flex items-center justify-center py-4">
        <svg
          viewBox="0 0 400 120"
          className="h-24 w-full max-w-md text-muted-foreground/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 60 Q60 20 100 60 T180 60 T260 60 T340 60" strokeLinecap="round" />
          <path d="M40 80 Q80 50 120 80 T200 80 T280 80 T360 80" strokeLinecap="round" opacity="0.5" />
          <circle cx="100" cy="60" r="4" />
          <circle cx="180" cy="60" r="4" />
          <circle cx="260" cy="60" r="4" />
        </svg>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          onClick={onMarkComplete}
          disabled={isCompleted}
          className={cn(isCompleted && "opacity-60")}
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          {isCompleted ? "Completed" : "Mark as Complete"}
        </Button>
      </div>
    </div>
  )
}

function TabContent({ value, content }: { value: string; content: string }) {
  return (
    <TabsContent value={value}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
            {content}
          </div>
        </motion.div>
      </AnimatePresence>
    </TabsContent>
  )
}
