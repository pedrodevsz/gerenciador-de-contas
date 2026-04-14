"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ExpensesCategorySkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4 px-4 pb-0 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
                <Skeleton className="h-5 w-40" />

                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1">
                            <Skeleton className="h-2.5 w-2.5 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="px-2 pb-4 sm:px-4 sm:pb-6">
                <div className="flex h-[18rem] w-full items-center justify-center sm:h-[20rem]">
                    <Skeleton className="h-44 w-44 rounded-full sm:h-52 sm:w-52" />
                </div>
            </CardContent>
        </Card>
    )
}
