import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { formatCurrency } from "@/hooks/use-format-currency"
import { useHydrated } from "@/hooks/use-hydratate"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { SummaryCardSkeleton } from "./summary-card-skeleton"
import { Card } from "@/components/ui/card"

interface SummaryCardProps {
    title: string
    value: number
    icon: React.ReactNode
    valueColorClass?: string
}

export function SummaryCard({
    title,
    value,
    icon,
    valueColorClass = "text-emerald-900 dark:text-emerald-50"
}: SummaryCardProps) {
    const hydrated = useHydrated()
    const isLoading = useFinancialLoading()
    return (
        <WithLoading isLoading={isLoading} fallback={<SummaryCardSkeleton />}>
            <Card className="rounded-2xl border-emerald-100 bg-zinc-50 px-4 py-4 dark:border-emerald-900/30 dark:bg-zinc-950/20 sm:px-5">
                <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                    <div className="rounded-xl bg-zinc-950 p-2 text-white shadow-lg shadow-zinc-950/20">
                        {icon}
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-black dark:text-zinc-400 sm:text-sm">
                            {title}
                        </p>

                        <h2 className={`mt-1 break-words text-xl font-semibold leading-tight sm:text-2xl ${valueColorClass}`}>
                            {hydrated ? formatCurrency(value) : "R$ 0,00"}
                        </h2>
                    </div>
                </div>
            </Card>
        </WithLoading>
    )
}
