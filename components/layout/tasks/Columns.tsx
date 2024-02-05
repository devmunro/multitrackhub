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
  group: "Health" | "Projects" | "Intern" | "Learning" | "Education";
  rhythm: "Focus" | "Normal" | "Flow";
};

export const columns: ColumnDef<Titles>[] = [
  {
    id: "checkboxes",
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
    cell: ({ row }) => {
      const { group } = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Select defaultValue={group || "Normal"}>
            <SelectTrigger className="border-0 w-min">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-0">
              <SelectItem value="Health">
                <Badge>Health</Badge>
              </SelectItem>
              <SelectItem value="Projects">
                <Badge>Projects</Badge>
              </SelectItem>
              <SelectItem value="Intern">
                <Badge>Intern</Badge>
              </SelectItem>
              <SelectItem value="Learning">
                <Badge>Learning</Badge>
              </SelectItem>
              <SelectItem value="Education">
                <Badge>Education</Badge>
              </SelectItem>
            </SelectContent>
          </Select>
          <div>{row.original.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "rhythm",
    header: "Rhythm",
    cell: ({ row }) => {
      const { rhythm } = row.original;
      return (
        <Select defaultValue={rhythm || "Normal"}>
          <SelectTrigger>
            <SelectValue placeholder={rhythm} />
          </SelectTrigger>
          <SelectContent>
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
      );
    },
    enableHiding: true,
    enableSorting: true,
  },

  {
    id: "Status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div className="w-1/2">
          <Select defaultValue={status || "Not Started"}>
            <SelectTrigger>
              <SelectValue placeholder={status} />
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
    },
  },
];
