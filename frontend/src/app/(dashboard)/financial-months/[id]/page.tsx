import { notFound } from "next/navigation";

import { getFinancialReport } from "@/services/client.service";
import FinancialReportView from "@/components/reports/FinancialReportView";
import PageAnimation from "@/components/shared/PageAnimation";

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

    const report = await getFinancialReport(
        financialMonthId
    );

    if (!report) notFound()

    return (
        <PageAnimation>
            <FinancialReportView
                report={report}
                financialMonthId={id as unknown as number}
            />
        </PageAnimation>
    );
}