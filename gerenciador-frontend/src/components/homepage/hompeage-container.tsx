"use client";

import { formatCurrency } from "@/hooks/use-format-currency";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Transaction, TransactionType } from "./types";


const isAuthenticated = false;

function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function HomepageContainer() {
    const router = useRouter();

    const [type, setType] = useState<TransactionType>("income");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const totals = useMemo(() => {
        const income = transactions
            .filter((t) => t.type === "income")
            .reduce((acc, t) => acc + t.amount, 0);

        const expense = transactions
            .filter((t) => t.type === "expense")
            .reduce((acc, t) => acc + t.amount, 0);

        return {
            income,
            expense,
            balance: income - expense,
        };
    }, [transactions]);

    function handleAddTransaction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isAuthenticated) {
            router.push("/register");
            return;
        }

        const safeTitle = title.trim();
        const parsedAmount = Number(amount);

        if (!safeTitle || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            return;
        }

        const newTransaction: Transaction = {
            id: generateId(),
            type,
            title: safeTitle,
            amount: parsedAmount,
            createdAt: new Date(),
        };

        setTransactions((prev) => [newTransaction, ...prev].slice(0, 8));
        setTitle("");
        setAmount("");
        setType("income");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(34,197,94,0.14),_transparent_35%)]" />
            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:py-20">
                <section className="grid items-center gap-10 md:grid-cols-2">
                    <div>
                        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                            Gestão financeira inteligente
                        </span>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Controle suas finanças de forma simples
                        </h1>
                        <p className="mt-4 max-w-xl text-base text-slate-300 md:text-lg">
                            Registre receitas e despesas em segundos, acompanhe seu saldo e
                            tome decisões com mais confiança.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/register"
                                className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                Começar agora
                            </Link>
                            <Link
                                href="/login"
                                className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                            >
                                Já tenho conta
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur">
                        <p className="text-sm font-medium text-slate-300">Resumo rápido</p>
                        <div className="mt-5 grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                                <p className="text-xs text-emerald-300">Receitas</p>
                                <p className="mt-1 text-sm font-semibold text-emerald-200">
                                    {formatCurrency(totals.income)}
                                </p>
                            </div>
                            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3">
                                <p className="text-xs text-rose-300">Despesas</p>
                                <p className="mt-1 text-sm font-semibold text-rose-200">
                                    {formatCurrency(totals.expense)}
                                </p>
                            </div>
                            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                                <p className="text-xs text-cyan-300">Saldo</p>
                                <p className="mt-1 text-sm font-semibold text-cyan-200">
                                    {formatCurrency(totals.balance)}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-white">Adicionar transação</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Simule o lançamento de receitas e despesas.
                        </p>

                        <form onSubmit={handleAddTransaction} className="mt-5 space-y-4">
                            <div>
                                <label htmlFor="type" className="mb-2 block text-sm text-slate-300">
                                    Tipo
                                </label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as TransactionType)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="title" className="mb-2 block text-sm text-slate-300">
                                    Título
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Ex: Salário, Aluguel, Mercado..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="mb-2 block text-sm text-slate-300">
                                    Valor
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0,00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                Adicionar
                            </button>
                        </form>
                    </article>

                    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-white">Últimas transações</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Visualize suas movimentações simuladas.
                        </p>

                        <div className="mt-5 space-y-3">
                            {transactions.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-500">
                                    Nenhuma transação adicionada ainda.
                                </div>
                            ) : (
                                transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-slate-100">
                                                {transaction.title}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {transaction.createdAt.toLocaleTimeString("pt-BR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                        <p
                                            className={`text-sm font-semibold ${transaction.type === "income"
                                                ? "text-emerald-400"
                                                : "text-rose-400"
                                                }`}
                                        >
                                            {transaction.type === "income" ? "+" : "-"}
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </article>
                </section>
            </div>
        </main>
    );
}
