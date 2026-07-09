"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Brain,
  TrendingUp,
  Timer,
  BookMarked,
  Layers,
  type LucideIcon,
} from "lucide-react"
import { FEATURES } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  TrendingUp,
  Timer,
  BookMarked,
  Layers,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need to Master Shorthand
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Comprehensive tools and features designed to take you from beginner
            to expert shorthand writer.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
