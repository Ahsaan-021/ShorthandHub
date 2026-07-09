"use client";

import { Calendar, Clock, User, Tag } from "lucide-react";
import { cn, formatDate, formatReadingTime } from "@/lib/utils";
import { ShareButtons } from "./ShareButtons";

interface BlogContentProps {
  title: string;
  content: string;
  coverImage?: string | null;
  authorName: string;
  createdAt: Date | string;
  readingTime: number;
  category?: { name: string; slug: string } | null;
  tags?: string[];
  slug: string;
  className?: string;
}

export function BlogContent({
  title,
  content,
  coverImage,
  authorName,
  createdAt,
  readingTime,
  category,
  tags = [],
  slug,
  className,
}: BlogContentProps) {
  return (
    <article className={cn("max-w-3xl mx-auto", className)}>
      {category && (
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
          {category.name}
        </span>
      )}

      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          {authorName}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {formatDate(createdAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {formatReadingTime(readingTime)}
        </span>
      </div>

      {coverImage && (
        <div className="mt-8 rounded-xl overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <Tag className="w-4 h-4 text-muted-foreground" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="mt-8 prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="mt-12 pt-6 border-t">
        <ShareButtons title={title} slug={slug} />
      </div>
    </article>
  );
}
