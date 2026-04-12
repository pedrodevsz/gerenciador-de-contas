"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard } from "lucide-react"
import { SummaryCard } from "../list/summary-card/summary-card"
import { FinancialTable } from "../list/financial-table/financial-table"
import { useExpenseStore } from "@/store/expense/use-expense-store"
import { useEffect } from "react"

export function ListExpenses() {
    const {
        fixExpenses,
        variableExpenses,
        removeExpense,
        togglePaid,
        getTotal,
        fetchExpenses
    } = useExpenseStore()

    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses])

    return (
        <div className="w-full min-w-0 space-y-4 sm:space-y-6">

            <SummaryCard
                title="Total de Despesas"
                value={getTotal()}
                icon={<CreditCard className="w-4 h-4" />}
                valueColorClass="text-red-600 dark:text-red-400"
            />

            <Tabs defaultValue="fix" className="w-full">
                <TabsList className="mb-4 grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:h-12 sm:grid-cols-2 sm:gap-0 sm:bg-zinc-100 sm:p-1 dark:sm:bg-zinc-800">
                    <TabsTrigger value="fix" className="min-h-11 text-sm sm:text-base">
                        Recorrentes (Fixas)
                    </TabsTrigger>
                    <TabsTrigger value="variable" className="min-h-11 text-sm sm:text-base">
                        Pontuais (Variáveis)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="fix">
                    <FinancialTable
                        data={fixExpenses}
                        type="FIX"
                        showPaid
                        emptyMessage="Nenhuma despesa fixa encontrada."
                        onRemove={removeExpense}
                        onTogglePaid={togglePaid}
                    />
                </TabsContent>

                <TabsContent value="variable">
                    <FinancialTable
                        data={variableExpenses}
                        type="VARIABLE"
                        showPaid
                        emptyMessage="Nenhuma despesa variável encontrada."
                        onRemove={removeExpense}
                        onTogglePaid={togglePaid}
                    />
                </TabsContent>
            </Tabs>
        </div >
    )
}
