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
};

export const useTaskStore = create<State & Actions>()((set) => ({
  tasks: [],

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? task : task)),
    })),
}));
