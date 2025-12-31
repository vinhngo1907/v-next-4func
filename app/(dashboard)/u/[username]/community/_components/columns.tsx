"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";

export type BlockedUser = {
    id: string;
    userId: string;
    imageUrl: string;
    username: string;
    createdAt: string;
}

export const columns: ColumnDef<BlockedUser>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Username<ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <UnblockButton userId={row.original.id} />
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Date blocked
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
]