import {
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { SsoCallbackPage } from "@/pages/SsoCallbackPage";
import { LandingPage } from "@/pages/LandingPage";
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
// Auth Routes — Public
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
// All app routes live inside this — sidebar + header
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

// Public landing page route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// ============================================================
// Route Tree
// ============================================================
export const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
  ssoCallbackRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    projectsRoute,
    settingsRoute,
  ]),
]);