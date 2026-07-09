import { generateMetadata } from "@/lib/seo";
import { DictionaryPageContent } from "./DictionaryPageContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Dictionary",
  description: "Search thousands of shorthand words with outlines, pronunciations, and rule explanations.",
  path: "/dictionary",
});

export default function DictionaryPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <DictionaryPageContent />
      </div>
    </div>
  );
}
