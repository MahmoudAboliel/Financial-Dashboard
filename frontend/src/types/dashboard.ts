export interface DashboardSummary {
    clients_count: number;
    expense_entries_count: number;
    financial_months_count: number;
    income_entries_count: number;
    reports_count: number;
}

export interface DashboardFinancial {
    average_savings_rate: number;
    highest_savings_rate: number;
    lowest_savings_rate: number;
    total_expenses: number;
    total_income: number;
    total_savings: number;
}

export interface ExpenseCategory {
    category: string;
    percentage: number;
    total: number;
}

export interface IncomeVsExpenses {
    balance: number;
    expenses: number;
    income: number;
}

export interface MonthlyAverageSavings {
    average_savings_rate: number;
    month: string;
}

export interface VerdictDistribution {
    count: number;
    verdict: string;
}

export interface DashboardCharts {
    expense_categories: ExpenseCategory[];
    income_vs_expenses: IncomeVsExpenses;
    monthly_average_savings: MonthlyAverageSavings[];
    verdict_distribution: VerdictDistribution[];
}

export interface RecentActivity {
    client: string;
    created_at: string;
    description: string;
    month?: string;
    type: "financial_month" | "client" | string;
}

export interface TopClient {
    average_savings_rate: number;
    client: string;
    months_count: number;
    total_expenses: number;
    total_income: number;
    total_savings: number;
}

export interface TopClients {
    best_clients: TopClient[];
    worst_clients: TopClient[];
}

export interface DashboardData {
    summary: DashboardSummary;
    financial: DashboardFinancial;
    charts: DashboardCharts;
    recent_activity: RecentActivity[];
    top_clients: TopClients;
}