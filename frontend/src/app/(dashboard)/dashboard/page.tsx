import { getDashboard } from "@/services/dashboard.service";

import SummaryCards from "@/components/dashboard/SummaryCards";
import ExpenseCategoriesChart from "@/components/dashboard/ExpenseCategoriesChart";
import IncomeVsExpensesChart from "@/components/dashboard/IncomeVsExpensesChart";
import MonthlySavingsChart from "@/components/dashboard/MonthlySavingsChart";
import VerdictDistributionChart from "@/components/dashboard/VerdictDistributionChart";
import TopClientsTable from "@/components/dashboard/TopClientsTable";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PageAnimation from "@/components/shared/PageAnimation";
import PageTitle from "@/components/shared/PageTitle";

export default async function DashboardPage() {

    const dashboard = await getDashboard();

    return (
        <PageAnimation>
            <div className="space-y-6">
                <PageTitle 
                    title="Dashboard"
                    description="Overview of your financial data"
                />

                <SummaryCards
                    data={dashboard}
                />

                <div className="grid gap-4 lg:grid-cols-2">
                    <ExpenseCategoriesChart 
                        data={dashboard.charts.expense_categories}
                    />
                    <IncomeVsExpensesChart
                        data={dashboard.charts.income_vs_expenses}
                    />
                    <MonthlySavingsChart
                        data={dashboard.charts.monthly_average_savings}
                    />
                    <VerdictDistributionChart
                        data={dashboard.charts.verdict_distribution}
                    />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                    <TopClientsTable
                        title="Best Clients"
                        description="Clients with the highest average savings rate"
                        clients={dashboard.top_clients.best_clients}
                    />
                    <TopClientsTable
                        title="Clients Needing Attention"
                        description="Clients with the lowest average savings rate"
                        clients={dashboard.top_clients.worst_clients}
                    />
                </div>
                <RecentActivity
                    data={dashboard.recent_activity}
                />

            </div>
        </PageAnimation>
    );
}