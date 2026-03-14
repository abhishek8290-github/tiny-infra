import type { LucideIcon } from "lucide-react";

export type ThemeMode = "light" | "dark" | "system";

export interface AppMeta {
  name: string;
  description: string;
  logo: string;
}

export interface SidebarConfig {
  defaultCollapsed: boolean;
  width: string;
  collapsedWidth: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}
