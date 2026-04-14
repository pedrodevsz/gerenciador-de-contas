"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function InsightsSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30 px-4 pb-4 sm:px-6">
                <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-5 p-4 sm:p-6">
                <div className="space-y-3 rounded-xl border border-border/60 bg-background/60 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="w-full space-y-2">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-12" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2 rounded-lg bg-muted/40 p-3">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        <div className="space-y-2 rounded-lg bg-muted/40 p-3">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>

                    <div className="space-y-2 rounded-lg bg-muted/40 p-3">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-6 w-32 rounded-md" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <Skeleton className="h-3 w-32" />

                        <div className="flex gap-2 flex-wrap">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-6 w-20 rounded-md"
                                />
                            ))}
                        </div>
                    </div>

                    <Skeleton className="h-16 w-full rounded-lg" />
                </div>
            </CardContent>
        </Card>
    )
}
