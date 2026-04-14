"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LogOut
} from "lucide-react";
import { menuItems } from "./contants-menu";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import useAuthStore from "@/store/auth/auth-store";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    async function handleLogout() {
        await supabase.auth.signOut();
        clearAuth();
        router.replace("/login");
    }

    return (
        <aside className="hidden md:flex flex-col w-72 border-r bg-card p-6 min-h-screen">
            <div className="flex justify-center items-center mb-6">
                <div>
                    <Image src="/favicon.png" alt="Control F" width={180} height={180} />
                </div>
            </div>

            <nav className="flex flex-col gap-1.5 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                                isActive ? "text-primary-foreground" : "text-muted-foreground/70"
                            )} />

                            <span>{item.name}</span>

                            {isActive && (
                                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground/50" />
                            )}
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-auto pt-6 border-t">
                <Button className="w-full" variant="secondary" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span>Sair da conta</span>
                </Button>
            </div>
        </aside>
    );
}
