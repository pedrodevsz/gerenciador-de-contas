"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/hooks/use-format-currency"
import { useExpensesData } from "./use-expenses-category"
import { ExpensesCategorySkeleton } from "./expense-category-skeleton"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
const COLORS = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6"
]

export function ExpensesCategoryChart() {
    const { data, total } = useExpensesData()
    const isLoading = useFinancialLoading()

    return (
        <WithLoading isLoading={isLoading} fallback={<ExpensesCategorySkeleton />}>
            <Card>
                <CardHeader className="flex flex-col gap-4 px-4 pb-0 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
                    <CardTitle className="text-lg sm:text-xl">Gastos por categoria</CardTitle>

                    <div className="flex flex-wrap gap-2 text-xs sm:justify-end">
                        {data.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1">
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                {item.name}
                            </div>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className="px-2 pb-4 sm:px-4 sm:pb-6">
                    <div className="h-[18rem] w-full sm:h-[20rem]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={45}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    label={({ value }) => {
                                        const percent = ((value / total) * 100).toFixed(0)
                                        return `${percent}%`
                                    }}
                                >
                                    {data.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (!active || !payload?.length) return null

                                        const item = payload[0]
                                        const value = Number(item.value ?? 0)
                                        const percent = total
                                            ? ((value / total) * 100).toFixed(1)
                                            : "0"

                                        return (
                                            <div className="bg-zinc-900 text-white border border-zinc-800 rounded-lg px-3 py-2 shadow-lg text-xs">
                                                <p
                                                    className="font-semibold mb-1"
                                                    style={{ color: item.payload.fill }}
                                                >
                                                    {item.name}
                                                </p>

                                                <p>{formatCurrency(value)}</p>

                                                <p className="text-zinc-400">
                                                    {percent}% do total
                                                </p>
                                            </div>
                                        )
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </WithLoading>
    )
}
