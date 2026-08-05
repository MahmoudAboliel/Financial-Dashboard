import ClientsTable from "@/components/clients/ClientsTable";
import { getClients } from "@/services/client.service";
import ClientsStats from "@/components/clients/ClientsStats";


export default async function ClientsPage() {

    const clients = await getClients();

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Clients
                </h1>

                <p className="text-muted-foreground">
                    Overview of all clients and their financial performance.
                </p>
            </div>

            <ClientsStats
                clients={clients}
            />
            
            <ClientsTable
                clients={clients}
            />

        </div>
    );
}