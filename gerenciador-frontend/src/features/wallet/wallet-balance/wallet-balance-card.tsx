"use client"

import { formatCurrency } from "@/hooks/use-format-currency"
import { useHydrated } from "@/hooks/use-hydratate"
import { cn } from "@/lib/utils"
import { useInsights } from "@/features/dashboard/stats/use-insights"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { WalletBalanceSkeleton } from "./wallet-card-skeleton"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

export function WalletBalanceCard() {
    const { remaining } = useInsights()
    const hydrated = useHydrated()
    const isPositive = remaining >= 0
    const isLoading = useFinancialLoading()

    return (
        <WithLoading isLoading={isLoading} fallback={<WalletBalanceSkeleton />}>
            <Card className="w-full rounded-2xl border border-border bg-card shadow-sm">

                <CardHeader className="px-4 pb-0 sm:px-6">
                    <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                        Saldo Atual
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-end lg:justify-between">

                    <div className="min-w-0 space-y-1">
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Visão consolidada do saldo disponível
                        </p>
                        <h2
                            className={cn(
                                "break-words text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl",
                                isPositive ? "text-emerald-600" : "text-red-500"
                            )}
                        >
                            {hydrated ? formatCurrency(Math.abs(remaining)) : "R$ 0,00"}
                        </h2>
                    </div>

                    <div className={cn(
                        "inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold sm:text-base",
                        isPositive
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-red-500/10 text-red-600 border-red-500/20"
                    )}>
                        {isPositive ? "Positivo" : "Negativo"}
                    </div>
                </CardContent>
            </Card>
        </WithLoading>
    )
}
