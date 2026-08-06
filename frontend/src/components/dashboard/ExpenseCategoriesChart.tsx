"use client";

import {
    Pie,
    PieChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ExpenseCategory } from "@/types/dashboard";
import { formatCurrency, formatPercentage } from "@/lib/format";
import AnimatedCard from "../shared/AnimatedCard";


interface ExpenseCategoriesChartProps {
    data: ExpenseCategory[];
}

export default function ExpenseCategoriesChart({
    data,
}: ExpenseCategoriesChartProps) {

    const charData = data.map((item, index) => ({
        ...item,
        fill: `var(--chart-${(index % 5) + 1})`
    }))

    return (
        <AnimatedCard>
            <Card className="h-full">

                <CardHeader>
                    <CardTitle>
                        Expense Categories
                    </CardTitle>

                    <CardDescription>
                        Distribution of total expenses by category
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <div className="h-[350px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={charData}
                                    dataKey="total"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    innerRadius={70}
                                    paddingAngle={2}
                                    
                                    label={({ payload: { percentage } }) => formatPercentage(Number(percentage))}
                                />

                                <Tooltip
                                    formatter={(value) =>
                                        formatCurrency(Number(value))
                                    }
                                />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </CardContent>

            </Card>
        </AnimatedCard>
    );
}