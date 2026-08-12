import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClientInfoItem } from "@/types/client";

interface Props {
    cardTitle: string;
    items: ClientInfoItem[];
    notes?: { title: string; value: string }

}
export default function ClientInfo({ cardTitle, items, notes }: Props) {
  return (
    <Card>

        <CardHeader>
            <CardTitle>
                {cardTitle}
            </CardTitle>
        </CardHeader>

        <CardContent>

            <div className="grid gap-4 md:grid-cols-3">

                {items.map(item => (
                    <div 
                        key={item.title} 
                        className="flex items-center gap-3"
                    >
                        {item.Icon && <item.Icon className="size-4 text-muted-foreground" />}

                        <div>
                            <p className="text-xs text-muted-foreground">
                                {item.title}
                            </p>

                            <p className="font-medium">
                                {item.value}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

            {notes && (
                <div className="mt-6 border-t pt-4">

                    <p className="text-xs text-muted-foreground">
                        {notes.title}
                    </p>

                    <p className="mt-1 text-sm">
                        {notes.value}
                    </p>

                </div>
            )}

        </CardContent>

    </Card>
  )
}
