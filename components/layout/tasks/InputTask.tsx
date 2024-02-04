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
      <TableCell >
        <input className="border-2" type="text" placeholder="Enter title" />
      </TableCell>
      
    </TableRow>
  );
};

export default InputTask;
