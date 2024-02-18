"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DeleteButton,
  GroupLabels,
  RhythmLabels,
  StatusLabels,
} from "./ColumnComponents/ColumnComponents";

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
      const { group } = row.original;
      const { title } = row.original;

      return (
        <div className="flex items-center">
          <GroupLabels selection={group} />
          <div className="ml-2">{title}</div>
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
  },
];
