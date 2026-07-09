import { db } from "@/lib/db";
import { DictionaryManager } from "./DictionaryManager";
export const dynamic = "force-dynamic";

export default async function AdminDictionaryPage() {
  const entries = await db.dictionary.findMany({ orderBy: { word: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dictionary</h1>
        <p className="text-muted-foreground mt-1">Manage dictionary entries.</p>
      </div>
      <DictionaryManager entries={entries} />
    </div>
  );
}
