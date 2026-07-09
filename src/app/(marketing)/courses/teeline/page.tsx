"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Construction, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeelineComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-muted"
        >
          <Construction className="h-16 w-16 text-muted-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 text-4xl font-bold"
        >
          Teeline Shorthand Course
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 text-lg text-muted-foreground"
        >
          We&apos;re building a comprehensive Teeline shorthand course with
          interactive lessons, stroke animations, and practice exercises. Coming soon!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-8 text-sm text-muted-foreground"
        >
          <Clock className="h-4 w-4" />
          <span>Estimated launch: Q1 2027</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {submitted ? (
            <p className="text-primary font-medium">Thanks! We&apos;ll notify you when the course launches.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <Button type="submit">Notify Me</Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
