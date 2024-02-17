import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskStore } from "@/lib/store";
import { AlarmClockCheck, AlarmClockOff, AlarmClock } from "lucide-react";

export const GroupLabels = ({
  selection,
  onChange,
}: {
  selection: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select
      value={selection}
      onValueChange={onChange}
      defaultValue={selection || "Learning"}
    >
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
  onChange,
}: {
  selection: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select
      value={selection}
      onValueChange={onChange}
      defaultValue={selection || "Normal"}
    >
      <SelectTrigger>
        <Badge>
          <SelectValue>{selection || "Normal"}</SelectValue>
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
  onChange,
}: {
  selection: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="w-1/2 flex space-x-4 items-center">
      <Select
        value={selection}
        onValueChange={onChange}
        defaultValue={selection || "Not Started"}
      >
        <SelectTrigger>
          <SelectValue>{selection}</SelectValue>
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
    <button onClick={handleDelete} className="text-red-500">
      Delete
    </button>
  );
};
