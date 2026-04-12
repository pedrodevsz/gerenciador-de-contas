"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type CardSkeletonBaseProps = {
    hasHeader?: boolean
    lines?: number
    hasFooter?: boolean
}

export function CardSkeletonBase({
    hasHeader = true,
    lines = 3,
    hasFooter = false,
}: CardSkeletonBaseProps) {
    return (
        <Card>
            {hasHeader && (
                <CardHeader className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                </CardHeader>
            )}

            <CardContent className="space-y-3">
                {Array.from({ length: lines }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="h-4 w-full"
                    />
                ))}
            </CardContent>

            {hasFooter && (
                <div className="p-4 pt-0">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            )}
        </Card>
    )
}