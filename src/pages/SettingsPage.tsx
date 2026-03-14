// ============================================================
// SettingsPage
// ============================================================
export function SettingsPage() {
  return (
    <section className="space-y-6 animate-fade-in">
      <header className="space-y-1">
        <h1 className="text-3xl font-display">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your account and workspace preferences.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your name, avatar, and personal details.
          </p>
          <button className="mt-4 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Edit Profile
          </button>
        </article>

        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage email alerts and product updates.
          </p>
          <button className="mt-4 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Notification Preferences
          </button>
        </article>

        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-card lg:col-span-2">
          <h2 className="text-base font-semibold">Workspace</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Control branding, team access, and project defaults.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
            <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              Reset
            </button>
          </div>
        </article>

      </div>
    </section>
  );
}
