import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  GroupLabels,
  RhythmLabels,
  StatusLabels,
} from "./ColumnComponents/ColumnComponents";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InputProps {
  onAddTask: (title: string) => void;
}

const InputTask: React.FC<InputProps> = ({ onAddTask, toggleAddTask }) => {
  const [taskData, setTaskData] = useState<TaskData>([
    {
      title: "",
      group: "",
      rhythm: "",
      status: "",
    },
  ]);

  const handleChange = (value: string, field: keyof TaskData) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskData.title.trim()) {
      event.preventDefault();
      await onAddTask(taskData);
      toggleAddTask();
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
  
    // Check if title is not empty or contains only whitespace characters
    if (!taskData.title.trim()) {
      // If title is empty or contains only whitespace characters, return early
      return;
    }
  
    // If title is not empty, proceed to add the task
    await onAddTask(taskData);
    toggleAddTask();
  };
  return (
    <TableRow className="text-xs disabled:hover ">
      <TableCell></TableCell>
      <TableCell className="flex space-x-2">
        <GroupLabels
          selected={taskData.group}
          onChange={(value) => handleChange(value, "group")}
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
          selected={taskData.rhythm}
          onChange={(value) => handleChange(value, "rhythm")}
        />
      </TableCell>
      <TableCell>
        <StatusLabels
          selected={taskData.status}
          onChange={(value) => handleChange(value, "status")}
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
