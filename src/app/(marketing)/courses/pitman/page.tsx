import { generateMetadata } from "@/lib/seo";
import { getLessons } from "@/features/lessons/actions";
import { PitmanCourseContent } from "./PitmanCourseContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Pitman Shorthand Course",
  description: "Master Pitman shorthand with interactive lessons, stroke animations, and real practice exercises.",
  path: "/courses/pitman",
});

export default async function PitmanCoursePage() {
  const lessons = await getLessons("PITMAN");

  const whatYouLearn = [
    "Basic consonant strokes and their variations",
    "Vowel placement and attachment rules",
    "Hook strokes and circles",
    "Halving and doubling principles",
    "Prefixes and suffixes",
    "Speed building techniques",
    "Advanced phrasing and special contractions",
    "Real-world dictation practice",
  ];

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PitmanCourseContent lessons={lessons} whatYouLearn={whatYouLearn} />
      </div>
    </div>
  );
}
