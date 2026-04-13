"use client"

import { useAllExpensesSelector, } from "@/store/expense/expense.selectors"
import { useExpenseStore } from "@/store/expense/use-expense-store"
import { useAllRevenuesSelector, } from "@/store/revenue/revenue.selectors"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"
import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

export function useWalletTransactions() {
    const revenues = useRevenueStore(useAllRevenuesSelector())
    const expenses = useExpenseStore(useAllExpensesSelector())
    const [range, setRange] = useState<DateRange | undefined>(undefined)

    const allData = useMemo(
        () => [
            ...revenues.map((r) => ({ ...r, transactionType: "revenue" })),
            ...expenses.map((e) => ({ ...e, transactionType: "expense" })),
        ],
        [revenues, expenses]
    )

    const filteredData = useMemo(() => {
        if (!range?.from || !range?.to) return []

        return allData
            .filter((item) => {
                const date = new Date(item.dueDate)
                return date >= range.from! && date <= range.to!
            })
            .sort(
                (a, b) =>
                    new Date(b.dueDate).getTime() -
                    new Date(a.dueDate).getTime()
            )
    }, [allData, range])

    return {
        data: filteredData,
        range,
        setRange,
    }
}
