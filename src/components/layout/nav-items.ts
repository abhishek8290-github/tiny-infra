import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";
import type { NavItem } from "@/types";

export const APP_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Settings", href: "/settings", icon: Settings },
];
