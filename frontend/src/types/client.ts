export interface Client {
    id: number;
    full_name: string;
    phone: string | null;
    email: string | null;
    months_count: number;
}

export interface ClientListItem {
    id: number;
    full_name: string;
    phone: string | null;
    email: string | null;
    months_count: number;

    financial: {
        total_income: number;
        total_expenses: number;
        total_savings: number;
        average_savings_rate: number;
    };

    latest_report: {
        year: number;
        month: number;
        savings_rate: number;
        verdict: string;
    } | null;
}

export interface ClientMonth {
    id: number;
    year: number;
    month: number;
    status: string;
}

export interface ClientReport {
    total_income: number;
    total_expenses: number;
    savings: number;
    savings_rate: number;
    verdict: string;
    insight: string;
}

export interface ClientFinancialMonth {
    id: number;
    year: number;
    month: number;
    status: string;
    report: ClientReport | null;
}

export interface ClientDetails {
    id: number;
    full_name: string;
    phone: string | null;
    email: string | null;
    notes: string | null;
    financial_months: ClientFinancialMonth[];
}

export interface FinancialReport {
    client: Omit<Client, 'months_count'>;

    month: Pick<ClientMonth, 'month' | 'year'>;

    summary: ClientReport;

    expense_breakdown: {
        category: string;
        total: number;
        percentage: number;
    }[];

    income: {
        source: string;
        amount: number;
    }[];
}