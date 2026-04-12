"use client"

import { create } from "zustand"

import { createRevenueActions } from "./revenue.actions"
import type { Revenue, RevenueState } from "./revenue.types"

export const useRevenueStore = create<RevenueState>((set, get) => ({
    fixRevenues: [],
    variableRevenues: [],
    loading: false,
    ...createRevenueActions(set, get),
}))

export type { Revenue }
