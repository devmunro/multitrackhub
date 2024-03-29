"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DeleteButton,
  RhythmLabels,
  StatusLabels,
  TitleEditor,
} from "./ColumnComponents/ColumnComponents";
import { Badge } from "@/components/ui/badge";

export type Titles = {
  _id: string;
  title: string;
  status: string;
  group: string;
  rhythm: string;
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
      const { _id: taskId, title: initialTitle, group } = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Badge>{group}</Badge>
          <TitleEditor taskId={taskId} initialTitle={initialTitle} />
        </div>
      );
    },
  },
  {
    accessorKey: "rhythm",
    header: "Rhythm",
    cell: ({ row }) => {
      const { rhythm } = row.original;
      const { _id } = row.original;

      return <RhythmLabels selection={rhythm} taskId={_id} />;
    },
    enableHiding: true,
    enableSorting: true,
  },

  {
    id: "Status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      const { _id } = row.original;

      return <StatusLabels selection={status} taskId={_id} />;
    },
  },
  {
    id: "Delete",
    header: "",
    cell: ({ row }) => {
      const id = row.original._id;
      const { group } = row.original;

      return <DeleteButton selection={group} taskId={id} />;
    },
    enableHiding: false,
  },
];
