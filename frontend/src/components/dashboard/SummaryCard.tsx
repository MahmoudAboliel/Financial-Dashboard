import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";


interface SummaryCardProps {
    title: string;
    value: string;
    description?: string;
    icon?: LucideIcon;
    valueClassName?: string;
}

export default function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    valueClassName
}: SummaryCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                {Icon && (
                    <Icon className="size-4 text-muted-foreground" />
                )}

            </CardHeader>

            <CardContent>

                <div className={`text-2xl font-bold ${valueClassName ?? ""}`}>
                    {value}
                </div>

                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}

            </CardContent>
        </Card>
    );
}