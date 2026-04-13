"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function WalletTransactionsSkeleton() {
    return (
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/20 sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-56" />
                </div>

                <Skeleton className="h-11 w-full max-w-sm" />
            </div>

            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-3 rounded-xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>

                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
    )
}
