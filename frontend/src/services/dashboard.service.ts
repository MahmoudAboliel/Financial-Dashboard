import { api } from "@/lib/api";
import { DashboardData } from "@/types/dashboard";

export async function getDashboard(): Promise<DashboardData> {
    const response = await api.get("/dashboard");

    return response.data.data;
}