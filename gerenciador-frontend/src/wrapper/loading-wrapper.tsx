"use client"

interface WithLoadingProps {
    isLoading: boolean
    fallback: React.ReactNode
    children: React.ReactNode
}

export function WithLoading({
    isLoading,
    fallback,
    children
}: WithLoadingProps) {
    if (isLoading) return <>{ fallback } </>

    return <>{ children } </>
}