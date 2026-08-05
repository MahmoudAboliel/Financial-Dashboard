export function getVerdictClass(verdict: string) {
    switch (verdict) {
        case "Excellent":
            return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";

        case "Good":
            return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";

        case "Needs Improvement":
            return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

        case "Deficit":
            return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

        case "No Income":
            return "bg-muted text-muted-foreground";

        default:
            return "bg-muted text-muted-foreground";
    }
}