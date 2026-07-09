"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { lessons: number; blogs: number };
}

interface CategoriesManagerProps {
  categories: Category[];
}

export function CategoriesManager({ categories: initial }: CategoriesManagerProps) {
  const [categories, setCategories] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const openAdd = () => {
    setEditing(null);
    setName("");
    setSlug("");
    setDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!name.trim() || !slug.trim()) return;
    if (editing) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...c, name, slug } : c))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: crypto.randomUUID(), name, slug, _count: { lessons: 0, blogs: 0 } },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (cat: Category) => {
    if (cat._count.lessons > 0 || cat._count.blogs > 0) {
      alert("Cannot delete category with existing content.");
      return;
    }
    if (confirm(`Delete category "${cat.name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{categories.length} categories</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button onClick={openAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="category-slug" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Slug</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lessons</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Blogs</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{cat.slug}</td>
                <td className="px-4 py-3 text-sm">{cat._count.lessons}</td>
                <td className="px-4 py-3 text-sm">{cat._count.blogs}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
