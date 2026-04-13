"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
    value?: DateRange
    onChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ value, onChange }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="min-h-11 w-full justify-start text-left font-normal lg:min-w-80"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">
                        {value?.from && value?.to
                            ? `${format(value.from, "dd/MM/yyyy")} - ${format(value.to, "dd/MM/yyyy")}`
                            : "Selecionar período"}
                    </span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto max-w-[calc(100vw-2rem)] p-0" align="start">
                <Calendar
                    mode="range"
                    selected={value}
                    onSelect={onChange}
                    numberOfMonths={1}
                />
            </PopoverContent>
        </Popover>
    )
}
