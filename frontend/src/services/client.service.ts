import { api } from "@/lib/api";
import type {
    Client,
    ClientListItem,
    ClientDetails,
    ClientMonth,
    FinancialReport,
} from "@/types/client";

export async function getClients(): Promise<ClientListItem[]> {
    const response = await api.get("/clients");

    return response.data.data;
}

export async function getClient(
    clientId: number
): Promise<ClientDetails> {
    const response = await api.get(`/clients/${clientId}`);

    return response.data.data;
}

export async function getClientMonths(
    clientId: number
): Promise<ClientMonth[]> {
    const response = await api.get(
        `/clients/${clientId}/months`
    );

    return response.data.data;
}

export async function getFinancialReport(
    financialMonthId: number
): Promise<FinancialReport> {
    const response = await api.get(
        `/financial-months/${financialMonthId}/report`
    );

    return response.data.data;
}

export async function downloadFinancialReport(
    financialMonthId: number
) {
    const response = await api.get(
        `/financial-months/${financialMonthId}/report/download`,
        {
            responseType: "blob",
        }
    );

    const blob = new Blob(
        [response.data],
        {
            type: "application/json",
        }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        `financial_report_${financialMonthId}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
}