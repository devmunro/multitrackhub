"use client";
import { columns } from "./Columns"
import { DataTable } from "../../ui/DataTable"
import { useState, useEffect } from "react";
import taskData from "../../../data/taskDummyData.json";

// ...

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchData = async () => {
         try {
            setTasks(taskData);
         } catch (error) {
         }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tasks} />
        </div>
    );
}

