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
import PageTitle from "../shared/PageTitle";
import ClientInfo from "./ClientInfo";
import { ClientInfoItem } from "@/types/client";


interface ClientDetailsProps {
    client: ClientDetailsType;
}

export default function ClientDetails({
    client,
}: ClientDetailsProps) {

    const clientInfoData: ClientInfoItem[] = [
        {
            title: "Phone",
            value: client.phone ?? "—",
            Icon: Phone
        },
        {
            title: "Email",
            value: client.email ?? "—",
            Icon: Mail
        },
        {
            title: "Financial Months",
            value: client.financial_months.length ?? "—",
            Icon: CalendarDays
        },
    ];

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
                    <PageTitle 
                        title={client.full_name}
                        description="Client financial overview"
                    />

                </div>

            </div>

            {/* Client Information */}

            <ClientInfo
                cardTitle="Client Information"
                items={clientInfoData}
            />

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