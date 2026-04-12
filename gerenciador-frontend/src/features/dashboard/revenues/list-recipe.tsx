"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet } from "lucide-react"
import { useEffect } from "react"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"
import { SummaryCard } from "../list/summary-card/summary-card"
import { FinancialTable } from "../list/financial-table/financial-table"

export function ListRecipe() {
  const { fixRevenues, variableRevenues, removeRevenue, getTotal, fetchRevenues } =
    useRevenueStore()

  useEffect(() => {
    fetchRevenues()
  }, [fetchRevenues])

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">

      <SummaryCard
        title="Saldo Total Receitas"
        value={getTotal()}
        icon={<Wallet className="w-4 h-4" />}
      />

      <Tabs defaultValue="FIX" className="w-full">
        <TabsList className="mb-4 grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:h-12 sm:grid-cols-2 sm:gap-0 sm:bg-zinc-100 sm:p-1 dark:sm:bg-zinc-800">
          <TabsTrigger value="FIX" className="min-h-11 text-sm sm:text-base">
            Recorrentes (Fixas)
          </TabsTrigger>
          <TabsTrigger value="VARIABLE" className="min-h-11 text-sm sm:text-base">
            Pontuais (Variáveis)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="FIX">
          <FinancialTable
            data={fixRevenues}
            type="FIX"
            emptyMessage="Nenhuma receita fixa encontrada."
            onRemove={removeRevenue}
          />
        </TabsContent>

        <TabsContent value="VARIABLE">
          <FinancialTable
            data={variableRevenues}
            type="VARIABLE"
            emptyMessage="Nenhuma receita variável encontrada."
            onRemove={removeRevenue}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
