"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <Toggle
            pressed={isDark}
            onPressedChange={(pressed) =>
                setTheme(pressed ? "dark" : "light")
            }
            className="absolute right-2 top-2 px-4 rounded-lg border data-[state=on]:bg-zinc-900 data-[state=on]:text-white">
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </Toggle>
    )
}