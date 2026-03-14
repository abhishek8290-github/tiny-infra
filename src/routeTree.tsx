import {
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { SsoCallbackPage } from "@/pages/SsoCallbackPage";
import { LandingPage } from "@/pages/LandingPage";
import { DomainsPage } from "@/pages/DomainsPage";
import { CLIPage } from "@/pages/CLIPage";
import { PricingPage } from "@/pages/PricingPage";
import { DocsPage } from "@/pages/DocsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

// ============================================================
// Root Route
// ============================================================
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// ============================================================
// Public Routes
// ============================================================
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const domainsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domains",
  component: DomainsPage,
});

const cliRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cli",
  component: CLIPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: PricingPage,
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs",
  component: DocsPage,
});

// ============================================================
// Auth Routes
// ============================================================
const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpPage,
});

const ssoCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sso-callback",
  component: SsoCallbackPage,
});

// ============================================================
// Protected Layout Route
// ============================================================
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: () => (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
});

// ============================================================
// App Routes — Protected
// ============================================================
const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/projects",
  component: ProjectsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: SettingsPage,
});

// ============================================================
// Route Tree
// ============================================================
export const routeTree = rootRoute.addChildren([
  indexRoute,
  domainsRoute,
  cliRoute,
  pricingRoute,
  docsRoute,
  signInRoute,
  signUpRoute,
  ssoCallbackRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    projectsRoute,
    settingsRoute,
  ]),
]);