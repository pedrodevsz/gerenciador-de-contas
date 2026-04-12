"use client"

import { useMemo } from "react"
import {
    useAllRevenuesSelector,
} from "@/store/revenue/revenue.selectors"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"
import {
    useAllExpensesSelector,
} from "@/store/expense/expense.selectors"
import { useExpenseStore } from "@/store/expense/use-expense-store"

export function useFinancialEvolution() {
    const revenues = useRevenueStore(useAllRevenuesSelector())
    const expenses = useExpenseStore(useAllExpensesSelector())

    const data = useMemo(() => {
        const map = new Map<
            string,
            { date: string; receitas: number; despesas: number }
        >()

        revenues.forEach((item) => {
            if (!map.has(item.dueDate)) {
                map.set(item.dueDate, {
                    date: item.dueDate,
                    receitas: 0,
                    despesas: 0
                })
            }
            map.get(item.dueDate)!.receitas += item.value
        })

        expenses.forEach((item) => {
            if (!map.has(item.dueDate)) {
                map.set(item.dueDate, {
                    date: item.dueDate,
                    receitas: 0,
                    despesas: 0
                })
            }
            map.get(item.dueDate)!.despesas += item.value
        })

        const sorted = Array.from(map.values()).sort(
            (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        return sorted.reduce<
            Array<
                (typeof sorted)[number] & {
                    saldo: number
                }
            >
        >((acc, item) => {
            const previousSaldo =
                acc.length > 0 ? acc[acc.length - 1].saldo : 0
            const saldo = previousSaldo + item.receitas - item.despesas

            acc.push({ ...item, saldo })

            return acc
        }, [])
    }, [revenues, expenses])

    return { data }
}
