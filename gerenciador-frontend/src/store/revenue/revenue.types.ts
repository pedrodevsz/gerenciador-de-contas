import type { FinancialEntryType } from "@/store/shared/financial.types"

export interface Revenue {
    id: number | string
    name: string
    value: number
    dueDate: string
    type: FinancialEntryType
}

export type RevenueLike = Partial<Revenue> & {
    id?: number | string
    value?: number | string
    isFixed?: boolean
}

export interface RevenueState {
    fixRevenues: Revenue[]
    variableRevenues: Revenue[]
    loading: boolean
    fetchRevenues: () => Promise<void>
    addRevenue: (revenue: Omit<Revenue, "id">) => Promise<void>
    removeRevenue: (id: number | string, type: FinancialEntryType) => Promise<void>
    getTotal: () => number
}
