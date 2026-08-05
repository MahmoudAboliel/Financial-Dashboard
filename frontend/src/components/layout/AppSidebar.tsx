"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "./navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar
} from "@/components/ui/sidebar";
const AppSidebar = () => {
    const pathname = usePathname();
    const { open } = useSidebar();

    return (
        <Sidebar
            collapsible="icon"
            
        >
            <SidebarRail />
            <SidebarHeader className={`${!open && 'hidden'}`}>
                <h2 className="px-2 text-lg font-bold">Finance</h2>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupLabel>
                        Main
                    </SidebarGroupLabel>
                    
                    <SidebarMenu>
                        {navigation.main.map(item => (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton
                                    isActive={pathname === item.url}
                                    render={<Link href={item.url} />}
                                >
                                    <item.icon className="size-4" />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>

                    <SidebarGroupLabel>
                        System
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {navigation.system.map(item => (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton
                                    isActive={pathname === item.url}
                                    render={<Link href={item.url} />}
                                >
                                    <item.icon className="size-4" />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter className={`${!open && 'hidden'}`}>
                <div className="px-2 py-2 text-sm text-muted-foreground">
                    Economics Dashboard
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar