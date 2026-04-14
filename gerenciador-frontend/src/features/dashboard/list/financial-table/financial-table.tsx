"use client"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useFinancialLoading } from "@/hooks/use-financial-loading"
import { formatCurrency } from "@/hooks/use-format-currency"
import { formatDate } from "@/hooks/use-format-date"
import { WithLoading } from "@/wrapper/loading-wrapper"
import { Trash2 } from "lucide-react"
import { TableSkeletonBase } from "./financial-skeleton"

type BaseItem = {
    id: number | string
    name: string
    value: number
    dueDate: string
}

type ExpenseItem = BaseItem & {
    paid: boolean
}

function hasPaidStatus(item: BaseItem | ExpenseItem): item is ExpenseItem {
    return "paid" in item
}

type FinancialTableProps =
    | {
        data: ExpenseItem[]
        type: "FIX" | "VARIABLE"
        emptyMessage: string
        onRemove: (id: number | string, type: "FIX" | "VARIABLE") => void
        onTogglePaid: (id: number | string, type: "FIX" | "VARIABLE") => void
        showPaid: true
    }
    | {
        data: BaseItem[]
        type: "FIX" | "VARIABLE"
        emptyMessage: string
        onRemove: (id: number | string, type: "FIX" | "VARIABLE") => void
        showPaid?: false
        onTogglePaid?: never
    }

export function FinancialTable(props: FinancialTableProps) {
    const { data, type, emptyMessage, onRemove } = props
    const showPaid = props.showPaid === true
    const isLoading = useFinancialLoading()

    return (
        <WithLoading isLoading={isLoading} fallback={<TableSkeletonBase />}>
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                {data.length === 0 ? (
                    <div className="flex min-h-40 items-center justify-center px-4 py-8 text-center text-sm text-muted-foreground sm:text-base">
                        {emptyMessage}
                    </div>
                ) : (
                    <>
                        <div className="space-y-3 p-3 sm:p-4 md:hidden">
                            {data.map((item) => {
                                const isPaid = showPaid && hasPaidStatus(item) ? item.paid : false

                                return (
                                    <div
                                        key={item.id}
                                        className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-foreground">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(item.dueDate)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-base font-bold text-emerald-600">
                                                {formatCurrency(item.value)}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                {showPaid && (
                                                    <button
                                                        onClick={() => props.onTogglePaid(item.id, type)}
                                                        className={`min-h-10 rounded-md border px-3 py-2 text-xs font-medium transition sm:text-sm ${isPaid
                                                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                                                            : "border-yellow-500/20 bg-yellow-500/10 text-yellow-600"
                                                            }`}
                                                    >
                                                        {isPaid ? "Pago" : "Pendente"}
                                                    </button>
                                                )}

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-10 shrink-0 hover:text-red-500"
                                                    onClick={() => onRemove(item.id, type)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="relative hidden max-h-80 overflow-auto md:block">
                            <Table>
                                <TableHeader className="sticky top-0 z-10 bg-white shadow-sm dark:bg-zinc-950">
                                    <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
                                        <TableHead className="w-[35%]">Nome</TableHead>
                                        {showPaid && <TableHead>Status</TableHead>}
                                        <TableHead>Data</TableHead>
                                        <TableHead className="text-right">Valor</TableHead>
                                        <TableHead className="w-12 text-center">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {data.map((item) => {
                                        const isPaid = showPaid && hasPaidStatus(item) ? item.paid : false

                                        return (
                                            <TableRow
                                                key={item.id}
                                                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20"
                                            >
                                                <TableCell className="font-medium">
                                                    {item.name}
                                                </TableCell>

                                                {showPaid && (
                                                    <TableCell>
                                                        <button
                                                            onClick={() => props.onTogglePaid(item.id, type)}
                                                            className={`flex min-h-9 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition ${isPaid
                                                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                                                                : "border-yellow-500/20 bg-yellow-500/10 text-yellow-600"
                                                                }`}
                                                        >
                                                            {isPaid ? "Pago" : "Pendente"}
                                                        </button>
                                                    </TableCell>
                                                )}

                                                <TableCell>
                                                    {formatDate(item.dueDate)}
                                                </TableCell>

                                                <TableCell className="text-right font-bold text-emerald-600">
                                                    {formatCurrency(item.value)}
                                                </TableCell>

                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="hover:text-red-500 transition-colors"
                                                        onClick={() => onRemove(item.id, type)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                )}
            </div>
        </WithLoading>
    )
}
