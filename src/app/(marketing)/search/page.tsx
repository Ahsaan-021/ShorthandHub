import { generateMetadata } from "@/lib/seo";
import { SearchPageContent } from "./SearchPageContent";

export const metadata = generateMetadata({
  title: "Search",
  description: "Search lessons, dictionary entries, and blog posts.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SearchPageContent />
      </div>
    </div>
  );
}
