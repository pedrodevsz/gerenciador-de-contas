"use client"

import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { Sun, Moon } from "lucide-react"
import { useHydrated } from "@/hooks/use-hydratate"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const mounted = useHydrated()

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <Toggle
            pressed={isDark}
            onPressedChange={(pressed) =>
                setTheme(pressed ? "dark" : "light")
            }
            className="absolute right-2 top-2 rounded-lg border px-4 data-[state=on]:bg-zinc-900 data-[state=on]:text-white">
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </Toggle>
    )
}
