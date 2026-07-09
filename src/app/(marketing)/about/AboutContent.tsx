"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Heart, Lightbulb } from "lucide-react";
import { STATISTICS } from "@/lib/constants";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface AboutContentProps {
  team: TeamMember[];
}

const values = [
  { icon: BookOpen, title: "Education First", description: "Every feature is designed with learning outcomes in mind." },
  { icon: Target, title: "Accessibility", description: "Quality shorthand education should be available to everyone." },
  { icon: Heart, title: "Community", description: "Building a supportive community of shorthand learners worldwide." },
  { icon: Lightbulb, title: "Innovation", description: "Using modern technology to make learning engaging and effective." },
];

export function AboutContent({ team }: AboutContentProps) {
  return (
    <div className="space-y-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We believe shorthand is a superpower. Our mission is to make learning
          Pitman, Gregg, and Teeline shorthand accessible, engaging, and effective
          for everyone — from aspiring court reporters to curious hobbyists.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATISTICS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl border bg-card p-6 text-center"
          >
            <div className="text-3xl font-bold gradient-text">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-4">Our Story</h2>
        <div className="max-w-3xl mx-auto text-muted-foreground space-y-4 leading-relaxed">
          <p>
            ShorthandHub was born from a simple observation: while thousands of
            people want to learn shorthand every year, traditional resources are
            outdated, scattered, and hard to follow.
          </p>
          <p>
            Our founder, Alex Rivera, learned Pitman shorthand from a 1970s
            textbook and wondered why there wasn&apos;t a modern, interactive way
            to learn. So he built one.
          </p>
          <p>
            Today, ShorthandHub serves thousands of learners across the globe,
            offering structured courses in Pitman, Gregg, and Teeline with
            interactive exercises, AI-powered feedback, and a comprehensive
            dictionary.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {member.avatar}
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
