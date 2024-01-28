"use client";

import { CellAction } from "./_cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = [
  {
    accessorKey: "name",
    header: "Info",
    cell: ({ row }) => (
      <div className="flex item-start gap-2">
        <Avatar>
          <AvatarImage src={row.original.image} />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-md">{row.original.name}</h3>
          <p className="text-md">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "role",

    cell: ({ row }) => <div className="uppercase">{row.getValue("role")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
