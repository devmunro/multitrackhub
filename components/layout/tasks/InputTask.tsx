import { KeyboardEvent, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  GroupLabels,
  RhythmLabels,
  StatusLabels,
} from "./ColumnComponents/ColumnComponents";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task, useTaskStore } from "@/lib/store";

interface InputProps {
  toggleAddTask: () => void;
}

const InputTask: React.FC<InputProps> = ({ toggleAddTask }) => {
  const [taskData, setTaskData] = useState<Task>({
    id: Date.now(),
    title: "",
    group: "Learning",
    rhythm: "Normal",
    status: "Not Started",
  });

  const addTask = useTaskStore((state) => state.addTask);

  const handleChange = (value: string, field: keyof Task) => {
    setTaskData((prev: Task) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskData.title.trim()) {
      event.preventDefault();
      await addTask(taskData);
      toggleAddTask();
    }
  };

  const handleAddTask = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (taskData.title.trim()) {
      await addTask(taskData);
      toggleAddTask();
    }
  };

  return (
    <TableRow className="text-xs disabled:hover ">
      <TableCell></TableCell>
      <TableCell className="flex space-x-2">
        <GroupLabels
          selection={taskData.group}
          onChange={(value: string) => handleChange(value, "group")}
        />
        <input
          className="border-2"
          type="text"
          placeholder="Enter title"
          value={taskData.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          onKeyDown={handleKeyDown}
          required
        />
      </TableCell>
      <TableCell>
        <RhythmLabels
          selection={taskData.rhythm}
          onChange={(value: string) => handleChange(value, "rhythm")}
        />
      </TableCell>
      <TableCell>
        <StatusLabels
          selection={taskData.status}
          onChange={(value: string) => handleChange(value, "status")}
        />
      </TableCell>
      <TableCell>
        <Button variant={"outline"} onClick={handleAddTask}>
          <PlusCircleIcon />{" "}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InputTask;
