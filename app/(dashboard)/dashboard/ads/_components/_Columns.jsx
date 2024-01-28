"use client";

import Image from "next/image";
import { CellAction } from "./_cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Info",
    cell: ({ row }) => (
      <div className="flex item-start gap-2">
        <Image
          src={row.original.banner}
          width={200}
          height={100}
          alt="banner"
        />
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },

  {
    accessorKey: "url",
    header: "Url",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
