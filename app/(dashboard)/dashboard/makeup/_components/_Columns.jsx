"use client";

import { CellAction } from "./_cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
