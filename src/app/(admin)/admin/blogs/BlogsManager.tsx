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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  authorName: string;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  category: { name: string } | null;
}

interface BlogsManagerProps {
  posts: BlogPost[];
  categories: { id: string; name: string }[];
}

export function BlogsManager({ posts, categories }: BlogsManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: Column<BlogPost>[] = [
    { key: "title", header: "Title", sortable: true },
    { key: "authorName", header: "Author", sortable: true },
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
    {
      key: "featured",
      header: "Featured",
      render: (item) => (item.featured ? "Yes" : "No"),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{posts.length} posts</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Blog Post</DialogTitle>
            </DialogHeader>
            <BlogForm categories={categories} onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        searchKeys={["title", "slug", "authorName"]}
      />
    </motion.div>
  );
}

function BlogForm({ categories, onSuccess }: { categories: { id: string; name: string }[]; onSuccess: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input placeholder="Post title" />
        </div>
        <div>
          <Label>Slug</Label>
          <Input placeholder="post-slug" />
        </div>
      </div>
      <div>
        <Label>Excerpt</Label>
        <Textarea placeholder="Brief excerpt" />
      </div>
      <div>
        <Label>Content</Label>
        <Textarea placeholder="Post content (HTML)" className="min-h-[200px]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Author Name</Label>
          <Input placeholder="Author" />
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
      <div>
        <Label>Cover Image URL</Label>
        <Input placeholder="https://example.com/image.jpg" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onSuccess}>Cancel</Button>
        <Button onClick={onSuccess}>Save Post</Button>
      </div>
    </div>
  );
}
