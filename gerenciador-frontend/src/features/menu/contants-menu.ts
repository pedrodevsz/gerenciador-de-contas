import { LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, Settings } from "lucide-react";

interface MenuItemProps {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}
export const menuItems: MenuItemProps[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Carteira", href: "/wallet", icon: Wallet },
    { name: "Receitas", href: "/dashboard/revenues", icon: ArrowUpRight },
    { name: "Despesas", href: "/dashboard/expenses", icon: ArrowDownLeft },
    { name: "Configurações", href: "/settings", icon: Settings },
];
