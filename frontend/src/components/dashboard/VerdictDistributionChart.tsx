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

import type { VerdictDistribution } from "@/types/dashboard";
import AnimatedCard from "../shared/AnimatedCard";

interface VerdictDistributionChartProps {
    data: VerdictDistribution[];
}

export default function VerdictDistributionChart({
    data,
}: VerdictDistributionChartProps) {
    return (
        <AnimatedCard>
            <Card className="h-full">

                <CardHeader>
                    <CardTitle>
                        Financial Health
                    </CardTitle>

                    <CardDescription>
                        Distribution of financial health verdicts
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <div className="h-[350px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={data}
                                layout="vertical"
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 20,
                                    bottom: 10,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    type="number"
                                    allowDecimals={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="verdict"
                                    width={120}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    fill="var(--chart-1)"
                                    radius={[0, 6, 6, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </CardContent>

            </Card>
        </AnimatedCard>
    );
}