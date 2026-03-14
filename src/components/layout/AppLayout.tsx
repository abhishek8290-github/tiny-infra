import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { APP_NAV_ITEMS } from "@/components/layout/nav-items";
import { SidebarProvider } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import theme from "@/theme.config";

// ============================================================
// AppLayout
// Shell for all protected pages.
// Sidebar on the left, page content on the right.
// ============================================================
export function AppLayout() {
  const { user } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-muted/30">

        {/* Mobile top header */}
        <header
          className={cn(
            "fixed inset-x-0 top-0 z-40 h-14 border-b border-border/70",
            "bg-background/90 backdrop-blur md:hidden"
          )}
        >
          <div className="h-full px-4 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
              <div className="h-7 w-7 rounded-lg bg-primary shrink-0 shadow-card" />
              <span className="font-display font-semibold text-foreground truncate">
                {theme.app.name}
              </span>
            </Link>

            <div className="shrink-0">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName}
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {user?.firstName?.[0] ?? "?"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Lightweight top bar */}
          <header className="hidden md:block h-14 shrink-0 border-b border-border/70 bg-background/80 backdrop-blur">
            <div className="h-full px-6 lg:px-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Workspace
                </p>
              </div>
            </div>
          </header>

          {/* Page content — scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 pt-[4.5rem] pb-24 md:p-6 md:pt-6 md:pb-6 lg:p-8">
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 h-16 border-t border-border/70",
          "bg-background/95 backdrop-blur md:hidden"
        )}
      >
        <div className="grid h-full grid-cols-3 px-1">
          {APP_NAV_ITEMS.map((item) => {
            const Icon = item.icon!;
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-[var(--radius-sm)] transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[11px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </SidebarProvider>
  );
}