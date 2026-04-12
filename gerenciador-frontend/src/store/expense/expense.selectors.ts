import { useShallow } from "zustand/react/shallow"

import type { ExpenseState } from "./expense.types"
import { getExpensesTotal, getPendingExpensesTotal } from "./expense.utils"

export const selectFixExpenses = (state: ExpenseState) => state.fixExpenses

export const selectVariableExpenses = (state: ExpenseState) =>
    state.variableExpenses

export const selectAllExpenses = (state: ExpenseState) => [
    ...state.fixExpenses,
    ...state.variableExpenses,
]

export const selectExpenseTotal = (state: ExpenseState) =>
    getExpensesTotal(selectAllExpenses(state))

export const selectPendingExpenseTotal = (state: ExpenseState) =>
    getPendingExpensesTotal(selectAllExpenses(state))

export const useAllExpensesSelector = () => useShallow(selectAllExpenses)
