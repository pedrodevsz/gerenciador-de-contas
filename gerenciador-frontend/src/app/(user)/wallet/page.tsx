import { FixedTransactionsTables } from "@/features/wallet/fixed-transaction/fixed-transaction-container-card";
import { WalletBalanceCard } from "@/features/wallet/wallet-balance/wallet-balance-card";
import { WalletTransactions } from "@/features/wallet/wallet-transactions/wallet-transactions";

export default function Wallet() {
    return (
        <main className="flex flex-col gap-6 px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            <WalletBalanceCard />
            <FixedTransactionsTables />
            <WalletTransactions />
        </main>
    )
}
