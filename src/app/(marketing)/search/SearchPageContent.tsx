"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, BookMarked, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { LessonCard } from "@/components/lessons/LessonCard";
import { WordCard } from "@/components/dictionary/WordCard";
import { BlogCard } from "@/components/blog/BlogCard";

interface SearchResult {
  lessons: any[];
  dictionary: any[];
  blog: any[];
}

const tabs = [
  { id: "all", label: "All", icon: Search },
  { id: "lessons", label: "Lessons", icon: BookOpen },
  { id: "dictionary", label: "Dictionary", icon: BookMarked },
  { id: "blog", label: "Blog", icon: FileText },
] as const;

export function SearchPageContent() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [results, setResults] = useState<SearchResult>({ lessons: [], dictionary: [], blog: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ lessons: [], dictionary: [], blog: [] });
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const [dictRes] = await Promise.all([
          fetch(`/api/dictionary?q=${encodeURIComponent(query)}`),
        ]);
        const dictData = await dictRes.json();
        setResults({ lessons: [], dictionary: dictData, blog: [] });
      } catch {
        setResults({ lessons: [], dictionary: [], blog: [] });
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredLessons = activeTab === "all" || activeTab === "lessons" ? results.lessons : [];
  const filteredDictionary = activeTab === "all" || activeTab === "dictionary" ? results.dictionary : [];
  const filteredBlog = activeTab === "all" || activeTab === "blog" ? results.blog : [];

  const hasResults = filteredLessons.length > 0 || filteredDictionary.length > 0 || filteredBlog.length > 0;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Search</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, dictionary, blog..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>
      </motion.div>

      {query && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex gap-1 mb-8 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm rounded-full font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Searching...</div>
          ) : hasResults ? (
            <div className="space-y-12">
              {(activeTab === "all" || activeTab === "lessons") && filteredLessons.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" /> Lessons
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredLessons.map((lesson: any) => (
                      <LessonCard key={lesson.id} {...lesson} />
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === "all" || activeTab === "dictionary") && filteredDictionary.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookMarked className="h-5 w-5" /> Dictionary
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredDictionary.map((entry: any) => (
                      <WordCard
                        key={entry.id}
                        word={entry.word}
                        pronunciation={entry.pronunciation}
                        meaning={entry.meaning}
                        outline={entry.outline}
                        rule={entry.rule}
                        relatedWords={entry.relatedWords}
                      />
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === "all" || activeTab === "blog") && filteredBlog.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" /> Blog
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBlog.map((post: any) => (
                      <BlogCard key={post.id} {...post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
