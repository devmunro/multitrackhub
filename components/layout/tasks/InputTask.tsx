import { ChangeEvent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlarmClockCheck, AlarmClockOff, AlarmClock } from "lucide-react";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputTask: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>
        <input type="text" placeholder="Enter group" />
        <input type="text" placeholder="Enter title" />
      </TableCell>
      <TableCell>
        <Select defaultValue="Flow">
          <SelectTrigger>
            <SelectValue placeholder="Flow" />
          </SelectTrigger>
          <SelectContent defaultValue="Flow" defaultChecked>
            <SelectItem value="Flow">
              <Badge variant="secondary">Flow</Badge>
            </SelectItem>
            <SelectItem value="Normal">
              <Badge variant="gray">Normal</Badge>
            </SelectItem>
            <SelectItem value="Focus">
              <Badge variant="destructive">Focus</Badge>
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select defaultValue="Not Started">
          <SelectTrigger>
            <SelectValue placeholder="Not Started" />
          </SelectTrigger>
          <SelectContent defaultValue="Not Started" defaultChecked>
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
      </TableCell>
    </TableRow>
  );
};

export default InputTask;
