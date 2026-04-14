import { useExpenseStore } from "@/store/expense/use-expense-store"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"

export function useFinancialLoading() {
    const expenseLoading = useExpenseStore(s => s.loading)
    const revenueLoading = useRevenueStore(s => s.loading)

    return expenseLoading || revenueLoading


}
