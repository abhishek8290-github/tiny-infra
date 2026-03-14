import { Link } from "@tanstack/react-router";
import theme from "@/theme.config";

// ============================================================
// AuthLayout
// Clean, centered layout used for sign-in and sign-up pages.
// Left side: branding / value prop
// Right side: Clerk auth form
// ============================================================
interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}

export function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-muted/30">

      {/* ---- Left Panel: Branding ---- */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-card border-r border-border relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_40%),radial-gradient(circle_at_bottom_left,hsl(var(--accent-foreground)/0.05),transparent_45%)]" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary shadow-card" />
          <span className="font-display font-semibold text-foreground">
            {theme.app.name}
          </span>
        </Link>

        {/* Center quote / value prop */}
        <div className="relative z-10 space-y-3 max-w-md">
          <blockquote className="text-2xl font-display font-semibold leading-snug text-foreground">
            "The best tool for building your next idea — fast."
          </blockquote>
          <p className="text-muted-foreground text-sm">
            — Built with this starter kit
          </p>
        </div>

        {/* Bottom: subtle footer */}
        <p className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {theme.app.name}. All rights reserved.
        </p>
      </div>

      {/* ---- Right Panel: Auth Form ---- */}
      <div className="flex flex-col items-center justify-center p-6 lg:p-10">

        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="h-7 w-7 rounded-lg bg-primary shadow-card" />
          <span className="font-display font-semibold text-foreground">
            {theme.app.name}
          </span>
        </Link>

        <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-card p-6 shadow-elevated">
          {/* Heading */}
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-display font-semibold text-foreground">
              {heading}
            </h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>

          {/* Clerk form */}
          <div className="w-full">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}