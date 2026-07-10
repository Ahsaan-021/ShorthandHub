import { generateMetadata } from "@/lib/seo";
import { searchDictionary } from "@/features/dictionary/actions";
import { DictionaryPageContent } from "./DictionaryPageContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Dictionary",
  description: "Search thousands of shorthand words with Pitman, Gregg, and Teeline outlines, pronunciations, and rule explanations.",
  path: "/dictionary",
});

export default async function DictionaryPage() {
  const initialEntries = await searchDictionary("");

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <DictionaryPageContent initialEntries={initialEntries} />
      </div>
    </div>
  );
}