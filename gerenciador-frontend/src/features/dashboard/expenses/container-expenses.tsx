import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateExpense } from "./create-expense";
import { ListExpenses } from "./list-expense";

export function ContainerExpenses() {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="px-4 pb-0 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl">
                    Registre Suas Despesas
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:items-start">
                    <CreateExpense />
                    <ListExpenses />
                </div>
            </CardContent>
        </Card>
    )
}
