"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"

interface ExpandableListProps<T> {
    items: T[]
    initialDisplayCount?: number
    renderItem: (item: T, index: number) => React.ReactNode
    emptyMessage?: string
    className?: string
}

export function ExpandableList<T>({
    items,
    initialDisplayCount = 5,
    renderItem,
    emptyMessage = "Nenhum item encontrado",
    className,
}: ExpandableListProps<T>) {
    const [showAll, setShowAll] = useState(false)

    const visibleData = showAll ? items : items.slice(0, initialDisplayCount)
    const hasMore = items.length > initialDisplayCount

    if (items.length === 0) {
        return <p className="text-sm text-muted-foreground">{emptyMessage}</p>
    }

    return (
        <div className={className}>
            <div className="space-y-2">
                {visibleData.map((item, index) => renderItem(item, index))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="flex items-center gap-1 text-sm font-medium text-primary"
                        variant="link"
                    >
                        {showAll ? (
                            <span className="flex items-center gap-x-1.5">
                                Ver menos <ArrowUp className="w-4 h-4" />
                            </span>
                        ) : (
                            <span className="flex items-center gap-x-1.5">
                                Ver mais <ArrowDown className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}