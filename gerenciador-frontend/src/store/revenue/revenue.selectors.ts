import { useShallow } from "zustand/react/shallow"

import type { RevenueState } from "./revenue.types"
import { getRevenuesTotal } from "./revenue.utils"

export const selectFixRevenues = (state: RevenueState) => state.fixRevenues

export const selectVariableRevenues = (state: RevenueState) =>
    state.variableRevenues

export const selectAllRevenues = (state: RevenueState) => [
    ...state.fixRevenues,
    ...state.variableRevenues,
]

export const selectRevenueTotal = (state: RevenueState) =>
    getRevenuesTotal(selectAllRevenues(state))

export const useAllRevenuesSelector = () => useShallow(selectAllRevenues)
