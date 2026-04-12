"use client"

import { create } from "zustand"

import { createExpenseActions } from "./expense.actions"
import type { Expense, ExpenseState } from "./expense.types"

export const useExpenseStore = create<ExpenseState>((set, get) => ({
    fixExpenses: [],
    variableExpenses: [],
    loading: false,
    ...createExpenseActions(set, get),
}))

export type { Expense }
