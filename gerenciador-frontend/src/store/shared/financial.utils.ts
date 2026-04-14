export function sanitizeNumericValue(value: number | string | undefined) {
    const sanitizedValue = Number(value)

    return Number.isNaN(sanitizedValue) ? 0 : sanitizedValue
}

export function sumValues<T extends { value: number }>(items: T[]) {
    return items.reduce((total, item) => total + item.value, 0)
}
