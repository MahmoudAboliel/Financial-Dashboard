import { ROUTES } from "@/constants/routes";
import { FileText, LayoutDashboard, Settings, Users, Upload } from "lucide-react";

export const navigation = {
    main: [
        {
            title: "Import Data",
            url: "/import",
            icon: Upload,
        },
        {
            title: "Dashboard",
            url: ROUTES.DASHBOARD,
            icon: LayoutDashboard,
            badge: null
        },
        {
            title: "Clients",
            url: ROUTES.CLIENTS,
            icon: Users,
            badge: null
        },
        // {
        //     title: "Reports",
        //     url: ROUTES.REPORTS,
        //     icon: FileText,
        //     badge: null
        // },
    ],
    system: [
        {
            title: "Settings",
            url: ROUTES.SETTINGS,
            icon: Settings,
            badge: null
        },
    ]
}