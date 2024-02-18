import { create } from "zustand";

export type Task = {
  _id?: string;
  title: string;
  group: string;
  rhythm: string;
  status: string;
};

export type State = {
  tasks: Task[];
};


export type Actions = {
  addTask: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
};

export const useTaskStore = create<State & Actions>()((set, get) => ({
    tasks: [],

  // ### FETCH TASKS ###
  fetchTasks: async () => {
    try {
      const response = await fetch("/api/getTasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },

  // ### ADD TASK ###
  addTask: async (taskData) => {
    try {
      console.log(taskData);
      const response = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      //get latest task
      const newTask = await response.json();
      console.log(newTask.task, "new task");

      // Update the state with the new task
      set((state) => ({
        tasks: [...state.tasks, newTask.task],
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  // ### REMOVE TASK ###
  removeTask: async (id) => {
    try {
      const response = await fetch(`/api/deleteTask?id=${id}`, {
        method: "Delete",

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove task");
      }

      // Update the state by filtering out the task to remove
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  },

  // ### UPDATE TASK ###
  updateTask: async (updatedTask) => {
    try {
        console.log(updatedTask, "updated task")
      const response = await fetch("/api/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // Update the local state with the updated task
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        ),
      }));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },
}));
