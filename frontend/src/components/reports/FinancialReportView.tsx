"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Download,
    Mail,
    Phone,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { FinancialReport } from "@/types/client";

import {
    formatCurrency,
    formatPercentage,
} from "@/lib/format";

import { getVerdictClass } from "@/lib/financial-status";

import {
    downloadFinancialReport,
} from "@/services/client.service";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";  

interface FinancialReportViewProps {
    report: FinancialReport;
    financialMonthId: number;
}

export default function FinancialReportView({
    report,
    financialMonthId
}: FinancialReportViewProps) {

    const monthLabel =
        `${report.month.year}-${String(
            report.month.month
        ).padStart(2, "0")}`;

    const chartData = report.expense_breakdown.map((item, index) => ({
        ...item,
        fill: `var(--chart-${(index % 5) + 1})`
    }))

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <Link
                        className="inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        href={`/clients/${report.client.id}`}
                    >
                        <ArrowLeft className="size-4" />
                    </Link>
                    
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Financial Report
                        </h2>

                        <p className="text-muted-foreground">
                            {report.client.full_name} · {monthLabel}
                        </p>
                    </div>

                </div>

                <Button
                    variant="outline"
                    onClick={() =>
                        downloadFinancialReport(
                            financialMonthId
                        )
                    }
                >
                    <Download className="mr-2 size-4" />
                    Download JSON
                </Button>

            </div>

            {/* Client */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Client Information
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    <div className="grid gap-4 md:grid-cols-3">

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Name
                            </p>

                            <p className="font-medium">
                                {report.client.full_name}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">

                            <Phone className="size-4 text-muted-foreground" />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Phone
                                </p>

                                <p className="font-medium">
                                    {report.client.phone ?? "—"}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-2">

                            <Mail className="size-4 text-muted-foreground" />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Email
                                </p>

                                <p className="font-medium">
                                    {report.client.email ?? "—"}
                                </p>
                            </div>

                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* Summary */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Total Income
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(
                                report.summary.total_income
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Total Expenses
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(
                                report.summary.total_expenses
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Savings
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(
                                report.summary.savings
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Savings Rate
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatPercentage(
                                report.summary.savings_rate
                            )}
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* Verdict */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Financial Assessment
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <span
                        className={`inline-flex rounded-md px-3 py-1.5 text-sm font-medium ${getVerdictClass(
                            report.summary.verdict
                        )}`}
                    >
                        {report.summary.verdict}
                    </span>

                    <div className="rounded-md bg-muted/50 p-4">

                        <p className="text-sm font-medium">
                            Insight
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {report.summary.insight}
                        </p>

                    </div>

                </CardContent>

            </Card>

            {/* Expense Breakdown */}

            <div className="grid gap-6 lg:grid-cols-2">

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Expense Breakdown
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <div className="h-[300px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={chartData}
                                        dataKey="total"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ payload: { percentage } }) => formatPercentage(Number(percentage))}
                                    />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(
                                                Number(value)
                                            )
                                        }
                                    />
                                    <Legend />
                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </CardContent>

                </Card>


                {/* Expense Categories */}

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Expense Categories
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <div className="space-y-4">

                            {report.expense_breakdown.map(
                                (item) => (

                                    <div
                                        key={item.category}
                                        className="space-y-2"
                                    >

                                        <div className="flex items-center justify-between">

                                            <span className="text-sm font-medium">
                                                {item.category}
                                            </span>

                                            <span className="text-sm text-muted-foreground">
                                                {formatPercentage(
                                                    item.percentage
                                                )}
                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-muted-foreground">
                                                Total
                                            </span>

                                            <span className="font-medium">
                                                {formatCurrency(
                                                    item.total
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </CardContent>

                </Card>

            </div>


            {/* Income */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Income Sources
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    {report.income.length === 0 ? (

                        <p className="text-sm text-muted-foreground">
                            No income entries found.
                        </p>

                    ) : (

                        <div className="divide-y">

                            {report.income.map(
                                (income, index) => (

                                    <div
                                        key={`${income.source}-${index}`}
                                        className="flex items-center justify-between py-3"
                                    >

                                        <span className="font-medium">
                                            {income.source}
                                        </span>

                                        <span className="font-semibold">
                                            {formatCurrency(
                                                income.amount
                                            )}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </CardContent>

            </Card>

        </div>
    );
}