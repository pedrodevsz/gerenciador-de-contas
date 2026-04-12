"use client"

import { useForm, Controller } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { ExpenseFormData } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel, FieldError, } from "@/components/ui/field"
import { useExpenseStore } from "@/store/expense/use-expense-store"
import { EXPENSE_CATEGORIES } from "./expense-categories"

export function CreateExpense() {
    const addExpense = useExpenseStore((state) => state.addExpense)

    const form = useForm<ExpenseFormData>({
        defaultValues: {
            name: "",
            dueDate: "",
            category: "",
            type: "VARIABLE",
            paid: false,
        },
    })

    const type = form.watch("type")
    async function onSubmit(data: ExpenseFormData) {
        try {
            await addExpense({
                ...data,
                dueDate: data.dueDate?.split("T")[0],
            })

            form.reset()
        } catch (error) {
            console.error("Erro real:", error)
        }
    }

    return (
        <div className="form-card w-full rounded-xl border bg-card p-4 sm:p-6 xl:sticky xl:top-6">
            <div className="form-header mb-5 flex items-center gap-2 text-red-600 sm:mb-6">
                <PlusCircle className="h-5 w-5" />
                <h2 className="text-lg font-bold sm:text-xl">Nova Despesa</h2>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-5 sm:gap-6">

                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Nome da Despesa</FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ex: Aluguel, Internet..."
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <Controller
                            name="category"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Categoria</FieldLabel>

                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {EXPENSE_CATEGORIES.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="type"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Tipo</FieldLabel>
                                    <Select onValueChange={field.onChange} value={field.value} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="FIX">Fixa</SelectItem>
                                            <SelectItem value="VARIABLE">Variável</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />

                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <Controller
                            name="value"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Valor</FieldLabel>

                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                        }
                                        aria-invalid={fieldState.invalid}
                                    />

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
                                    <FieldLabel>
                                        {type === "VARIABLE" ? "Data" : "Vencimento"}
                                    </FieldLabel>

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

                    <Controller
                        name="paid"
                        control={form.control}
                        render={({ field }) => (
                            <Field orientation="horizontal" className="items-start gap-3 rounded-lg border border-border/60 p-3 sm:items-center">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(v) => field.onChange(v === true)}
                                    id="paid"
                                />

                                <FieldLabel className="font-normal" htmlFor="paid">
                                    Marcar como pago
                                </FieldLabel>
                            </Field>
                        )}
                    />

                    <Button type="submit" className="min-h-11 w-full">
                        Adicionar Despesa
                    </Button>

                </FieldGroup>
            </form>
        </div >
    )
}
