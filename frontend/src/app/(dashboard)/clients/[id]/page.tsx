import { notFound } from "next/navigation";

import { getClient } from "@/services/client.service";
import ClientDetails from "@/components/clients/ClientDetails";

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

    try {
        const client = await getClient(clientId);

        return (
            // eslint-disable-next-line react-hooks/error-boundaries
            <ClientDetails client={client} />
        );
    } catch {
        notFound();
    }
}