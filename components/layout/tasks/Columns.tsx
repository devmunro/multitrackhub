"use client";

import { ColumnDef } from "@tanstack/react-table";
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

export type Titles = {
  id: number;
  title: string;
  status: "Not Started" | "Started" | "Finished";
  group: string;
  rhythm: "Focus" | "Normal" | "Flow";
};

export const columns: ColumnDef<Titles>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-start space-x-3">
        <Badge>{row.original.group}</Badge>
        <div>{row.original.title}</div>
      </div>
    ),
  },

  {
    accessorKey: "rhythm",
    header: "Rhythm",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.rhythm === "Focus"
            ? "destructive"
            : row.original.rhythm === "Flow"
            ? "secondary"
            : "gray"
        }
      >
        {row.original.rhythm}
      </Badge>
    ),
  },

  {
    id: "select",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div className="w-1/2">
          <Select defaultValue={status} >
            <SelectTrigger>
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent defaultValue="Not Started" defaultChecked>
              <SelectItem value="Not Started">
                <div className="flex space-x-4 items-center">
                  <AlarmClockOff size={20}/>
                  <span>Not Started</span>
                </div>
              </SelectItem>
              <SelectItem value="Started">
                <div className="flex space-x-4 items-center">
                  <AlarmClock size={20}/>
                  <span>Started</span>
                </div>
              </SelectItem>
              <SelectItem value="Finished">
                <div className="flex space-x-4 items-center">
                  <AlarmClockCheck size={20}/>
                  <span>Finished</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },

    
  },
];
