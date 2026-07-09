"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { cn, formatDate, formatReadingTime, truncate } from "@/lib/utils";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  authorName: string;
  createdAt: Date | string;
  readingTime: number;
  category?: { name: string; slug: string } | null;
  className?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  authorName,
  createdAt,
  readingTime,
  category,
  className,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/blog/${slug}`}
        className={cn(
          "group block rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all duration-200",
          className
        )}
      >
        {coverImage ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground/30">
              {title[0]}
            </span>
          </div>
        )}

        <div className="p-5">
          {category && (
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
              {category.name}
            </span>
          )}

          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {truncate(excerpt, 120)}
            </p>
          )}

          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {authorName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatReadingTime(readingTime)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
