"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

// import components
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// import icons
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { transactionDefaultIcons } from "@/config/config"

export type Transaction = {
    slug: string
    member: object
    category: object
    transaction_type: string
    title: string
    description: string
    amount: string
    date: string
    is_active: boolean
    is_deleted: boolean
    created_at: string
    updated_at: string | null
    deleted_at: string | null
}

var data: any = []

const onHandle = (slug: any) => {
    data.push(slug)
    console.log(data)
}


export const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => {
                    console.log(table);
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                    console.log(value);
                    // onHandle(row.original.slug)
                    row.toggleSelected(!!value)
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const title: string = row.getValue("title")
            // const description = parseFloat(row.getValue("description"))
            return (
                <p className="pl-5">{title}</p>
            )
        },
    },
    {
        accessorKey: "category.title",
        header: "Category",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date: string = row.getValue("date")
            const formatted = format(date, "PPP")
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const transaction = row.original
            // console.log(transaction)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]