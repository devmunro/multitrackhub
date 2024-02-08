import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface InputProps {
  onAddTask: (title: string) => void;
}

const InputTask: React.FC<InputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && title.trim()) {
      await onAddTask(title); 
      setTitle(""); 
    }
  };

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>
        <input
          className="border-2"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </TableCell>
    </TableRow>
  );
};

export default InputTask;
