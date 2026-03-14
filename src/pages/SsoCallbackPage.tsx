import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

// ============================================================
// SsoCallbackPage
// Handles OAuth redirect completion from Clerk.
// ============================================================
export function SsoCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
