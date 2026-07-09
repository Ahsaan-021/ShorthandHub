export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  courseType: "PITMAN" | "GREGG" | "TEELINE";
  lessonType: "THEORY" | "EXERCISE" | "QUIZ" | "PRACTICE";
  order: number;
  xpReward: number;
  published: boolean;
  imageUrl: string | null;
  categoryId: string | null;
  category: Category | null;
  progress: Progress[];
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number | null;
  accuracy: number | null;
  completedAt: Date | null;
}

export interface Quiz {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correct: number;
  order: number;
}

export interface Exercise {
  id: string;
  lessonId: string;
  question: string;
  answer: string;
  hint: string | null;
  order: number;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  pronunciation: string | null;
  meaning: string;
  outline: string | null;
  rule: string | null;
  courseType: "PITMAN" | "GREGG" | "TEELINE";
  relatedWords: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  readingTime: number;
  published: boolean;
  featured: boolean;
  authorName: string;
  tags: string[];
  category: Category | null;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
}

export interface PracticeSessionData {
  id: string;
  type: "TIMED" | "DICTATION" | "TYPING" | "DAILY" | "CHALLENGE";
  duration: number;
  wpm: number | null;
  accuracy: number | null;
  mistakes: number | null;
  createdAt: Date;
}

export interface Stats {
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  totalXP: number;
  averageAccuracy: number;
  averageWPM: number;
  achievements: number;
}

export interface DashboardData {
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };
  stats: Stats;
  recentActivity: Progress[];
  practiceSessions: PracticeSessionData[];
  achievements: Achievement[];
  bookmarks: Lesson[];
}