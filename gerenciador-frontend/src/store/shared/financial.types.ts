export type FinancialEntryType = "FIX" | "VARIABLE"

export type PageResponse<T> = {
    content: T[]
    totalElements: number
    totalPages: number
}
