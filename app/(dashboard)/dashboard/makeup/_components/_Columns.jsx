"use client";

import { CellAction } from "./_cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
