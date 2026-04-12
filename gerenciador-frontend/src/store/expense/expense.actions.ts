import type { StateCreator } from "zustand"

import { ExpenseService } from "@/services/expense-service"
import type { FinancialEntryType, PageResponse } from "@/store/shared/financial.types"
import { sanitizeNumericValue } from "@/store/shared/financial.utils"

import type { Expense, ExpenseState } from "./expense.types"
import { selectExpenseTotal, selectPendingExpenseTotal, } from "./expense.selectors"
import { normalizeExpense, splitExpensesByType, } from "./expense.utils"

type ExpenseStoreCreator = StateCreator<ExpenseState>
type SetExpenseStore = Parameters<ExpenseStoreCreator>[0]
type GetExpenseStore = Parameters<ExpenseStoreCreator>[1]

export function createExpenseActions(
    set: SetExpenseStore,
    get: GetExpenseStore
) {
    return {
        fetchExpenses: async () => {
            try {
                set({ loading: true })

                const response: PageResponse<Expense> =
                    await ExpenseService.getAll()

                const data = response?.content ?? []
                const { fixExpenses, variableExpenses } =
                    splitExpensesByType(data)

                set({
                    fixExpenses,
                    variableExpenses,
                    loading: false,
                })
            } catch (error) {
                console.error("Erro ao buscar despesas:", error)
                set({ loading: false })
            }
        },

        addExpense: async (data: Omit<Expense, "id">) => {
            try {
                const payload = {
                    ...data,
                    value: sanitizeNumericValue(data.value),
                }

                const created = normalizeExpense(
                    await ExpenseService.create(payload)
                )

                if (created.type === "FIX") {
                    set((state) => ({
                        fixExpenses: [...state.fixExpenses, created],
                    }))
                    return
                }

                set((state) => ({
                    variableExpenses: [...state.variableExpenses, created],
                }))
            } catch (error) {
                console.error("Erro ao criar despesa:", error)
            }
        },
        removeExpense: async (id: number | string, type: FinancialEntryType) => {
            try {
                await ExpenseService.delete(Number(id));

                const filterFn = (expense: Expense) => String(expense.id) !== String(id);

                if (type === "FIX") {
                    set((state) => ({
                        fixExpenses: state.fixExpenses.filter(filterFn),
                    }));
                    return;
                }

                set((state) => ({
                    variableExpenses: state.variableExpenses.filter(filterFn),
                }));
            } catch (error) {
                console.error("Erro ao remover despesa:", error);
            }
        },

        togglePaid: async (id: number | string, type: FinancialEntryType) => {
            try {
                const updated = normalizeExpense(
                    await ExpenseService.togglePaid(Number(id))
                );

                const mapFn = (expense: Expense) =>
                    String(expense.id) === String(id) ? updated : expense;

                if (type === "FIX") {
                    set((state) => ({
                        fixExpenses: state.fixExpenses.map(mapFn),
                    }));
                    return;
                }

                set((state) => ({
                    variableExpenses: state.variableExpenses.map(mapFn),
                }));
            } catch (error) {
                console.error("Erro ao alternar status de pagamento:", error);
            }
        },

        getTotal: () => {
            return selectExpenseTotal(get())
        },

        getPendingTotal: () => {
            return selectPendingExpenseTotal(get())
        },
    }
}
