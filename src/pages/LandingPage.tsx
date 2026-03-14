import { Link } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";

// ============================================================
// LandingPage
// Public marketing page for the product.
// ============================================================
export function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary shadow-card" />
            <span className="font-display text-lg font-semibold">MyApp</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/sign-in"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Built for modern teams
            </p>
            <h1 className="text-gradient text-4xl font-display leading-tight sm:text-5xl">
              Ship better products with one clean workspace.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Plan projects, track progress, and stay aligned with your team — all in one fast and polished dashboard.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to={isSignedIn ? "/dashboard" : "/sign-up"}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {isSignedIn ? "Go to Dashboard" : "Start Free"}
              </Link>
              <Link
                to="/sign-in"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Continue with OAuth
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-elevated">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["99.9%", "Uptime"],
                ["2.4x", "Faster delivery"],
                ["120+", "Teams onboarded"],
                ["24/7", "Realtime sync"],
              ].map(([value, label]) => (
                <article key={label} className="rounded-xl bg-muted/60 p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-card/60">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {[
              {
                title: "Project Planning",
                desc: "Organize tasks, milestones, and responsibilities with crystal clear structure.",
              },
              {
                title: "Team Collaboration",
                desc: "Share updates, reduce noise, and keep everyone aligned in real-time.",
              },
              {
                title: "Analytics Overview",
                desc: "Track delivery performance and progress using simple, meaningful insights.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-border/80 bg-background p-5 shadow-card">
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
