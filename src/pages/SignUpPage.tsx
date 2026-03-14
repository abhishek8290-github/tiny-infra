import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useSignUp } from "@clerk/clerk-react";
import { AuthLayout } from "@/components/layout/AuthLayout";

// ============================================================
// SignUpPage
// Custom OAuth-only sign up UI powered by Clerk APIs.
// ============================================================
export function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const [submittingProvider, setSubmittingProvider] = useState<"oauth_google" | "oauth_github" | null>(null);

  const handleOAuthSignUp = async (strategy: "oauth_google" | "oauth_github") => {
    setError(null);

    if (!isLoaded) return;

    try {
      setSubmittingProvider(strategy);

      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      const maybeError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const message =
        maybeError?.errors?.[0]?.longMessage ||
        maybeError?.errors?.[0]?.message ||
        "Unable to continue with OAuth. Please try again.";
      setError(message);
    } finally {
      setSubmittingProvider(null);
    }
  };

  return (
    <AuthLayout
      heading="Create an account"
      subheading="Sign up with Google or GitHub"
    >
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => void handleOAuthSignUp("oauth_google")}
          disabled={!isLoaded || submittingProvider !== null}
          className="h-10 w-full rounded-lg border border-input bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submittingProvider === "oauth_google" ? "Redirecting..." : "Sign up with Google"}
        </button>

        <button
          type="button"
          onClick={() => void handleOAuthSignUp("oauth_github")}
          disabled={!isLoaded || submittingProvider !== null}
          className="h-10 w-full rounded-lg border border-input bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submittingProvider === "oauth_github" ? "Redirecting..." : "Sign up with GitHub"}
        </button>

        {error && (
          <p className="rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium text-primary hover:underline">
            Sign in with OAuth
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}