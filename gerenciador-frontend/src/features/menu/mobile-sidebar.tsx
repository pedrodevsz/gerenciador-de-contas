"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
} from "@/components/ui/sheet"
import { menuItems } from "./contants-menu"


export function MobileSidebar() {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-72 p-6">
                <SheetTitle className="flex items-center gap-3 mb-10 text-left">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                        <Wallet className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        Finance<span className="text-primary">.</span>
                    </span>
                </SheetTitle>

                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 rounded-xl px-4 py-4 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Icon className={cn(
                                    "h-5 w-5",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground/70"
                                )} />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-8 left-6 right-6">
                    <div className="rounded-2xl bg-muted/50 p-4 border border-border/50">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                            Versão 1.0.0
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Seu controle financeiro pessoal.
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}