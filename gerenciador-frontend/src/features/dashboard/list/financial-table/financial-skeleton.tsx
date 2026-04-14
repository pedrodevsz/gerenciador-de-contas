"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

type TableSkeletonBaseProps = {
    rows?: number
    hasStatus?: boolean
}

export function TableSkeletonBase({
    rows = 5,
    hasStatus = true,
}: TableSkeletonBaseProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="space-y-3 p-3 sm:p-4 md:hidden">
                {Array.from({ length: Math.min(rows, 3) }).map((_, i) => (
                    <div key={i} className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <Skeleton className="h-5 w-20" />
                            <div className="flex items-center gap-2">
                                {hasStatus && <Skeleton className="h-10 w-24 rounded-md" />}
                                <Skeleton className="h-10 w-10 rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            {hasStatus && <TableHead>Status</TableHead>}
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="w-12" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array.from({ length: rows }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>

                                {hasStatus && (
                                    <TableCell>
                                        <Skeleton className="h-6 w-20 rounded-md" />
                                    </TableCell>
                                )}

                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>

                                <TableCell className="text-right">
                                    <Skeleton className="ml-auto h-4 w-20" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
