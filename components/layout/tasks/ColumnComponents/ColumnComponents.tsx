import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTaskStore } from "@/lib/store";
import { AlarmClockCheck, AlarmClockOff, AlarmClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const GroupLabels = ({ selection }: { selection: string }) => {
  return (
    <Select value={selection} defaultValue={selection || "Learning"}>
      <SelectTrigger className="border-0 w-min">
        <Badge variant="outline">
          <SelectValue>{selection}</SelectValue>
        </Badge>
      </SelectTrigger>
      <SelectContent className="border-0" defaultChecked>
        <SelectItem value="Health">
          <Badge variant="outline">Health</Badge>
        </SelectItem>
        <SelectItem value="Projects">
          <Badge variant="outline">Projects</Badge>
        </SelectItem>
        <SelectItem value="Intern">
          <Badge variant="outline">Intern</Badge>
        </SelectItem>
        <SelectItem value="Learning">
          <Badge variant="outline">Learning</Badge>
        </SelectItem>
        <SelectItem value="Education">
          <Badge variant="outline">Education</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export const RhythmLabels = ({
  selection,
  taskId,
}: {
  selection: string;
  taskId: string;
}) => {
  const [rhythm, setRhythm] = useState(selection);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onChange = async (value: string) => {
    setRhythm(value);
    await updateTask({ _id: taskId, rhythm: value });
  };
  return (
    <Select
      value={rhythm}
      onValueChange={onChange}
      defaultValue={rhythm || "Normal"}
    >
      <SelectTrigger className="border-0 w-min">
        <Badge variant="outline">
          <SelectValue>{rhythm}</SelectValue>
        </Badge>
      </SelectTrigger>
      <SelectContent defaultChecked>
        <SelectItem value="Flow">
          <Badge>Flow</Badge>
        </SelectItem>
        <SelectItem value="Normal">
          <Badge>Normal</Badge>
        </SelectItem>
        <SelectItem value="Focus">
          <Badge>Focus</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export const StatusLabels = ({
  selection,
  taskId,
}: {
  selection: string;
  taskId: string;
}) => {
  const [status, setStatus] = useState(selection);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onChange = async (value: string) => {
    setStatus(value);
    await updateTask({ _id: taskId, status: value });
  };

  return (
    <div className="w-1/2 flex space-x-4 items-center">
      <Select
        value={status}
        onValueChange={onChange}
        defaultValue={status || "Not Started"}
      >
        <SelectTrigger>
          <SelectValue>{status}</SelectValue>
        </SelectTrigger>
        <SelectContent defaultChecked>
          <SelectItem value="Not Started">
            <div className="flex space-x-4 items-center">
              <AlarmClockOff size={20} />
              <span>Not Started</span>
            </div>
          </SelectItem>
          <SelectItem value="Started">
            <div className="flex space-x-4 items-center">
              <AlarmClock size={20} />
              <span>Started</span>
            </div>
          </SelectItem>
          <SelectItem value="Finished">
            <div className="flex space-x-4 items-center">
              <AlarmClockCheck size={20} />
              <span>Finished</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const DeleteButton = ({ taskId }: { taskId: string }) => {
  const removeTask = useTaskStore((state) => state.removeTask);
  const handleDelete = async () => {
    await removeTask(taskId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Label</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
