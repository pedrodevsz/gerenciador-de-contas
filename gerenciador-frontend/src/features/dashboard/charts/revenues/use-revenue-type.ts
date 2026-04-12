"use client"

import { useMemo } from "react"
import {
    selectFixRevenues,
    selectVariableRevenues,
} from "@/store/revenue/revenue.selectors"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"

export function useRevenueType() {
    const fixRevenues = useRevenueStore(selectFixRevenues)
    const variableRevenues = useRevenueStore(selectVariableRevenues)

    const fix = useMemo(
        () => fixRevenues.reduce((a, b) => a + b.value, 0),
        [fixRevenues]
    )

    const variable = useMemo(
        () => variableRevenues.reduce((a, b) => a + b.value, 0),
        [variableRevenues]
    )

    const data = useMemo(
        () => [
            { name: "Fixa", value: fix },
            { name: "Variável", value: variable }
        ],
        [fix, variable]
    )

    const total = fix + variable

    return { data, total }
}
