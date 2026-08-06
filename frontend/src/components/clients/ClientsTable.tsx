"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Eye, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ClientListItem } from "@/types/client";
import { formatCurrency, formatPercentage } from "@/lib/format";
import { getVerdictClass } from "@/lib/financial-status";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ClientsTableProps {
    clients: ClientListItem[];
}

export default function ClientsTable({
    clients,
}: ClientsTableProps) {

    const [search, setSearch] = useState("");

    const [verdictFilter, setVerdictFilter] = useState<string | null>("All");

    const [sortBy, setSortBy] = useState<
        "name" | "income" | "expenses" | "savings" | "rate"
    >("name");

    const filteredClients = useMemo(() => {

        const query = search
            .trim()
            .toLowerCase();

        const filtered = clients.filter(
            (client) => {
                const matchesSearch =
                    client.full_name
                        .toLowerCase()
                        .includes(query) ||
                    client.email
                        ?.toLowerCase()
                        .includes(query) ||
                    client.phone
                        ?.toLowerCase()
                        .includes(query);

                const matchesVerdict =
                    verdictFilter === "All" ||
                    client.latest_report?.verdict === verdictFilter;

                return ( matchesSearch && matchesVerdict)
        });

        return [...filtered].sort(
            (a, b) => {

                switch (sortBy) {

                    case "income":
                        return (
                            b.financial.total_income -
                            a.financial.total_income
                        );

                    case "expenses":
                        return (
                            b.financial.total_expenses -
                            a.financial.total_expenses
                        );

                    case "savings":
                        return (
                            b.financial.total_savings -
                            a.financial.total_savings
                        );

                    case "rate":
                        return (
                            b.financial.average_savings_rate -
                            a.financial.average_savings_rate
                        );

                    default:
                        return a.full_name.localeCompare(
                            b.full_name
                        );
                }
            }
        );

    }, [clients, search, sortBy, verdictFilter]);

    const verdicts = ["All", "Excellent", "Good", "Needs Improvement", "Deficit", "No Income"]

    return (
        <Card className="min-w-0">

            <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle>
                        Clients
                    </CardTitle>
                    <div className="flex min-w-0 flex-col md:flex-row gap-2 ">
                        <div className="relative min-w-0 w-[200px]">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search clients..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                className="pl-9"
                            />

                        </div>
                        <Select
                            value={verdictFilter}
                            onValueChange={(event) => setVerdictFilter(event)}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filter verdict" />
                            </SelectTrigger>
                            <SelectContent>
                                {verdicts.map(item => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="">
                
                <div className="overflow-x-auto">

                    <table className="text-sm w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="px-2 py-3 text-left">
                                    Client
                                </th>

                                <th className="px-2 py-3 text-right">
                                    <SortButton
                                        label="Income"
                                        onClick={() =>
                                            setSortBy("income")
                                        }
                                    />
                                </th>

                                <th className="px-2 py-3 text-right">
                                    <SortButton
                                        label="Expenses"
                                        onClick={() =>
                                            setSortBy("expenses")
                                        }
                                    />
                                </th>

                                <th className="px-2 py-3 text-right">
                                    <SortButton
                                        label="Savings"
                                        onClick={() =>
                                            setSortBy("savings")
                                        }
                                    />
                                </th>

                                <th className="px-2 py-3 text-right">
                                    <SortButton
                                        label="Avg. Rate"
                                        onClick={() =>
                                            setSortBy("rate")
                                        }
                                    />
                                </th>

                                <th className="px-2 py-3 text-center">
                                    Verdict
                                </th>

                                <th className="px-2 py-3 text-right">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredClients.map(
                                (client) => (

                                    <tr
                                        key={client.id}
                                        className="border-b last:border-0"
                                    >

                                        <td className="px-2 py-4">

                                            <div className="space-y-2">

                                                <p className="font-medium">
                                                    {client.full_name}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {client.months_count}{" "}
                                                    months
                                                </p>

                                            </div>

                                        </td>

                                        <td className="px-2 py-4 text-right">
                                            {formatCurrency(
                                                client.financial.total_income
                                            )}
                                        </td>

                                        <td className="px-2 py-4 text-right">
                                            {formatCurrency(
                                                client.financial.total_expenses
                                            )}
                                        </td>

                                        <td className="px-2 py-4 text-right font-medium">
                                            {formatCurrency(
                                                client.financial.total_savings
                                            )}
                                        </td>

                                        <td className="px-2 py-4 text-right">
                                            {formatPercentage(
                                                client.financial.average_savings_rate
                                            )}
                                        </td>

                                        <td className="px-2 py-4 text-center">

                                            {client.latest_report ? (

                                                <span
                                                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${getVerdictClass(
                                                        client.latest_report.verdict
                                                    )}`}
                                                >
                                                    {
                                                        client.latest_report
                                                            .verdict
                                                    }
                                                </span>

                                            ) : (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}

                                        </td>

                                        <td className="px-2 py-4 text-right">

                                            <Link
                                                className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
                                                href={`/clients/${client.id}`}
                                            >
                                                <Eye className="size-4" />
                                            </Link>
                                            
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

                {filteredClients.length === 0 && (

                    <div className="py-10 text-center text-sm text-muted-foreground">
                        No clients found.
                    </div>

                )}

            </CardContent>

        </Card>
    );
}


function SortButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="h-8 px-2"
        >
            {label}
            <ArrowUpDown className="ml-2 size-3.5" />
        </Button>
    );
}