import { Expense } from "@/store/expense/use-expense-store"
import { Revenue } from "@/store/revenue/use-revenue-store"

export function getRevenueTotal(revenues: Revenue[]) {
    return revenues.reduce((acc, curr) => acc + curr.value, 0)
}

export function getExpenseTotal(expenses: Expense[]) {
    return expenses.reduce((acc, curr) => acc + curr.value, 0)
}

export function getExpenseByCategory(expenses: Expense[]) {
    const grouped = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0
        }

        acc[expense.category] += expense.value

        return acc
    }, {} as Record<string, number>)

    return Object.entries(grouped).map(([name, value]) => ({
        name,
        value
    }))
}

export function getRevenueTypeDistribution(
    fix: Revenue[],
    variable: Revenue[]
) {
    const fixTotal = getRevenueTotal(fix)
    const variableTotal = getRevenueTotal(variable)

    return [
        { name: "Fixa", value: fixTotal },
        { name: "Variável", value: variableTotal }
    ]
}

export function getExpenseUsagePercentage(
    revenues: Revenue[],
    expenses: Expense[]
) {
    const revenueTotal = getRevenueTotal(revenues)
    const expenseTotal = getExpenseTotal(expenses)

    if (revenueTotal === 0) return 0

    return Math.round((expenseTotal / revenueTotal) * 100)
}

export function getTopExpenses(expenses: Expense[], limit = 5) {
    return [...expenses]
        .sort((a, b) => b.value - a.value)
        .slice(0, limit)
}