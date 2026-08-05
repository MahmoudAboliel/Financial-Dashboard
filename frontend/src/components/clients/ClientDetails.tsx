"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Mail,
    Phone,
    CalendarDays,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ClientDetails as ClientDetailsType } from "@/types/client";


import ClientFinancialSummary
    from "./ClientFinancialSummary";

import ClientFinancialChart
    from "./ClientFinancialChart";

import ClientSavingsRateChart
    from "./ClientSavingsRateChart";

import ClientFinancialHistory from "./ClientFinancialHistory";



interface ClientDetailsProps {
    client: ClientDetailsType;
}

export default function ClientDetails({
    client,
}: ClientDetailsProps) {

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <Link
                        href="/clients"
                        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
                    >
                        <ArrowLeft className="size-4" />
                    </Link>

                    <div>

                        <h2 className="text-3xl font-bold tracking-tight">
                            {client.full_name}
                        </h2>

                        <p className="text-muted-foreground">
                            Client financial overview
                        </p>

                    </div>

                </div>

            </div>

            {/* Client Information */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Client Information
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    <div className="grid gap-4 md:grid-cols-3">

                        <div className="flex items-center gap-3">

                            <Phone className="size-4 text-muted-foreground" />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Phone
                                </p>

                                <p className="font-medium">
                                    {client.phone ?? "—"}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3">

                            <Mail className="size-4 text-muted-foreground" />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Email
                                </p>

                                <p className="font-medium">
                                    {client.email ?? "—"}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3">

                            <CalendarDays className="size-4 text-muted-foreground" />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Financial Months
                                </p>

                                <p className="font-medium">
                                    {client.financial_months.length}
                                </p>
                            </div>

                        </div>

                    </div>

                    {client.notes && (
                        <div className="mt-6 border-t pt-4">

                            <p className="text-xs text-muted-foreground">
                                Notes
                            </p>

                            <p className="mt-1 text-sm">
                                {client.notes}
                            </p>

                        </div>
                    )}

                </CardContent>

            </Card>

            <ClientFinancialSummary
                months={client.financial_months}
            />

            <ClientFinancialChart
                months={client.financial_months}
            />

            <ClientSavingsRateChart
                months={client.financial_months}
            />

            <ClientFinancialHistory
                months={client.financial_months}
            />

        </div>
    );
}