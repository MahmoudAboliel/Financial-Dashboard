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


interface SummaryCardsProps {
    data: DashboardData;
}
export default function SummaryCards({
    data,
}: SummaryCardsProps) {
    const { summary, financial } = data;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    title="Total Clients"
                    value={summary.clients_count.toString()}
                    description="Registered clients"
                    icon={Users}
                />

                <SummaryCard
                    title="Financial Months"
                    value={summary.financial_months_count.toString()}
                    description="Recorded financial months"
                    icon={CalendarDays}
                />

                <SummaryCard
                    title="Reports"
                    value={summary.reports_count.toString()}
                    description="Generated financial reports"
                    icon={FileText}
                />

                <SummaryCard
                    title="Expense Entries"
                    value={summary.expense_entries_count.toString()}
                    description="Recorded expense entries"
                    icon={Receipt}
                />
            </div>
            <hr />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    title="Total Income"
                    value={formatCurrency(financial.total_income)}
                    description="Total recorded income"
                    icon={TrendingUp}
                />

                <SummaryCard
                    title="Total Expenses"
                    value={formatCurrency(financial.total_expenses)}
                    description="Total recorded expenses"
                    icon={TrendingDown}
                />

                <SummaryCard
                    title="Total Savings"
                    value={formatCurrency(financial.total_savings)}
                    description="Income minus expenses"
                    icon={Wallet}
                    valueClassName={getFinancialValueClass(financial.total_savings)}
                />

                <SummaryCard
                    title="Average Savings"
                    value={formatPercentage(financial.average_savings_rate)}
                    description="Average savings rate"
                    icon={Percent}
                />
            </div>
        </div>
    );
}