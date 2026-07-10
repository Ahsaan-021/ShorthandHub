import { generateMetadata } from "@/lib/seo";
import { searchDictionary } from "@/features/dictionary/actions";
import { DictionaryPageContent } from "./DictionaryPageContent";
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Shorthand Dictionary - Instant Stroke Generator",
  description: "Type any word to see its Pitman shorthand stroke outline, pronunciation, and rule explanation. Automatic outline generation for any English word.",
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