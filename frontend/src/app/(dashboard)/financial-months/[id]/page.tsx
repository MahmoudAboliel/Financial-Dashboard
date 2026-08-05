import { notFound } from "next/navigation";

import { getFinancialReport } from "@/services/client.service";
import FinancialReportView from "@/components/reports/FinancialReportView";

interface FinancialReportPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function FinancialReportPage({
    params,
}: FinancialReportPageProps) {

    const { id } = await params;

    const financialMonthId = Number(id);

    if (Number.isNaN(financialMonthId)) {
        notFound();
    }

    try {
        const report = await getFinancialReport(
            financialMonthId
        );

        return (
            // eslint-disable-next-line react-hooks/error-boundaries
            <FinancialReportView
                report={report}
                financialMonthId={id as unknown as number}
            />
        );
    } catch {
        notFound();
    }
}