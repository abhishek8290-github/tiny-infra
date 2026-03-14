import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

// ============================================================
// ProtectedRoute
// Wraps any route that requires authentication.
// Redirects to /sign-in if user is not logged in.
// Shows loading screen while Clerk is initialising.
// ============================================================
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();

  // Clerk is still loading — show spinner
  if (!isLoaded) return <LoadingScreen />;

  // Not signed in — redirect
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  return <>{children}</>;
}