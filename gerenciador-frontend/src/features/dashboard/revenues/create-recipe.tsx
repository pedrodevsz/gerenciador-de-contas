"use client"

import { useForm, Controller } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { useRevenueStore } from "@/store/revenue/use-revenue-store"
import { RevenueFormData } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateRecipe() {
    const addRevenue = useRevenueStore((state) => state.addRevenue)

    const form = useForm<RevenueFormData>({
        defaultValues: {
            name: "",
            dueDate: "",
            type: "VARIABLE",
        },
    })

    async function onSubmit(data: RevenueFormData) {
        try {
            await addRevenue({
                ...data,
                dueDate: data.dueDate?.split("T")[0],
            })
            form.reset()
        } catch (error) {
            console.error("Erro ao criar receita:", error)
        }
    }

    return (
        <div className="w-full rounded-xl border bg-card p-4 shadow-sm sm:p-6 xl:sticky xl:top-6">

            <div className="mb-5 flex items-center gap-2 text-emerald-600 sm:mb-6">
                <PlusCircle className="h-5 w-5" />
                <h2 className="text-lg font-bold sm:text-xl">Nova Receita</h2>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-5 sm:gap-6">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Nome da Receita</FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ex: Salário, Freelance..."
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="type"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Tipo</FieldLabel>

                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione a recorrência" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="FIX">
                                            Fixa (Mensal)
                                        </SelectItem>

                                        <SelectItem value="VARIABLE">
                                            Variável (Pontual)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <Controller
                            name="value"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Valor</FieldLabel>

                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                            R$
                                        </span>

                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="pl-8"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
                                            }
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </div>

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="dueDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Data</FieldLabel>

                                    <Input
                                        type="date"
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="min-h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        {form.formState.isSubmitting ? "Salvando..." : "Adicionar Receita"}</Button>
                </FieldGroup>
            </form>
        </div>
    )
}
