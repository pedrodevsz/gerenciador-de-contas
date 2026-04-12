"use client"

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { formatCurrency } from "@/hooks/use-format-currency"
import { useFinancialEvolution } from "./use-financial-evolution"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { FinancialEvolutionSkeleton } from "./financial-evolution-skeleton"

type EvolutionMetric = "saldo" | "receitas" | "despesas"

const metrics: EvolutionMetric[] = ["saldo", "receitas", "despesas"]

export function FinancialEvolutionChart() {
    const [active, setActive] = useState<EvolutionMetric>("saldo")
    const { data } = useFinancialEvolution()
    const isLoading = useFinancialLoading()

    return (
        <WithLoading isLoading={isLoading} fallback={<FinancialEvolutionSkeleton />}>
            <Card>
                <CardHeader className="flex flex-col gap-4 px-4 pb-0 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
                    <CardTitle className="text-lg sm:text-xl">Evolução financeira</CardTitle>

                    <div className="flex flex-wrap gap-2 text-xs">
                        {metrics.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActive(key)}
                                className={`min-h-10 rounded-md border px-3 py-2 text-sm capitalize ${active === key
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                    }`}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className="px-2 pb-4 sm:px-4 sm:pb-6">
                    <div className="h-[18rem] w-full sm:h-[22rem]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="saldo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="receitas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="despesas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                minTickGap={24}
                                tickFormatter={(date) =>
                                    new Date(date).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit"
                                    })
                                }
                            />

                            <Tooltip
                                content={({ active: isActive, payload, label }) => {
                                    if (!isActive || !payload?.length) return null

                                    const item = payload[0].payload

                                    return (
                                        <div className="bg-card border rounded-lg p-3 shadow-md text-xs">
                                            <p className="font-semibold mb-1">
                                                {label
                                                    ? new Date(label).toLocaleDateString("pt-BR")
                                                    : "--"}
                                            </p>

                                            <p className="text-emerald-500">
                                                Receita: {formatCurrency(item.receitas)}
                                            </p>

                                            <p className="text-red-500">
                                                Despesa: {formatCurrency(item.despesas)}
                                            </p>

                                            <p className="text-indigo-500 font-semibold mt-1">
                                                Saldo: {formatCurrency(item.saldo)}
                                            </p>
                                        </div>
                                    )
                                }}
                            />

                            {active === "saldo" && (
                                <Area
                                    type="monotone"
                                    dataKey="saldo"
                                    stroke="#6366f1"
                                    fill="url(#saldo)"
                                    strokeWidth={3}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {active === "receitas" && (
                                <Area
                                    type="monotone"
                                    dataKey="receitas"
                                    stroke="#10b981"
                                    fill="url(#receitas)"
                                    strokeWidth={3}
                                    activeDot={{ r: 6 }}
                                />
                            )}

                            {active === "despesas" && (
                                <Area
                                    type="monotone"
                                    dataKey="despesas"
                                    stroke="#ef4444"
                                    fill="url(#despesas)"
                                    strokeWidth={3}
                                    activeDot={{ r: 6 }}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </WithLoading>
    )
}
