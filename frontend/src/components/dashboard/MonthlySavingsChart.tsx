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
import type { MonthlyAverageSavings } from "@/types/dashboard";
import { formatPercentage } from "@/lib/format";


interface MonthlySavingsChartProps {
    data: MonthlyAverageSavings[];
}

export default function MonthlySavingsChart({
    data,
}: MonthlySavingsChartProps) {

    return (
        <Card className="h-full">

            <CardHeader>
                <CardTitle>
                    Monthly Savings Rate
                </CardTitle>

                <CardDescription>
                    Average savings rate over time
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="h-[350px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={data}
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
                                    formatPercentage(Number(value))
                                }
                            />

                            <Tooltip
                                formatter={(value) =>
                                    formatPercentage(Number(value))
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="average_savings_rate"
                                stroke="var(--chart-2)"
                                strokeWidth={3}
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