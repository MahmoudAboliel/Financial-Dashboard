import { notFound } from "next/navigation";

import { getClient } from "@/services/client.service";
import ClientDetails from "@/components/clients/ClientDetails";
import PageAnimation from "@/components/shared/PageAnimation";

interface ClientPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ClientPage({
    params,
}: ClientPageProps) {

    const { id } = await params;

    const clientId = Number(id);

    if (Number.isNaN(clientId)) {
        notFound();
    }

    const client = await getClient(clientId);

    if (!client) return notFound();
    
    return (
        <PageAnimation>
            <ClientDetails client={client} />
        </PageAnimation>
    );
    
}