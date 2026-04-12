import { apiFetch } from "./api";

export type Expense = {
    id?: number;
    name: string;
    value: number;
    dueDate: string;
    type: "FIX" | "VARIABLE";
    category: string;
    paid: boolean;
};

export const ExpenseService = {
    getAll: () => apiFetch("/api/expenses"),

    getById: (id: number) => apiFetch(`/api/expenses/${id}`),

    create: (data: Expense) =>
        apiFetch("/api/expenses", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    update: (id: number, data: Expense) =>
        apiFetch(`/api/expenses/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiFetch(`/api/expenses/${id}`, {
            method: "DELETE",
        }),

    togglePaid: (id: number) =>
        apiFetch(`/api/expenses/${id}/toggle-paid`, {
            method: "PATCH",
        }),
};