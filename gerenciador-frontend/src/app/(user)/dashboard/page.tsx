import { ExpensesCategoryChart } from "@/features/dashboard/charts/expenses/expenses-category-chart";
import { FinancialEvolutionChart } from "@/features/dashboard/charts/financial-evolution/financial-evolution-chart";
import { RevenueTypeChart } from "@/features/dashboard/charts/revenues/revenues-type-chart";
import { InsightsCard } from "@/features/dashboard/stats/insights-card";

export default function DashboardPage() {
    return (
        <main className="px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <ExpensesCategoryChart />
                    <RevenueTypeChart />
                </div>
                <FinancialEvolutionChart />
                <InsightsCard />
            </div>
        </main>
    )
}
