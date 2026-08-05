"use client";

import { Bell, User } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function AppHeader() {
    return (
        <header className="flex sticky top-0 z-10 bg-gray-50 h-16 shrink-0 items-center justify-between border-b px-4">

            <div className="flex items-center gap-2">
                <SidebarTrigger />

                <Separator
                    orientation="vertical"
                    className="mr-2"
                />

                <h1 className="text-lg font-semibold">
                    Financial Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-4">

                <button
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Notifications"
                >
                    <Bell className="size-5" />
                </button>

                <button
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Profile"
                >
                    <User className="size-5" />
                </button>

            </div>

        </header>
    );
}