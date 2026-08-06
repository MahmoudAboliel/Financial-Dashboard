import FinancialFileUpload from "@/components/import/FinancialFileUpload";
import PageAnimation from "@/components/shared/PageAnimation";


export default async function ImportPage() {
    return (
        <PageAnimation>
            <div className="space-y-6">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Import Data
                    </h1>

                    <p className="text-muted-foreground">
                        Importing customer financial data.
                    </p>
                </div>
                <FinancialFileUpload />
            </div>
        </PageAnimation>
    );
}