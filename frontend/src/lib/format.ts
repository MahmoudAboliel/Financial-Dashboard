export function formatCurrency(value: number) {
    return `${value.toLocaleString("en-US")} SYP`;
}

export function formatPercentage(value: number) {
    return `${value.toFixed(2)}%`;
}

export function getFinancialValueClass(value: number) {
    if (value > 0) {
        return "text-emerald-600 dark:text-emerald-400";
    }

    if (value < 0) {
        return "text-destructive";
    }

    return "text-muted-foreground";
}