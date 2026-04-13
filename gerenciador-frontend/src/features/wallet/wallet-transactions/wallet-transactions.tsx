"use client"

import { formatCurrency } from "@/hooks/use-format-currency"
import { formatDate } from "@/hooks/use-format-date"
import { cn } from "@/lib/utils"
import { useWalletTransactions } from "./use-wallet-transactions"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { WalletTransactionsSkeleton } from "./wallet-transactions-skeleton"
import { DateRangePicker } from "./calendar/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpandableList } from "@/components/expandable-list/expandable-list"

export function WalletTransactions() {
    const { data, range, setRange } = useWalletTransactions()
    const isLoading = useFinancialLoading()

    return (
        <WithLoading isLoading={isLoading} fallback={<WalletTransactionsSkeleton />}>
            <Card className="rounded-2xl border border-border bg-card shadow-sm">
                <CardHeader className="flex flex-col gap-4 px-4 pb-0 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold sm:text-xl">Movimentações</CardTitle>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Consulte o histórico de receitas e despesas por período.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto">
                        <DateRangePicker
                            value={range}
                            onChange={(newRange) => {
                                if (newRange) setRange(newRange)
                            }}
                        />
                    </div>
                </CardHeader>

                <CardContent className="px-4 py-4 sm:px-6 sm:py-5">
                    <ExpandableList
                        items={data}
                        initialDisplayCount={5}
                        emptyMessage="Nenhuma movimentação encontrada"
                        className="space-y-3"
                        renderItem={(item) => {
                            const isRevenue = item.transactionType === "revenue"
                            return (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-background p-4 transition-colors hover:bg-muted/30 dark:border-zinc-800",
                                        "sm:flex-row sm:items-center sm:justify-between",
                                        "border-zinc-200 dark:border-zinc-800"
                                    )}
                                >
                                    <div className="min-w-0 space-y-1">
                                        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:text-base">
                                            {item.name}
                                        </p>
                                        <span className="text-xs text-muted-foreground sm:text-sm">
                                            {formatDate(item.dueDate)}
                                        </span>
                                    </div>

                                    <span
                                        className={cn(
                                            "text-base font-bold sm:text-lg",
                                            isRevenue ? "text-emerald-600" : "text-red-500"
                                        )}
                                    >
                                        {isRevenue ? "+" : "-"} {formatCurrency(item.value)}
                                    </span>
                                </div>
                            )
                        }}
                    />
                </CardContent>
            </Card>
        </WithLoading>
    )
}
