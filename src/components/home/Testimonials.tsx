"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { TESTIMONIALS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          What Our Learners Say
        </h2>

        <div className="relative mx-auto max-w-2xl">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={cn(
                "glass rounded-xl p-8 text-center transition-all duration-500",
                index === current ? "block" : "hidden"
              )}
            >
              <Quote className="mx-auto mb-4 h-8 w-8 text-primary/40" />
              <p className="mb-6 text-lg leading-relaxed italic text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {testimonial.avatar}
              </div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          ))}

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon-sm" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    index === current ? "bg-primary" : "bg-muted"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon-sm" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
