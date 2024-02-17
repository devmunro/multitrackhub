import { create } from "zustand";

export type Task = {
  _id: string;
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
};

export const useTaskStore = create<State & Actions>()((set) => ({
  tasks: [],

  // ### FETCH TASKS ###
  fetchTasks: async () => {
    try {
      const response = await fetch("/api/getTasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      console.log(tasks, "task json");

      set({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },

  // ### ADD TASK ###
  addTask: async (taskData) => {
    try {
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

      // Update the state with the new task
      set((state) => ({
        tasks: [...state.tasks, taskData],
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  // ### REMOVE TASK ###
  removeTask: async (id) => {
    try {
      const response = await fetch("/api/deleteTask", {
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
}));
