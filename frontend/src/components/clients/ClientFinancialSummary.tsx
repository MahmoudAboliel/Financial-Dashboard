"use client";

import {
    ArrowDown,
    ArrowUp,
    Wallet,
    Percent,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { ClientFinancialMonth } from "@/types/client";

import {
    formatCurrency,
    formatPercentage,
} from "@/lib/format";

interface ClientFinancialSummaryProps {
    months: ClientFinancialMonth[];
}

export default function ClientFinancialSummary({
    months,
}: ClientFinancialSummaryProps) {

    const reports = months
        .map((month) => month.report)
        .filter((report) => report !== null);

    const totalIncome = reports.reduce(
        (sum, report) => sum + report.total_income,
        0
    );

    const totalExpenses = reports.reduce(
        (sum, report) => sum + report.total_expenses,
        0
    );

    const totalSavings = reports.reduce(
        (sum, report) => sum + report.savings,
        0
    );

    const averageSavingsRate =
        reports.length > 0
            ? reports.reduce(
                (sum, report) => sum + report.savings_rate,
                0
            ) / reports.length
            : 0;

    const savingsRates = reports.map(
        (report) => report.savings_rate
    );

    const highestSavingsRate =
        savingsRates.length > 0
            ? Math.max(...savingsRates)
            : 0;

    const lowestSavingsRate =
        savingsRates.length > 0
            ? Math.min(...savingsRates)
            : 0;

    const cards = [
        {
            title: "Total Income",
            value: formatCurrency(totalIncome),
            icon: ArrowUp,
        },
        {
            title: "Total Expenses",
            value: formatCurrency(totalExpenses),
            icon: ArrowDown,
        },
        {
            title: "Total Savings",
            value: formatCurrency(totalSavings),
            icon: Wallet,
        },
        {
            title: "Average Savings Rate",
            value: formatPercentage(averageSavingsRate),
            icon: Percent,
        },
        {
            title: "Highest Savings Rate",
            value: formatPercentage(highestSavingsRate),
            icon: ArrowUp,
        },
        {
            title: "Lowest Savings Rate",
            value: formatPercentage(lowestSavingsRate),
            icon: ArrowDown,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (
                    <Card key={card.title}>

                        <CardHeader className="flex flex-row items-center justify-between pb-2">

                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>

                            <Icon className="size-4 text-muted-foreground" />

                        </CardHeader>

                        <CardContent>

                            <div className="text-2xl font-bold">
                                {card.value}
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Based on {reports.length} financial month
                                {reports.length !== 1 ? "s" : ""}
                            </p>

                        </CardContent>

                    </Card>
                );
            })}

        </div>
    );
}