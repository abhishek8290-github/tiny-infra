import { Link } from "@tanstack/react-router";
import theme from "@/theme.config";
import { BrandLogo } from "@/components/shared/BrandLogo";

const authStyles = `
.auth-shell {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 10%, rgba(200,241,53,0.07), transparent 35%),
    radial-gradient(circle at 80% 0%, rgba(200,241,53,0.06), transparent 30%),
    #080808;
}

.auth-shell::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(200,241,53,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,241,53,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at 50% 20%, black 25%, transparent 80%);
  z-index: 0;
}

.auth-shell::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.45;
  z-index: 0;
}

.auth-layer {
  position: relative;
  z-index: 1;
}
`;

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
    <div className="auth-shell grid lg:grid-cols-2">
      <style>{authStyles}</style>

      {/* ---- Left Panel: Branding ---- */}
      <div className="auth-layer hidden lg:flex flex-col justify-between p-10 bg-card/50 border-r border-border relative overflow-hidden backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_42%),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.14),transparent_48%)]" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2">
          <BrandLogo />
        </Link>

        {/* Center quote / value prop */}
        <div className="relative z-10 space-y-3 max-w-md">
          <blockquote className="text-2xl font-display font-semibold leading-snug text-foreground">
            "The best tool for building your next idea — fast."
          </blockquote>
          <p className="text-muted-foreground text-sm">
            - Built for developers who hate config files.
          </p>
        </div>

        {/* Bottom: subtle footer */}
        <p className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {theme.app.name}. All rights reserved.
        </p>
      </div>

      {/* ---- Right Panel: Auth Form ---- */}
      <div className="auth-layer flex flex-col items-center justify-center p-6 lg:p-10">

        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <BrandLogo size="sm" />
        </Link>

        <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-6 shadow-elevated">
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
