"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  GroupLabels,
  RhythmLabels,
  StatusLabels,
} from "./ColumnComponents/ColumnComponents";
import { AlarmClockCheck, AlarmClockOff, AlarmClock } from "lucide-react";

export type Titles = {
  id: number;
  title: string;
  status: string;
  group: string;
  rhythm: string;
};
const editable = false; //is the row editable

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
          {editable ? (
            // Render editable Select component when truth is true
            <GroupLabels selection={group} />
          ) : (
            // Render this div when truth is false
            <Badge variant="outline">{group}</Badge>
          )}
          {/* This line will render regardless of the truth's value */}
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
      return editable ? (
        // Render editable Select component when truth is true
        <RhythmLabels selection={rhythm} />
      ) : (
        // Render this div with static text when truth is false
        <div>{rhythm}</div>
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

      return editable ? (
        // Render the Select component for editable state
        <StatusLabels selection={status} />
      ) : (
        // Render static content when not editable
        <div className="w-1/2 flex space-x-4 items-center">
          {/* Assuming you have icons or text representation for the static view */}
          {status === "Not Started" && (
            <>
              <AlarmClockOff size={20} />
              <span>Not Started</span>
            </>
          )}
          {status === "Started" && (
            <>
              <AlarmClock size={20} />
              <span>Started</span>
            </>
          )}
          {status === "Finished" && (
            <>
              <AlarmClockCheck size={20} />
              <span>Finished</span>
            </>
          )}
        </div>
      );
    },
  },
];
