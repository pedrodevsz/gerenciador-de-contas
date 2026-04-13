import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/hooks/use-format-currency";
import { formatDate } from "@/hooks/use-format-date";
import { useExpenseStore } from "@/store/expense/use-expense-store";

export function FixedExpensesTable() {
    const fixExpenses = useExpenseStore((s) => s.fixExpenses)

    return (
        <Card className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <CardHeader className="px-4 pb-0 sm:px-6">
                <CardTitle className="text-base font-semibold sm:text-lg">Gastos Fixos</CardTitle>
            </CardHeader>

            <CardContent className="px-4 py-4 sm:px-6 sm:py-5">
                {fixExpenses.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border/80 px-4 py-8 text-center text-sm text-muted-foreground sm:text-base">
                        Nenhum gasto fixo registrado
                    </div>
                ) : (
                    <>
                        <div className="space-y-3 md:hidden">
                            {fixExpenses.map((item) => (
                                <div
                                    key={item.id}
                                    className="space-y-2 rounded-xl border border-border/70 bg-muted/20 p-4"
                                >
                                    <p className="text-sm font-semibold text-foreground">
                                        {item.name}
                                    </p>
                                    <div className="flex items-center justify-between gap-3 text-sm">
                                        <span className="text-muted-foreground">
                                            {formatDate(item.dueDate)}
                                        </span>
                                        <span className="font-bold text-red-500 dark:text-red-400">
                                            {formatCurrency(item.value)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden max-h-64 overflow-auto md:block">
                            <Table className="min-w-full">
                                <TableHeader className="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
                                    <TableRow className="border-border">
                                        <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground lg:px-6">Nome</TableHead>
                                        <TableHead className="px-4 py-3 text-center font-medium text-muted-foreground lg:px-6">Data</TableHead>
                                        <TableHead className="px-4 py-3 text-right font-medium text-muted-foreground lg:px-6">Valor</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fixExpenses.map((item) => (
                                        <TableRow key={item.id} className="border-border transition-colors hover:bg-muted/50">
                                            <TableCell className="truncate px-4 py-4 font-medium text-foreground lg:px-6">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-4 text-center text-muted-foreground lg:px-6">
                                                {formatDate(item.dueDate)}
                                            </TableCell>
                                            <TableCell className="px-4 py-4 text-right font-bold text-red-500 dark:text-red-400 lg:px-6">
                                                {formatCurrency(item.value)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
