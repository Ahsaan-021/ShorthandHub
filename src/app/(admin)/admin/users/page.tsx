import { db } from "@/lib/db";
import { UsersManager } from "./UsersManager";
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">Manage user accounts and roles.</p>
      </div>
      <UsersManager users={users} />
    </div>
  );
}
