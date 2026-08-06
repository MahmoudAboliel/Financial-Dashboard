"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
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
import type { IncomeVsExpenses } from "@/types/dashboard";
import { formatCurrency } from "@/lib/format";
import AnimatedCard from "../shared/AnimatedCard";


interface IncomeVsExpensesChartProps {
    data: IncomeVsExpenses;
}

export default function IncomeVsExpensesChart({
    data,
}: IncomeVsExpensesChartProps) {

    const chartData = [
        {
            name: "Financial Overview",
            Income: data.income,
            Expenses: data.expenses,
        },
    ];

    return (
        <AnimatedCard>
            <Card className="h-full">

                <CardHeader>

                    <CardTitle>
                        Income vs Expenses
                    </CardTitle>

                    <CardDescription>
                        Comparison between total income and expenses
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <div className="h-[350px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
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
                                    dataKey="name"
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

                                <Bar
                                    dataKey="Income"
                                    fill="var(--chart-2)"
                                    radius={[6, 6, 0, 0]}
                                />

                                <Bar
                                    dataKey="Expenses"
                                    fill="var(--chart-4)"
                                    radius={[6, 6, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="mt-4 flex justify-between border-t pt-4 text-sm">

                        <span className="text-muted-foreground">
                            Balance
                        </span>

                        <span className="font-semibold">
                            {formatCurrency(data.balance)}
                        </span>

                    </div>

                </CardContent>

            </Card>
        </AnimatedCard>
    );
}