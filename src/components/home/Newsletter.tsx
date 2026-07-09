"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = newsletterSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setSuccess(true)
    setEmail("")
  }

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="glass rounded-xl p-8 text-center md:p-12">
          <Mail className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            Stay Updated
          </h2>
          <p className="mb-6 text-muted-foreground">
            Get the latest lessons, tips, and shorthand resources delivered to
            your inbox.
          </p>

          {success ? (
            <p className="font-medium text-green-500">
              Thanks for subscribing!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(error && "border-red-500")}
              />
              <Button type="submit">Subscribe</Button>
            </form>
          )}

          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </section>
  )
}
