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

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  courseType: string;
  lessonType: string;
  order: number;
  published: boolean;
  category: { name: string } | null;
}

interface LessonsManagerProps {
  lessons: Lesson[];
  categories: { id: string; name: string }[];
}

export function LessonsManager({ lessons, categories }: LessonsManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: Column<Lesson>[] = [
    { key: "title", header: "Title", sortable: true },
    { key: "difficulty", header: "Difficulty", sortable: true },
    { key: "courseType", header: "Course", sortable: true },
    {
      key: "category",
      header: "Category",
      render: (item) => item.category?.name ?? "-",
    },
    {
      key: "published",
      header: "Status",
      render: (item) => (item.published ? "Published" : "Draft"),
    },
    { key: "order", header: "Order", sortable: true },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{lessons.length} lessons</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lesson</DialogTitle>
            </DialogHeader>
            <LessonForm categories={categories} onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={lessons}
        searchKeys={["title", "slug", "description"]}
      />
    </motion.div>
  );
}

function LessonForm({ categories, onSuccess }: { categories: { id: string; name: string }[]; onSuccess: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input placeholder="Lesson title" />
        </div>
        <div>
          <Label>Slug</Label>
          <Input placeholder="lesson-slug" />
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea placeholder="Brief description of the lesson" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Difficulty</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
            </SelectContent>
          </Select>
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Lesson Type</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="THEORY">Theory</SelectItem>
              <SelectItem value="EXERCISE">Exercise</SelectItem>
              <SelectItem value="QUIZ">Quiz</SelectItem>
              <SelectItem value="PRACTICE">Practice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Order</Label>
          <Input type="number" placeholder="1" />
        </div>
        <div>
          <Label>XP Reward</Label>
          <Input type="number" placeholder="100" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onSuccess}>Cancel</Button>
        <Button onClick={onSuccess}>Save Lesson</Button>
      </div>
    </div>
  );
}
