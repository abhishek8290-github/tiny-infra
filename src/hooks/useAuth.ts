import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";

// ============================================================
// useAuth — Thin wrapper around Clerk's hooks
// Use this everywhere in the app instead of importing
// Clerk directly. Makes it easy to swap auth providers later.
// ============================================================
export function useAuth() {
  const { isLoaded, isSignedIn, signOut } = useClerkAuth();
  const { user } = useUser();

  return {
    // State
    isLoaded,
    isSignedIn: !!isSignedIn,

    // User data — normalised shape
    user: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          fullName: user.fullName ?? "",
          imageUrl: user.imageUrl,
          createdAt: user.createdAt,
        }
      : null,

    // Actions
    signOut: () => signOut(),
  };
}