import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "sonner";
import { routeTree } from "@/routeTree";
import "./styles/globals.css";
import theme from "@/theme.config";

// ============================================================
// Clerk
// ============================================================
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
        <h1>Missing Clerk configuration</h1>
        <p>
          Please add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to your
          <code> .env</code> file and restart the dev server.
        </p>
      </div>
    </React.StrictMode>
  );
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env");
}

// ============================================================
// Router
// ============================================================
const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ============================================================
// App Root
// ============================================================
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/sign-in">
      <ThemeProvider
        attribute="class"
        defaultTheme={theme.defaultMode}
        enableSystem
        disableTransitionOnChange
      >
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);