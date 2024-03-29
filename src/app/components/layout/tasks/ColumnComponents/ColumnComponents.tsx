import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useTaskStore } from "../../../../lib/store";
import { AlarmClockCheck, AlarmClockOff, AlarmClock } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../../ui/badge";

export const TitleEditor = ({
  taskId,
  initialTitle,
}: {
  taskId: string;
  initialTitle: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { updateTask } = useTaskStore();
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await updateTask({ _id: taskId, title });
      setIsEditing(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const toggleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)} // Exit editing mode if the input loses focus
          autoFocus // Automatically focus the input
          className="border-2" // Add more styling as needed
        />
      ) : (
        // Only attach toggleEdit to the span, so clicking the input doesn't toggle the state
        <span onClick={toggleEdit}>{title}</span>
      )}
    </div>
  );
};

export const GroupLabels = ({
  selection,
  handleChange,
}: {
  selection: string;
  handleChange?: (value: string) => void;
}) => {
  return (
    <Select
      value={selection}
      onValueChange={handleChange}
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
  taskId,
  handleChange,
}: {
  selection: string;
  taskId?: string;
  handleChange?: (value: string) => void;
}) => {
  const [rhythm, setRhythm] = useState(selection);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onChange = async (value: string) => {
    setRhythm(value);
    if (taskId) {
      await updateTask({ _id: taskId, rhythm: value });
    } else {
      handleChange?.(value);
    }
  };
  return (
    <div>
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
    </div>
  );
};

export const StatusLabels = ({
  selection,
  taskId,
  handleChange,
}: {
  selection: string;
  taskId?: string;
  handleChange?: (value: string) => void;
}) => {
  const [status, setStatus] = useState(selection);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onChange = async (value: string) => {
    setStatus(value);
    if (taskId) {
      await updateTask({ _id: taskId, status: value });
    } else {
      handleChange?.(value);
    }
  };

  return (
    <div className="w-1/2 flex space-x-4 items-center">
      <Select
        value={status}
        onValueChange={onChange}
        defaultValue={status || "Not Started"}
      >
        <SelectTrigger>
          <div className="flex space-x-4 items-center text-xs">
            {status === "Not Started" && <AlarmClockOff size={14} />}
            {status === "Started" && <AlarmClock size={14} />}
            {status === "Finished" && <AlarmClockCheck size={14} />}
            <span>{status}</span>
          </div>
        </SelectTrigger>
        <SelectContent defaultChecked>
          <SelectItem value="Not Started">
            <div className="flex space-x-4 items-center text-xs">
              <AlarmClockOff size={14} />
              <span>Not Started</span>
            </div>
          </SelectItem>
          <SelectItem value="Started">
            <div className="flex space-x-4 items-center text-xs">
              <AlarmClock size={14} />
              <span>Started</span>
            </div>
          </SelectItem>
          <SelectItem value="Finished">
            <div className="flex space-x-4 items-center text-xs">
              <AlarmClockCheck size={14} />
              <span>Finished</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const DeleteButton = ({
  taskId,
  selection,
}: {
  taskId: string;
  selection: string;
}) => {
  const [group, setGroup] = useState(selection);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onChange = async (value: string) => {
    setGroup(value);
    await updateTask({ _id: taskId, group: value });
  };

  const removeTask = useTaskStore((state) => state.removeTask);
  const handleDelete = async () => {
    await removeTask(taskId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Group</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={group}
                defaultValue={group || "Learning"}
                onValueChange={onChange}
              >
                <DropdownMenuRadioItem value="Health">
                  Health
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Projects">
                  Projects
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Intern">
                  Intern
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Learning">
                  Learning
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Education">
                  Education
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
