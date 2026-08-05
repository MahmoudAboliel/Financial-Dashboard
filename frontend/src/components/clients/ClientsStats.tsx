"use client";

import {
    AlertTriangle,
    BarChart3,
    Users,
    Wallet,
} from "lucide-react";
import type { ClientListItem } from "@/types/client";
import { formatPercentage } from "@/lib/format";
import SummaryCard from "../dashboard/SummaryCard";


interface ClientsStatsProps {
    clients: ClientListItem[];
}

export default function ClientsStats({
    clients,
}: ClientsStatsProps) {

    const totalClients = clients.length;

    const excellentClients = clients.filter(
        (client) =>
            client.latest_report?.verdict === "Excellent"
    ).length;

    const deficitClients = clients.filter(
        (client) =>
            client.latest_report?.verdict === "Deficit"
    ).length;

    const averageSavingsRate =
        clients.length > 0
            ? clients.reduce(
                  (sum, client) =>
                      sum +
                      client.financial.average_savings_rate,
                  0
              ) / clients.length
            : 0;

    const stats = [
        {
            title: "Total Clients",
            value: totalClients.toString(),
            description: "Registered clients",
            icon: Users,
        },
        {
            title: "Excellent",
            value: excellentClients.toString(),
            description: "Strong financial performance",
            icon: BarChart3,
        },
        {
            title: "Deficit",
            value: deficitClients.toString(),
            description: "Clients requiring attention",
            icon: AlertTriangle,
        },
        {
            title: "Average Savings Rate",
            value: formatPercentage(
                averageSavingsRate
            ),
            description: "Across all clients",
            icon: Wallet,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((stat) => (
                <SummaryCard 
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    description={stat.description}
                    icon={stat.icon}
                />
            ))}

        </div>
    );
}