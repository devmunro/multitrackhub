"use client";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect } from "react";
import { useTaskStore } from "@/lib/store";
import { Task } from "@/lib/store";

export default function TaskList() {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns as any} data={tasks} />
    </div>
  );
}
