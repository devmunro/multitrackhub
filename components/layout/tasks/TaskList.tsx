"use client";
import { columns } from "./Columns";
import { DataTable } from "../../ui/DataTable";
import { useState, useEffect } from "react";
import taskData from "../../../data/taskDummyData.json";

// ...

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const fetchData = async () => {
    try {
      setTasks(taskData);
    } catch (error) {}
  };

  const handleAddTask = (title: string) => {
    const newTaskObject = {
      title: title,
      status: "",
      group: "Normal",
      rhythm: "",
    };
    console.log(newTaskObject);
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
    setNewTask("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tasks} onAddTask={handleAddTask} />
    </div>
  );
}
