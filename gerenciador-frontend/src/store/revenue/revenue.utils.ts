import type { FinancialEntryType } from "@/store/shared/financial.types"
import { sanitizeNumericValue, sumValues } from "@/store/shared/financial.utils"

import type { Revenue, RevenueLike } from "./revenue.types"

export function normalizeRevenueType(revenue: RevenueLike): FinancialEntryType {
    if (revenue.type === "FIX" || revenue.type === "VARIABLE") {
        return revenue.type
    }

    return revenue.isFixed ? "FIX" : "VARIABLE"
}

export function normalizeRevenue(revenue: RevenueLike): Revenue {
    return {
        id: Number(revenue.id),
        name: revenue.name ?? "",
        value: sanitizeNumericValue(revenue.value),
        dueDate: revenue.dueDate ?? "",
        type: normalizeRevenueType(revenue),
    }
}

export function splitRevenuesByType(revenues: RevenueLike[]) {
    return revenues.reduce(
        (acc, current) => {
            const normalized = normalizeRevenue(current)

            if (normalized.type === "FIX") {
                acc.fixRevenues.push(normalized)
            } else {
                acc.variableRevenues.push(normalized)
            }

            return acc
        },
        {
            fixRevenues: [] as Revenue[],
            variableRevenues: [] as Revenue[],
        }
    )
}

export function getRevenuesTotal(revenues: Revenue[]) {
    return sumValues(revenues)
}
