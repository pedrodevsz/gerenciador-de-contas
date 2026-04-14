"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function SummaryCardSkeleton() {
    return (
        <div className="rounded-2xl border border-emerald-100 bg-zinc-50 p-4 dark:border-emerald-900/30 dark:bg-zinc-950/20 sm:p-5">

            <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />

                <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-32" />
                </div>
            </div>

        </div>
    )
}
