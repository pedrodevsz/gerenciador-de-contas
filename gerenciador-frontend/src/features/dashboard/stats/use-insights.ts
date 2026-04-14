"use client"

import { selectRevenueTotal } from "@/store/revenue/revenue.selectors"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"
import {
    selectExpenseTotal,
    useAllExpensesSelector,
} from "@/store/expense/expense.selectors"
import { useExpenseStore } from "@/store/expense/use-expense-store"
import { useMemo } from "react"

export function useInsights() {
    const revenueTotal = useRevenueStore(selectRevenueTotal)
    const expenses = useExpenseStore(useAllExpensesSelector())
    const expenseTotal = useExpenseStore(selectExpenseTotal)

    const percentage = useMemo(() => {
        if (revenueTotal <= 0) return 0
        return Math.round((expenseTotal / revenueTotal) * 100)
    }, [expenseTotal, revenueTotal])

    const remaining = useMemo(
        () => revenueTotal - expenseTotal,
        [revenueTotal, expenseTotal]
    )

    const categoryStats = useMemo(() => {
        const map = new Map<string, number>()

        expenses.forEach((e) => {
            map.set(e.category, (map.get(e.category) || 0) + e.value)
        })

        const total = Array.from(map.values()).reduce((a, b) => a + b, 0)

        return Array.from(map.entries())
            .map(([category, value]) => ({
                category,
                value,
                percent: total ? (value / total) * 100 : 0
            }))
            .sort((a, b) => b.value - a.value)
    }, [expenses])

    const topCategory = categoryStats[0]

    const status = useMemo(() => {
        if (percentage > 80) {
            return { label: "Crítico", color: "text-red-500" }
        }

        if (percentage > 60) {
            return { label: "Atenção", color: "text-yellow-500" }
        }

        return { label: "Saudável", color: "text-emerald-500" }
    }, [percentage])

    return {
        revenueTotal,
        expenseTotal,
        percentage,
        remaining,
        categoryStats,
        topCategory,
        status
    }
}
