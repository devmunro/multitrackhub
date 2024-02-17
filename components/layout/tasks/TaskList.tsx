"use client";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect } from "react";
import { useTaskStore } from "@/lib/store";
import { Task } from "@/lib/store";



export default function TaskList() {
  const { tasks, addTask, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);

  const handleAddTask = async (taskData: Task) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      addTask(taskData); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns as any}
        data={tasks}
        onAddTask={handleAddTask as any}
      />
    </div>
  );
}
