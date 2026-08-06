"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { TopClient } from "@/types/dashboard";
import { formatCurrency, formatPercentage } from "@/lib/format";
import AnimatedCard from "../shared/AnimatedCard";


interface TopClientsTableProps {
    title: string;
    description: string;
    clients: TopClient[];
}

export default function TopClientsTable({
    title,
    description,
    clients,
}: TopClientsTableProps) {

    return (
        <AnimatedCard>
            <Card>

                <CardHeader>
                    <CardTitle>{title}</CardTitle>

                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>
                                <tr className="border-b text-left">

                                    <th className="pb-3 font-medium">
                                        Client
                                    </th>

                                    <th className="pb-3 text-right font-medium">
                                        Months
                                    </th>

                                    <th className="pb-3 text-right font-medium">
                                        Income
                                    </th>

                                    <th className="pb-3 text-right font-medium">
                                        Expenses
                                    </th>

                                    <th className="pb-3 text-right font-medium">
                                        Savings
                                    </th>

                                    <th className="pb-3 text-right font-medium">
                                        Savings Rate
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {clients.map((client) => (

                                    <tr
                                        key={client.client}
                                        className="border-b last:border-0"
                                    >

                                        <td className="py-3 font-medium">
                                            {client.client}
                                        </td>

                                        <td className="py-3 text-right">
                                            {client.months_count}
                                        </td>

                                        <td className="py-3 text-right">
                                            {formatCurrency(client.total_income)}
                                        </td>

                                        <td className="py-3 text-right">
                                            {formatCurrency(client.total_expenses)}
                                        </td>

                                        <td className="py-3 text-right">
                                            {formatCurrency(client.total_savings)}
                                        </td>

                                        <td className="py-3 text-right font-medium">
                                            {formatPercentage(client.average_savings_rate)}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </CardContent>

            </Card>
        </AnimatedCard>
    );
}