export const APP_NAME = "ShorthandHub";
export const APP_DESCRIPTION =
  "Master Pitman, Gregg and Teeline shorthand with interactive lessons, AI explanations, quizzes and real practice.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses/pitman", label: "Pitman Course" },
  { href: "/courses/gregg", label: "Gregg (Coming Soon)" },
  { href: "/courses/teeline", label: "Teeline (Coming Soon)" },
  { href: "/dictionary", label: "Dictionary" },
  { href: "/practice", label: "Practice" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const FEATURES = [
  {
    title: "Interactive Lessons",
    description:
      "Step-by-step lessons with stroke animations, theory explanations, and real-time practice exercises.",
    icon: "BookOpen",
  },
  {
    title: "AI-Powered Learning",
    description:
      "Get instant explanations, personalized recommendations, and mistake analysis (coming soon).",
    icon: "Brain",
  },
  {
    title: "Progress Tracking",
    description:
      "Track your XP, streaks, accuracy, and speed with detailed analytics and achievements.",
    icon: "TrendingUp",
  },
  {
    title: "Practice Mode",
    description:
      "Timed practice, dictation exercises, and daily challenges to build muscle memory.",
    icon: "Timer",
  },
  {
    title: "Dictionary",
    description:
      "Search thousands of words with Pitman outlines, pronunciations, and rule explanations.",
    icon: "BookMarked",
  },
  {
    title: "Multiple Systems",
    description:
      "Learn Pitman, Gregg, and Teeline — all in one platform with consistent teaching methodology.",
    icon: "Layers",
  },
] as const;

export const STATISTICS = [
  { label: "Active Learners", value: "10,000+", suffix: "" },
  { label: "Lessons Created", value: "500+", suffix: "" },
  { label: "Dictionary Words", value: "50,000+", suffix: "" },
  { label: "Learning Hours", value: "100,000+", suffix: "" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Court Reporter",
    avatar: "SJ",
    content:
      "ShorthandHub transformed my learning. I went from zero to 100 WPM in just 3 months. The interactive lessons are incredible.",
  },
  {
    name: "Mark Thompson",
    role: "Journalist",
    avatar: "MT",
    content:
      "The stroke animations and practice exercises make Pitman shorthand actually fun to learn. Highly recommended for anyone in journalism.",
  },
  {
    name: "Emily Chen",
    role: "Medical Transcriber",
    avatar: "EC",
    content:
      "I've tried every shorthand course out there. Nothing comes close to the quality and depth of ShorthandHub's curriculum.",
  },
] as const;

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export const COURSE_TYPES = ["pitman", "gregg", "teeline"] as const;

export const XP_PER_LESSON = 100;
export const XP_STREAK_BONUS = 50;
export const XP_QUIZ_PERFECT = 200;
export const STREAK_DAYS_FOR_BONUS = 7;