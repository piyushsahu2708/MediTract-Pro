"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Patient } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableRowActions } from "./data-table-row-actions"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export const columns: ColumnDef<Patient>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const patient = row.original
      const avatar = PlaceHolderImages.find(p => p.id === patient.avatar)
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar?.imageUrl} alt={patient.name} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{patient.name}</div>
            <div className="text-sm text-muted-foreground">{patient.email}</div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit",
    cell: ({ row }) => {
      return new Date(row.original.lastVisit).toLocaleDateString()
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "secondary" : "outline"} className={status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : ""}>
            {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
