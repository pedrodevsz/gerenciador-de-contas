import { apiFetch } from "./api";

export type Revenue = {
    id?: number;
    name: string;
    value: number;
    dueDate: string;
    type: "FIX" | "VARIABLE";
};

export const RevenueService = {
    getAll: () => apiFetch("/api/revenues"),

    getById: (id: number) => apiFetch(`/api/revenues/${id}`),

    create: (data: Revenue) =>
        apiFetch("/api/revenues", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    update: (id: number, data: Revenue) =>
        apiFetch(`/api/revenues/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiFetch(`/api/revenues/${id}`, {
            method: "DELETE",
        }),
};