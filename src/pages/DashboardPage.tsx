// ============================================================
// DashboardPage
// ============================================================
export function DashboardPage() {
  const stats = [
    { label: "Total Projects", value: "24", hint: "+3 this week" },
    { label: "Active Tasks", value: "128", hint: "16 due today" },
    { label: "Team Members", value: "12", hint: "2 invited" },
    { label: "Completion Rate", value: "94%", hint: "Up from 89%" },
  ];

  return (
    <section className="space-y-6 animate-fade-in">
      <header className="space-y-1">
        <h1 className="text-3xl font-display">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back — here’s a quick overview of your workspace.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-border/80 bg-card p-5 shadow-card"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-card-foreground">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-card lg:col-span-2">
          <h2 className="text-base font-semibold">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Design system updated</span>
              <p className="text-muted-foreground">You published new color and spacing tokens.</p>
            </li>
            <li className="rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Website redesign approved</span>
              <p className="text-muted-foreground">Client accepted the new landing page mockups.</p>
            </li>
            <li className="rounded-lg bg-muted/50 p-3">
              <span className="font-medium">Sprint planning completed</span>
              <p className="text-muted-foreground">Roadmap locked for the next two weeks.</p>
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Focus Today</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Finalize onboarding flow</li>
            <li>• Review analytics dashboards</li>
            <li>• Prepare release notes</li>
            <li>• Share weekly team update</li>
          </ul>
        </article>
      </div>
    </section>
  );
}