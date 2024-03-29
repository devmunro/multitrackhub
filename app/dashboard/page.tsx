"use client";
import { columns } from "@/components/layout/tasks/Columns";
import { DataTable } from "@/components/layout/tasks/DataTable";
import { useEffect } from "react";
import { useTaskStore } from "@/lib/store";
import { useSession, signOut } from "next-auth/react";

export default function TaskList() {
  const { tasks, fetchTasks } = useTaskStore();
  const { data: session } = useSession();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto py-10">
      {session && <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button> }

      <DataTable columns={columns as any} data={tasks} />
    </div>
  );
}
