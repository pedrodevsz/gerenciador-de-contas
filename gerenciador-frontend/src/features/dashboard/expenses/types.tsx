import { z } from "zod"
export const expenseSchema = z.object({
    name: z.string().min(1, "Informe o nome"),

    value: z
        .number()
        .min(0.01, "Informe um valor válido"),

    dueDate: z
        .string()
        .min(1, "Informe a data"),

    category: z
        .string()
        .min(1, "Selecione uma categoria"),

    type: z.enum(["FIX", "VARIABLE"]),

    paid: z.boolean(),
})


export type ExpenseFormInput = z.input<typeof expenseSchema>
export type ExpenseFormData = z.infer<typeof expenseSchema>