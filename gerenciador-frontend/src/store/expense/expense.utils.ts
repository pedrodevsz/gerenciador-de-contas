import type { FinancialEntryType } from "@/store/shared/financial.types"
import { sanitizeNumericValue, sumValues } from "@/store/shared/financial.utils"

import type { Expense, ExpenseLike } from "./expense.types"

export function normalizeExpenseType(expense: ExpenseLike): FinancialEntryType {
    if (expense.type === "FIX" || expense.type === "VARIABLE") {
        return expense.type
    }

    return expense.isFixed ? "FIX" : "VARIABLE"
}

export function normalizeExpense(expense: ExpenseLike): Expense {
    return {
        id: Number(expense.id),
        name: expense.name ?? "",
        value: sanitizeNumericValue(expense.value),
        dueDate: expense.dueDate ?? "",
        type: normalizeExpenseType(expense),
        category: expense.category ?? "",
        paid: Boolean(expense.paid),
    }
}

export function splitExpensesByType(expenses: ExpenseLike[]) {
    return expenses.reduce(
        (acc, current) => {
            const normalized = normalizeExpense(current)

            if (normalized.type === "FIX") {
                acc.fixExpenses.push(normalized)
            } else {
                acc.variableExpenses.push(normalized)
            }

            return acc
        },
        {
            fixExpenses: [] as Expense[],
            variableExpenses: [] as Expense[],
        }
    )
}

export function getExpensesTotal(expenses: Expense[]) {
    return sumValues(expenses)
}

export function getPendingExpensesTotal(expenses: Expense[]) {
    return sumValues(expenses.filter((expense) => !expense.paid))
}
