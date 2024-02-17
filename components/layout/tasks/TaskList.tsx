"use client";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useState, useEffect } from "react";

interface Task {
  title: string;
  group: string;
  rhythm: string;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch('/api/getTasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json(); 
      console.log(tasks)
      setTasks(tasks); 
    } catch (error) {
      console.error(error);
    }
  };

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

      setTasks((prevTasks) => [...prevTasks, taskData]); 
      setNewTask(""); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
