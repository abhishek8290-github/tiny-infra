import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronLeft,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { APP_NAV_ITEMS } from "@/components/layout/nav-items";
import theme from "@/theme.config";
import { BrandLogo } from "@/components/shared/BrandLogo";
const SIDEBAR_WIDTH_STORAGE_KEY = "app-sidebar-width";
const MIN_SIDEBAR_WIDTH = 208;
const MAX_SIDEBAR_WIDTH = 420;

const DEFAULT_SIDEBAR_WIDTH = Number.parseInt(theme.sidebar.width, 10) || 240;

// ============================================================
// Sidebar
// ============================================================
export function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const { user, signOut } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const dragState = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    const storedWidth = window.localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY);
    const parsed = Number.parseInt(storedWidth ?? "", 10);

    if (!Number.isNaN(parsed)) {
      setSidebarWidth(Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, parsed)));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, String(sidebarWidth));
  }, [sidebarWidth]);

  const router = useRouterState();
  const currentPath = router.location.pathname;

  const cycleTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    else if (resolvedTheme === "dark") setTheme("system");
    else setTheme("light");
  };

  const ThemeIcon =
    resolvedTheme === "dark" ? Moon : resolvedTheme === "light" ? Sun : Monitor;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragState.current) return;

      const deltaX = event.clientX - dragState.current.startX;
      const nextWidth = Math.min(
        MAX_SIDEBAR_WIDTH,
        Math.max(MIN_SIDEBAR_WIDTH, dragState.current.startWidth + deltaX)
      );

      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      dragState.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleResizeStart = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (collapsed) return;
    dragState.current = { startX: event.clientX, startWidth: sidebarWidth };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  };

  return (
    <aside
      style={{
        width: collapsed
          ? theme.sidebar.collapsedWidth
          : `${sidebarWidth}px`,
      }}
      className={cn(
        "relative hidden md:flex flex-col h-screen shrink-0",
        "bg-sidebar/95 border-r border-sidebar-border backdrop-blur",
        "transition-all duration-300 ease-in-out"
      )}
    >
      {!collapsed && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute right-0 top-0 z-20 h-full w-1 cursor-col-resize bg-transparent transition-colors hover:bg-sidebar-border/80"
          aria-hidden="true"
        />
      )}

      {/* ---- Top: Logo + Collapse Button ---- */}
      <div
        className={cn(
          "flex items-center h-14 px-3 border-b border-sidebar-border shrink-0",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {/* Logo */}
        {!collapsed && (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 overflow-hidden"
          >
            <BrandLogo
              size="sm"
              textClassName="text-sidebar-foreground"
              accentClassName="text-sidebar-primary"
              dotClassName="bg-sidebar-primary"
            />
          </Link>
        )}

        {collapsed && (
          <Link to="/dashboard">
            <BrandLogo
              size="sm"
              showText={false}
              dotClassName="bg-sidebar-primary"
            />
          </Link>
        )}

        {/* Collapse toggle */}
        {!collapsed && (
          <button
            onClick={toggle}
            className={cn(
              "h-6 w-6 rounded-md flex items-center justify-center shrink-0",
              "text-sidebar-foreground/50 hover:text-sidebar-foreground",
              "hover:bg-sidebar-accent transition-colors"
            )}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ---- Nav Items ---- */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {APP_NAV_ITEMS.map((item) => {
          const Icon = item.icon!;
          const isActive = currentPath === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-[var(--radius-sm)]",
                "text-sm font-medium transition-colors duration-150",
                "group relative",
                collapsed && "justify-center",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-card"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />

              {/* Label */}
              {!collapsed && <span className="truncate">{item.label}</span>}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div
                  className={cn(
                    "absolute left-full ml-3 px-2 py-1 rounded-md",
                    "bg-popover text-popover-foreground text-xs font-medium",
                    "border border-border shadow-elevated",
                    "opacity-0 pointer-events-none group-hover:opacity-100",
                    "transition-opacity duration-150 whitespace-nowrap z-50"
                  )}
                >
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ---- Bottom: Theme + User ---- */}
      <div className="shrink-0 border-t border-sidebar-border p-2 space-y-1 bg-sidebar/70">

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={toggle}
            className={cn(
              "w-full flex items-center justify-center px-2 py-2 rounded-[var(--radius-sm)]",
              "text-sidebar-foreground/50 hover:text-sidebar-foreground",
              "hover:bg-sidebar-accent transition-colors"
            )}
            aria-label="Expand sidebar"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          className={cn(
            "w-full flex items-center gap-3 px-2 py-2 rounded-[var(--radius-sm)]",
            "text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground",
            "hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center"
          )}
          aria-label="Toggle theme"
        >
          <ThemeIcon className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="text-sm font-medium"></span>}
        </button>

        {/* {!collapsed && (
          <div className="px-2 pt-1">
            <label
              htmlFor="theme-preset-select"
              className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-sidebar-foreground/60"
            >
              Preset
            </label>
            <select
              id="theme-preset-select"
              value={activePreset}
              onChange={(event) => handlePresetSelect(event.target.value as ThemePresetKey)}
              className={cn(
                "w-full rounded-md border border-sidebar-border bg-sidebar px-2 py-1.5",
                "text-xs text-sidebar-foreground",
                "focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
              )}
            >
              {presetEntries.map(([presetKey, preset]) => (
                <option key={presetKey} value={presetKey}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
        )} */}

        {/* User row */}
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-[var(--radius-sm)]",
            "hover:bg-sidebar-accent transition-colors group",
            collapsed && "justify-center"
          )}
        >
          {/* Avatar */}
          <div className="shrink-0 relative">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-sidebar-primary flex items-center justify-center">
                <span className="text-xs font-semibold text-sidebar-primary-foreground">
                  {user?.firstName?.[0] ?? "?"}
                </span>
              </div>
            )}
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-sidebar" />
          </div>

          {/* Name + email */}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">
                {user?.fullName || user?.email}
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate">
                {user?.email}
              </p>
            </div>
          )}

          {/* Sign out */}
          {!collapsed && (
            <button
              onClick={signOut}
              className={cn(
                "opacity-70 group-hover:opacity-100 transition-opacity",
                "text-sidebar-foreground/40 hover:text-destructive"
              )}
              aria-label="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
