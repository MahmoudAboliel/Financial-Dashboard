import ClientsTable from "@/components/clients/ClientsTable";
import { getClients } from "@/services/client.service";
import ClientsStats from "@/components/clients/ClientsStats";
import PageAnimation from "@/components/shared/PageAnimation";
import PageTitle from "@/components/shared/PageTitle";


export default async function ClientsPage() {

    const clients = await getClients();
// 768 - 1128
    return (
        <PageAnimation>
            <div className="space-y-6">
                <PageTitle 
                    title="Clients"
                    description="Overview of all clients and their financial performance."
                />

                <ClientsStats
                    clients={clients}
                />
                
                <ClientsTable
                    clients={clients}
                />

            </div>
        </PageAnimation>
    );
}