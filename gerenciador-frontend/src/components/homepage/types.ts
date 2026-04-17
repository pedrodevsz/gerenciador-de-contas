export type TransactionType = "income" | "expense";

export type Transaction = {
    id: string;
    type: TransactionType;
    title: string;
    amount: number;
    createdAt: Date;
};