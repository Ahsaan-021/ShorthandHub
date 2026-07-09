import { generateMetadata } from "@/lib/seo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPracticeSessions } from "@/features/practice/actions";
import { DashboardPracticeContent } from "./DashboardPracticeContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Practice",
  description: "Practice sessions and history.",
  path: "/dashboard/practice",
});

export default async function DashboardPracticePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const sessions = await getPracticeSessions(session.user.id);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <DashboardPracticeContent sessions={sessions} />
      </div>
    </div>
  );
}
