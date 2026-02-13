"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Patient } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableRowActions } from "./data-table-row-actions"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { format } from "date-fns"

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
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const patient = row.original
      const name = `${patient.firstName} ${patient.lastName}`
      const avatar = PlaceHolderImages.find(p => p.id === patient.avatar)
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {avatar && <AvatarImage src={avatar?.imageUrl} alt={name} />}
            <AvatarFallback>{patient.firstName?.charAt(0)}{patient.lastName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
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
    accessorKey: "dateOfBirth",
    header: "Age",
    cell: ({ row }) => {
        const dateOfBirth = row.getValue("dateOfBirth") as string;
        if (!dateOfBirth) return "N/A";
        const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        return age;
    }
  },
  {
    accessorKey: "admissionDate",
    header: "Admission Date",
    cell: ({ row }) => {
        const admissionDate = row.getValue("admissionDate") as string;
        return format(new Date(admissionDate), "PP")
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
