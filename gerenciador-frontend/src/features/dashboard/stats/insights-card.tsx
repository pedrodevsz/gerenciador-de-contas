"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/hooks/use-format-currency"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useInsights } from "./use-insights"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { InsightsSkeleton } from "./insights-skeleton"

export function InsightsCard() {
    const isLoading = useFinancialLoading()
    const {
        percentage,
        remaining,
        categoryStats,
        topCategory,
        status,
    } = useInsights()

    return (
        <WithLoading isLoading={isLoading} fallback={<InsightsSkeleton />}>
            <Card className="overflow-hidden">
                <CardHeader className="border-b bg-muted/30 px-4 pb-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        Insights
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5 p-4 sm:p-6">
                    <div className="space-y-3 rounded-xl border border-border/60 bg-background/60 p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0 flex-1">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Uso da Renda
                                </span>
                                <Progress value={percentage} className="mt-2 h-2 w-full" />
                            </div>
                            <span className="text-left text-lg font-bold sm:text-right">
                                {percentage}%
                            </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg bg-muted/40 p-3">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Situação Atual
                                </p>
                                <p className={cn("mt-1 text-sm font-semibold sm:text-base", status.color)}>
                                    {status.label}
                                </p>
                            </div>

                            <div className="rounded-lg bg-muted/40 p-3">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    {remaining >= 0 ? "Saldo Restante" : "Excedente (Déficit)"}
                                </p>
                                <p
                                    className={cn(
                                        "mt-1 text-sm font-bold sm:text-base",
                                        remaining >= 0 ? "text-emerald-500" : "text-red-500"
                                    )}
                                >
                                    {formatCurrency(Math.abs(remaining))}
                                </p>
                            </div>
                        </div>

                        {topCategory && (
                            <div className="rounded-lg bg-muted/40 p-3">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Maior Gasto
                                </p>
                                <Badge
                                    variant="outline"
                                    className="mt-2 max-w-full truncate border-red-200 bg-red-50 font-semibold capitalize text-red-700"
                                >
                                    {topCategory.category} ({topCategory.percent.toFixed(0)}%)
                                </Badge>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {categoryStats.length > 1 && (
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Top Distribuição
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {categoryStats.slice(0, 3).map((item) => (
                                        <Badge
                                            key={item.category}
                                            variant="secondary"
                                            className="capitalize"
                                        >
                                            {item.category}: {item.percent.toFixed(0)}%
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-2">
                            {percentage > 80 && (
                                <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/20">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription className="text-xs sm:text-sm">
                                        Seus gastos estão muito altos em relação à sua renda.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {percentage <= 60 && (
                                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    <AlertDescription className="text-xs sm:text-sm">
                                        Você está mantendo um bom controle financeiro.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </WithLoading>
    )
}
