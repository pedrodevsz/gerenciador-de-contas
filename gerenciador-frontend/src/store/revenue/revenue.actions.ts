import type { StateCreator } from "zustand"

import { RevenueService } from "@/services/revenue-service"
import type { PageResponse } from "@/store/shared/financial.types"
import { sanitizeNumericValue } from "@/store/shared/financial.utils"

import type { Revenue, RevenueState } from "./revenue.types"
import { selectRevenueTotal } from "./revenue.selectors"
import { normalizeRevenue, splitRevenuesByType } from "./revenue.utils"

type RevenueStoreCreator = StateCreator<RevenueState>
type SetRevenueStore = Parameters<RevenueStoreCreator>[0]
type GetRevenueStore = Parameters<RevenueStoreCreator>[1]

export function createRevenueActions(
    set: SetRevenueStore,
    get: GetRevenueStore
) {
    return {
        fetchRevenues: async () => {
            try {
                set({ loading: true })

                const response: PageResponse<Revenue> =
                    await RevenueService.getAll()

                const data = response?.content ?? []
                const { fixRevenues, variableRevenues } =
                    splitRevenuesByType(data)

                set({
                    fixRevenues,
                    variableRevenues,
                    loading: false,
                })
            } catch (error) {
                console.error("Erro ao buscar receitas:", error)
                set({ loading: false })
            }
        },

        addRevenue: async (data: Omit<Revenue, "id">) => {
            try {
                const payload = {
                    ...data,
                    value: sanitizeNumericValue(data.value),
                }

                const created = normalizeRevenue(
                    await RevenueService.create(payload)
                )

                if (created.type === "FIX") {
                    set((state) => ({
                        fixRevenues: [...state.fixRevenues, created],
                    }))
                    return
                }

                set((state) => ({
                    variableRevenues: [...state.variableRevenues, created],
                }))
            } catch (error) {
                console.error("Erro ao criar receita:", error)
            }
        },

        removeRevenue: async (id: number | string, type: string) => {
            try {
                await RevenueService.delete(Number(id))

                if (type === "FIX") {
                    set((state) => ({
                        fixRevenues: state.fixRevenues.filter(
                            (revenue) => revenue.id !== id
                        ),
                    }))
                    return
                }

                set((state) => ({
                    variableRevenues: state.variableRevenues.filter(
                        (revenue) => revenue.id !== id
                    ),
                }))
            } catch (error) {
                console.error("Erro ao remover receita:", error)
            }
        },

        getTotal: () => {
            return selectRevenueTotal(get())
        },
    }
}
