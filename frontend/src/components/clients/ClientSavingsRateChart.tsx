"use client";

import {
    CartesianGrid,
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

import { formatPercentage } from "@/lib/format";

interface ClientSavingsRateChartProps {
    months: ClientFinancialMonth[];
}

export default function ClientSavingsRateChart({
    months,
}: ClientSavingsRateChartProps) {

    const chartData = months
        .filter((month) => month.report)
        .map((month) => ({
            month: `${month.year}-${String(month.month).padStart(2, "0")}`,
            savingsRate: month.report!.savings_rate,
        }))
        .sort((a, b) =>
            a.month.localeCompare(b.month)
        );

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Savings Rate
                </CardTitle>

                <CardDescription>
                    Savings rate performance over time
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="h-[300px]">

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
                                    `${value}%`
                                }
                            />

                            <Tooltip
                                formatter={(value) =>
                                    formatPercentage(
                                        Number(value)
                                    )
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="savingsRate"
                                name="Savings Rate"
                                stroke="hsl(142 71% 45%)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </CardContent>

        </Card>
    );
}
