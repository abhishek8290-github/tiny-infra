// ============================================================
// ProjectsPage
// ============================================================
export function ProjectsPage() {
  const projects = [
    { name: "Marketing Website", status: "In Progress", progress: 72 },
    { name: "Mobile App Revamp", status: "Review", progress: 88 },
    { name: "Admin Portal", status: "Planning", progress: 24 },
    { name: "Analytics Engine", status: "In Progress", progress: 61 },
  ];

  return (
    <section className="space-y-6 animate-fade-in">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-display">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Track milestones, owners, and progress in one place.
          </p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          + New Project
        </button>
      </header>

      <div className="rounded-xl border border-border/80 bg-card shadow-card overflow-hidden">
        <div className="grid grid-cols-12 border-b border-border/80 bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <div className="col-span-5">Project</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-4">Progress</div>
        </div>

        <div className="divide-y divide-border/70">
          {projects.map((project) => (
            <article key={project.name} className="grid grid-cols-12 items-center px-5 py-4 text-sm">
              <div className="col-span-5 font-medium text-card-foreground">{project.name}</div>
              <div className="col-span-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {project.status}
                </span>
              </div>
              <div className="col-span-4 space-y-1.5">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{project.progress}% complete</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
