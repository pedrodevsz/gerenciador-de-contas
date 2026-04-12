import z from "zod";

export const revenueSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    value: z.coerce.number().min(0.01, "O valor deve ser maior que zero"),
    dueDate: z.string().min(1, "A data é obrigatória"),
    type: z
        .enum(["FIX", "VARIABLE"])
        .refine((val) => val !== undefined, {
            message: "Selecione o tipo de receita",
        })
});

export type RevenueFormData = z.infer<typeof revenueSchema>;