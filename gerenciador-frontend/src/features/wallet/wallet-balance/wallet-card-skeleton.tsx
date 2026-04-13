"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function WalletBalanceSkeleton() {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/20 sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-8 w-52" />
                </div>

                <Skeleton className="h-11 w-28 rounded-full" />
            </div>
        </div>
    )
}
