"use client";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { ClientFinancialMonth } from "@/types/client";

import { formatCurrency } from "@/lib/format";

interface ClientFinancialChartProps {
    months: ClientFinancialMonth[];
}

export default function ClientFinancialChart({
    months,
}: ClientFinancialChartProps) {

    const chartData = months
        .filter((month) => month.report)
        .map((month) => ({
            month: `${month.year}-${String(month.month).padStart(2, "0")}`,
            income: month.report!.total_income,
            expenses: month.report!.total_expenses,
            savings: month.report!.savings,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Financial Trend
                </CardTitle>

                <CardDescription>
                    Income, expenses and savings over time
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="h-[350px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 10,
                                bottom: 5,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString("en-US")
                                }
                            />

                            <Tooltip
                                formatter={(value) =>
                                    formatCurrency(Number(value))
                                }
                            />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="income"
                                name="Income"
                                stroke="var(--chart-2)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="expenses"
                                name="Expenses"
                                stroke="var(--chart-4)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="savings"
                                name="Savings"
                                stroke="var(--chart-1)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </CardContent>

        </Card>
    );
}