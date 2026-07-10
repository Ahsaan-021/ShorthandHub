"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-80 w-80 animate-float rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 animate-float rounded-full bg-indigo-500/20 blur-3xl [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-blue-500/10 blur-3xl [animation-delay:3s]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row"
      >
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
          <motion.h1
            variants={itemVariants}
            className="gradient-text text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Learn Shorthand Faster Than Ever
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg text-muted-foreground"
          >
            Master Pitman, Gregg and Teeline with interactive lessons, AI
            explanations, quizzes and real practice.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg">Start Learning</Button>
            <Button variant="outline" size="lg">
              Browse Courses
            </Button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex-1">
          <div className="glass overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
              alt="Student learning with notebook and pen"
              className="h-full w-full object-cover aspect-square"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
