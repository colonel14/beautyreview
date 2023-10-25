"use client";

import { Button } from "@/components/ui/button";
import { CellAction } from "./_cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown } from "lucide-react";

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
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Role
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => <div className="uppercase">{row.getValue("role")}</div>,
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
