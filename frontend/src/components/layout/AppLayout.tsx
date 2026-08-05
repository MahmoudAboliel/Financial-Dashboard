"use client";

import { ReactNode } from "react";

import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({
    children,
}: AppLayoutProps) {

    return (

        <SidebarProvider>

            <AppSidebar />

            <SidebarInset>

                <AppHeader />

                <main className="flex-1 p-4 md:p-6">

                    {children}

                </main>

            </SidebarInset>

        </SidebarProvider>

    );
}