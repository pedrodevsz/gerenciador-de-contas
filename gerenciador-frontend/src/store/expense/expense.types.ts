import type { FinancialEntryType } from "@/store/shared/financial.types"

export interface Expense {
    id: number | string
    name: string
    value: number
    dueDate: string
    type: FinancialEntryType
    category: string
    paid: boolean
}

export type ExpenseLike = Partial<Expense> & {
    id?: number | string
    value?: number | string
    isFixed?: boolean
}

export interface ExpenseState {
    fixExpenses: Expense[]
    variableExpenses: Expense[]
    loading: boolean
    fetchExpenses: () => Promise<void>
    addExpense: (expense: Omit<Expense, "id">) => Promise<void>
    removeExpense: (id: number | string, type: FinancialEntryType) => Promise<void>
    togglePaid: (id: number | string, type: FinancialEntryType) => Promise<void>
    getTotal: () => number
    getPendingTotal: () => number
}