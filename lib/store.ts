import { create } from "zustand";

export type Task = {
  id: number;
  title: string;
  group: string;
  rhythm: string;
  status: string;
};

export type State = {
  tasks: Task[];
};

export type Actions = {
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, task: Task) => void;
  fetchTasks: () => Promise<void>;
};

export const useTaskStore = create<State & Actions>()((set) => ({
  tasks: [],

  addTask: async (taskData) => {
    try {
      const response = await fetch("/api/tasks", {
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
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? task : task)),
    })),

  //FETCH TASKS
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
}));
