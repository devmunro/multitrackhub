"use client";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useState, useEffect } from "react";
import taskData from "../../../data/taskDummyData.json";
import { ColumnDef } from "@tanstack/react-table";

interface Task {
  title: string;
  status: string;
  group: string;
  rhythm: string;
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

  const handleAddTask = async (taskData) => {
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
  
      // Optionally, fetch tasks again to refresh the list, or update the state directly
      // fetchData();
      setTasks((prevTasks) => [...prevTasks, taskData]); // Optimistic UI update
      setNewTask(""); // Assuming you have this state for resetting an input field
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
