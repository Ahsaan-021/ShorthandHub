"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Column } from "@/components/admin/DataTable";

interface DictEntry {
  id: string;
  word: string;
  pronunciation: string | null;
  meaning: string;
  outline: string | null;
  courseType: string;
}

interface DictionaryManagerProps {
  entries: DictEntry[];
}

export function DictionaryManager({ entries }: DictionaryManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: Column<DictEntry>[] = [
    { key: "word", header: "Word", sortable: true },
    { key: "pronunciation", header: "Pronunciation" },
    { key: "meaning", header: "Meaning" },
    { key: "courseType", header: "Course", sortable: true },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{entries.length} entries</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Dictionary Entry</DialogTitle>
            </DialogHeader>
            <DictForm onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={entries}
        searchKeys={["word", "meaning", "pronunciation"]}
      />
    </motion.div>
  );
}

function DictForm({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Word</Label>
          <Input placeholder="Word" />
        </div>
        <div>
          <Label>Pronunciation</Label>
          <Input placeholder="Pronunciation" />
        </div>
      </div>
      <div>
        <Label>Meaning</Label>
        <Textarea placeholder="Definition" />
      </div>
      <div>
        <Label>Shorthand Outline</Label>
        <Input placeholder="Outline notation" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Rule Explanation</Label>
          <Textarea placeholder="Rule explanation" />
        </div>
        <div>
          <Label>Course Type</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="PITMAN">Pitman</SelectItem>
              <SelectItem value="GREGG">Gregg</SelectItem>
              <SelectItem value="TEELINE">Teeline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Related Words (comma separated)</Label>
        <Input placeholder="word1, word2, word3" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onSuccess}>Cancel</Button>
        <Button onClick={onSuccess}>Save Entry</Button>
      </div>
    </div>
  );
}
