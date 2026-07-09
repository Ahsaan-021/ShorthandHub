import { generateMetadata } from "@/lib/seo";
import { APP_NAME, STATISTICS } from "@/lib/constants";
import { AboutContent } from "./AboutContent";

export const metadata = generateMetadata({
  title: "About",
  description: `Learn about ${APP_NAME}'s mission to make shorthand learning accessible to everyone.`,
  path: "/about",
});

export default function AboutPage() {
  const team = [
    { name: "Alex Rivera", role: "Founder & Lead Instructor", avatar: "AR" },
    { name: "Priya Sharma", role: "Curriculum Designer", avatar: "PS" },
    { name: "James Chen", role: "Full-Stack Developer", avatar: "JC" },
    { name: "Emma Wilson", role: "Content Creator", avatar: "EW" },
  ];

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <AboutContent team={team} />
      </div>
    </div>
  );
}
