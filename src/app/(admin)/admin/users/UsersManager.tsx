"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DataTable } from "@/components/admin/DataTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Column } from "@/components/admin/DataTable";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

interface UsersManagerProps {
  users: User[];
}

export function UsersManager({ users }: UsersManagerProps) {
  const [userList, setUserList] = useState(users);

  const handleRoleChange = (userId: string, role: string) => {
    setUserList((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  };

  const handleDelete = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.email}?`)) {
      setUserList((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  const columns: Column<User>[] = [
    { key: "name", header: "Name", sortable: true, render: (item) => item.name ?? "—" },
    { key: "email", header: "Email", sortable: true },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (item) => (
        <Select value={item.role ?? "USER"} onValueChange={(v) => v && handleRoleChange(item.id, v)}>
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      header: "Joined",
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <DataTable
        columns={columns}
        data={userList}
        searchKeys={["name", "email"]}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
