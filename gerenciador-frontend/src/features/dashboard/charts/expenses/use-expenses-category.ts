"use client"

import { getExpenseByCategory } from "@/lib/dashboard/stats"
import {
    useAllExpensesSelector,
} from "@/store/expense/expense.selectors"
import { useExpenseStore } from "@/store/expense/use-expense-store"
import { useMemo } from "react"

export function useExpensesData() {
    const expenses = useExpenseStore(useAllExpensesSelector())

    const data = useMemo(
        () => getExpenseByCategory(expenses),
        [expenses]
    )

    const total = useMemo(
        () => data.reduce((acc, item) => acc + item.value, 0),
        [data]
    )

    return { data, total }
}
