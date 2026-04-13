"use client"

import { WithLoading } from "@/wrapper/loading-wrapper"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { TableSkeletonBase } from "@/features/dashboard/list/financial-table/financial-skeleton"
import { FixedExpensesTable } from "./fixed-expense-table"
import { FixedRevenuesTable } from "./fixed-revenues-table"

export function FixedTransactionsTables() {
    const isLoading = useFinancialLoading()

    return (
        <WithLoading isLoading={isLoading} fallback={<TableSkeletonBase />}>
            <section className="space-y-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold sm:text-xl">Transações Fixas</h2>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Acompanhe receitas e despesas recorrentes em cartões separados.
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
                <FixedExpensesTable />
                <FixedRevenuesTable />
                </div>
            </section>
        </WithLoading>
    )
}
