"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FinancialEvolutionSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4 px-4 pb-0 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
                <Skeleton className="h-5 w-48" />

                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-24 rounded-md" />
                    ))}
                </div>
            </CardHeader>

            <CardContent className="px-2 pb-4 sm:px-4 sm:pb-6">
                <div className="flex h-[18rem] w-full items-end gap-2 sm:h-[22rem]">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="flex-1 h-[60%] rounded-md"
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
