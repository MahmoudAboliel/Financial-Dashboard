import {
    Users,
    CalendarDays,
    FileText,
    Receipt,
    TrendingUp,
    TrendingDown,
    Wallet,
    Percent,
} from "lucide-react";
import SummaryCard from "./SummaryCard";
import { formatCurrency, formatPercentage, getFinancialValueClass } from "@/lib/format";
import type { DashboardData } from "@/types/dashboard";
import AnimatedSummaryCards, { AnimatedSummaryCard } from "../shared/AnimatedSummaryCards";


interface SummaryCardsProps {
    data: DashboardData;
}
export default function SummaryCards({
    data,
}: SummaryCardsProps) {
    const { summary, financial } = data;

    const cardsData = [
        {
            title: "Total Clients",
            value: summary.clients_count.toString(),
            description: "Registered clients",
            icon: Users
        },
        {
            title: "Financial Months",
            value: summary.financial_months_count.toString(),
            description: "Recorded financial months",
            icon: CalendarDays
        },
        {
            title: "Reports",
            value: summary.reports_count.toString(),
            description: "Generated financial reports",
            icon: FileText
        },
        {
            title: "Expense Entries",
            value: summary.expense_entries_count.toString(),
            description: "Recorded expense entries",
            icon: Receipt
        },
        {
            title: "Total Income",
            value: formatCurrency(financial.total_income),
            description: "Total recorded income",
            icon: TrendingUp
        },
        {
            title: "Total Expenses",
            value: formatCurrency(financial.total_expenses),
            description: "Total recorded expenses",
            icon: TrendingDown
        },
        {
            title: "Total Savings",
            value: formatCurrency(financial.total_savings),
            description: "Income minus expenses",
            icon: Wallet,
            valueClassName: getFinancialValueClass(financial.total_savings)
        },
        {
            title: "Average Savings",
            value: formatPercentage(financial.average_savings_rate),
            description: "Average savings rate",
            icon: Percent
        },
    ]

    return (
        
        <div className="space-y-4">
            <AnimatedSummaryCards className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cardsData.map(card => (
                    <AnimatedSummaryCard key={card.title}>
                        <SummaryCard 
                            title={card.title}
                            value={card.value}
                            description={card.description}
                            icon={card.icon}
                            valueClassName={card.valueClassName || undefined}
                        />
                    </AnimatedSummaryCard>
                ))}
            </AnimatedSummaryCards>
        </div>
    );
}