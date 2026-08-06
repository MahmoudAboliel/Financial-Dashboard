"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    CalendarDays,
    UserPlus,
    Upload,
} from "lucide-react";

import type { RecentActivity as RecentActivityItem } from "@/types/dashboard";
import AnimatedCard from "../shared/AnimatedCard";

interface RecentActivityProps {
    data: RecentActivityItem[];
}

function formatDate(date: string) {
    return new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export default function RecentActivity({
    data,
}: RecentActivityProps) {

    return (
        <AnimatedCard>
            <Card>

                <CardHeader>

                    <CardTitle>
                        Recent Activity
                    </CardTitle>

                    <CardDescription>
                        Latest activity across the system
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <div className="space-y-6">

                        {data.map((activity, index) => {

                            const isClient =
                                activity.type === "client";

                            const Icon = isClient
                                ? UserPlus
                                : Upload;

                            return (
                                <div
                                    key={`${activity.created_at}-${index}`}
                                    className="flex gap-4"
                                >

                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">

                                        <Icon className="size-4" />

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                            <p className="font-medium">
                                                {activity.description}
                                            </p>

                                            <span className="text-xs text-muted-foreground">
                                                {formatDate(activity.created_at)}
                                            </span>

                                        </div>

                                        <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">

                                            <span>
                                                {activity.client}
                                            </span>

                                            {activity.month && (
                                                <span>
                                                    {activity.month}
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </CardContent>

            </Card>
        </AnimatedCard>
    );
}