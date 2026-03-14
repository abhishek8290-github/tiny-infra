import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const cliStyles = `
.dt-page, .dt-page *, .dt-page *::before, .dt-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
.dt-page {
  --bg: #080808; --surface: #111; --border: #1e1e1e; --accent: #c8f135; --text: #f0f0f0; --muted: #666; --card: #0e0e0e;
  background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; min-height: 100vh; overflow-x: hidden; position: relative; cursor: none;
}
.dt-page h1,.dt-page h2,.dt-page h3,.dt-page button,.dt-page a { font-family: 'Syne', sans-serif; }
.dt-page code,.dt-page pre,.dt-page kbd { font-family: 'Space Mono', monospace; }
.dt-page::before { content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:1000;opacity:0.5; }
.dt-cursor { width:12px;height:12px;background:var(--accent);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transition:transform 0.08s linear;mix-blend-mode:difference; }
.dt-cursor-ring { width:36px;height:36px;border:1px solid var(--accent);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transition:transform 0.12s linear;mix-blend-mode:difference;opacity:0.4; }
.dt-nav { display:flex;justify-content:space-between;align-items:center;padding:24px 48px;position:fixed;top:0;left:0;right:0;z-index:1001;transition:border-color 0.3s,background 0.3s; }
.dt-nav.scrolled { border-bottom:1px solid var(--border);background:rgba(8,8,8,0.92);backdrop-filter:blur(12px); }
.dt-logo { font-size:20px;font-weight:800;letter-spacing:-0.5px;display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--text); }
.dt-logo span { color:var(--accent); }
.dt-logo-dot { width:8px;height:8px;background:var(--accent);border-radius:50%;animation:dt-pulse 2s infinite; }
@keyframes dt-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
.dt-nav ul { display:flex;gap:32px;list-style:none; }
.dt-nav a { color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s; }
.dt-nav a:hover { color:var(--text); }
.dt-nav a.active { color:var(--accent); }
.dt-nav-cta { background:var(--accent);color:#000;padding:8px 20px;border-radius:4px;font-weight:700; }

/* HERO */
.cli-hero { min-height:100vh;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;padding:120px 48px 80px;position:relative;overflow:hidden;z-index:1; }
.cli-hero-grid { position:absolute;inset:0;background-image:linear-gradient(rgba(200,241,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,241,53,0.03) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at 50% 50%,black 20%,transparent 75%); }
.cli-hero-glow { position:absolute;width:600px;height:600px;background:radial-gradient(circle,rgba(200,241,53,0.05) 0%,transparent 70%);top:50%;left:25%;transform:translate(-50%,-50%);pointer-events:none; }
.cli-tag { display:inline-flex;align-items:center;gap:8px;background:rgba(200,241,53,0.07);border:1px solid rgba(200,241,53,0.18);color:var(--accent);font-size:12px;font-family:'Space Mono',monospace;padding:6px 14px;border-radius:100px;margin-bottom:32px;width:fit-content;animation:dt-fade-up 0.6s ease both; }
.cli-hero-text h1 { font-size:clamp(52px,6vw,84px);font-weight:800;line-height:0.95;letter-spacing:-3px;animation:dt-fade-up 0.6s ease 0.1s both; }
.cli-hero-text h1 .acc { color:var(--accent); }
.cli-hero-text h1 .dim { color:var(--muted); }
.cli-hero-text p { font-size:17px;color:var(--muted);margin-top:24px;max-width:440px;line-height:1.65;animation:dt-fade-up 0.6s ease 0.2s both; }

/* Install box */
.cli-install { margin-top:36px;animation:dt-fade-up 0.6s ease 0.3s both; }
.cli-install-box { display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid var(--border);padding:14px 20px;border-radius:8px;margin-bottom:10px; }
.cli-install-box code { font-family:'Space Mono',monospace;font-size:15px;color:var(--accent); }
.cli-copy-btn { background:transparent;border:1px solid var(--border);color:var(--muted);padding:5px 14px;font-family:'Space Mono',monospace;font-size:11px;cursor:none;transition:all 0.2s;border-radius:4px; }
.cli-copy-btn:hover { border-color:var(--accent);color:var(--accent); }
.cli-copy-btn.copied { border-color:#4dff91;color:#4dff91; }
.cli-install-alts { display:flex;gap:16px; }
.cli-alt { background:transparent;border:none;font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);cursor:none;transition:color 0.2s;padding:0; }
.cli-alt:hover,.cli-alt.active { color:var(--accent); }

/* Terminal */
.cli-term { background:#090909;border:1px solid var(--border);border-radius:10px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.02); }
.cli-term-head { background:#111;padding:11px 16px;display:flex;align-items:center;gap:7px;border-bottom:1px solid var(--border); }
.cli-td { width:11px;height:11px;border-radius:50%; }
.cli-td.r{background:#ff5f57} .cli-td.y{background:#ffbd2e} .cli-td.g{background:#28ca41}
.cli-tt { font-family:'Space Mono',monospace;font-size:10px;color:var(--muted);margin-left:8px; }
.cli-term-body { padding:24px 26px;font-family:'Space Mono',monospace;font-size:13px;line-height:2;min-height:320px; }
.cli-tl { display:flex;gap:8px; }
.cli-tp { color:var(--accent); }
.cli-tc { color:#fff; }
.cli-to { color:var(--muted);padding-left:18px; }
.cli-ts { color:var(--accent);padding-left:18px; }
.cli-tu { color:#60c8ff;padding-left:18px; }
.cli-tb { display:inline-block;width:7px;height:13px;background:var(--accent);animation:dt-blink 1s infinite;vertical-align:middle; }
@keyframes dt-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

/* COMMANDS */
.cli-section { padding:80px 48px;border-top:1px solid var(--border); }
.cli-section-tag { font-family:'Space Mono',monospace;font-size:11px;color:var(--accent);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px; }
.cli-section h2 { font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-2px;margin-bottom:48px; }
.cli-cmd-grid { display:grid;grid-template-columns:1fr 1fr;gap:2px; }
.cli-cmd-card { background:var(--card);border:1px solid var(--border);padding:28px;transition:all 0.2s;position:relative;overflow:hidden; }
.cli-cmd-card:hover { background:#121212;border-color:#2a2a2a; }
.cli-cmd-card::before { content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:transparent;transition:background 0.2s; }
.cli-cmd-card:hover::before { background:var(--accent); }
.cli-cmd-name { font-family:'Space Mono',monospace;font-size:15px;font-weight:700;color:var(--accent);margin-bottom:8px; }
.cli-cmd-desc { font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);line-height:1.7;margin-bottom:16px; }
.cli-cmd-example { background:var(--bg);padding:10px 14px;font-family:'Space Mono',monospace;font-size:12px;color:#888;border-radius:4px; }
.cli-cmd-example .cp { color:#4dff91; }

/* FLAGS */
.cli-flags-table { width:100%;border-collapse:collapse;margin-top:32px; }
.cli-flags-table th { text-align:left;font-family:'Space Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;padding:10px 16px;border-bottom:1px solid var(--border); }
.cli-flags-table td { padding:14px 16px;border-bottom:1px solid var(--border);font-family:'Space Mono',monospace;font-size:12px;vertical-align:top; }
.cli-flags-table tr:hover td { background:var(--card); }
.cli-flag-name { color:var(--accent); }
.cli-flag-type { color:#60c8ff; }
.cli-flag-default { color:var(--muted); }
.cli-flag-desc { color:#888;line-height:1.6; }

/* VSCODE */
.cli-vscode { display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;padding:80px 48px;border-top:1px solid var(--border); }
.cli-vscode-info h2 { font-size:clamp(36px,4vw,52px);font-weight:800;letter-spacing:-2px;margin-bottom:16px; }
.cli-vscode-info p { font-family:'Space Mono',monospace;font-size:13px;color:var(--muted);line-height:1.8;margin-bottom:28px; }
.cli-vscode-steps { display:flex;flex-direction:column;gap:14px; }
.cli-vstep { display:flex;gap:12px;align-items:center; }
.cli-vstep-icon { font-size:18px;width:32px;text-align:center; }
.cli-vstep-text { font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);line-height:1.6; }
.cli-vstep-text strong { color:var(--text); }
.cli-vscode-preview { background:var(--card);border:1px solid var(--border);border-radius:8px;overflow:hidden; }
.cli-vscode-bar { background:#1e1e1e;padding:9px 14px;font-family:'Space Mono',monospace;font-size:11px;color:var(--muted);border-bottom:1px solid var(--border); }
.cli-palette-input { background:#2d2d2d;border-bottom:1px solid #3d3d3d;padding:10px 14px;font-family:'Space Mono',monospace;font-size:12px;color:#ccc; }
.cli-palette-input span { color:#fff;border-bottom:1px solid #007acc; }
.cli-palette-item { padding:8px 14px;font-family:'Space Mono',monospace;font-size:12px;color:#9d9d9d;transition:background 0.1s;display:flex;align-items:center;gap:8px; }
.cli-palette-item.sel { background:#094771;color:#fff; }
.cli-palette-item .vi { color:#007acc; }

.dt-footer { border-top:1px solid var(--border);padding:36px 48px;display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:12px; }
.dt-logo-sm { font-size:15px; }

@keyframes dt-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

@media(max-width:768px) {
  .dt-page { cursor:auto; }
  .dt-cursor,.dt-cursor-ring { display:none; }
  .dt-nav { padding:18px 24px; }
  .dt-nav ul { display:none; }
  .cli-hero { grid-template-columns:1fr;padding:100px 24px 60px;gap:48px; }
  .cli-section { padding:60px 24px; }
  .cli-cmd-grid { grid-template-columns:1fr; }
  .cli-vscode { grid-template-columns:1fr;padding:60px 24px;gap:48px; }
  .dt-footer { flex-direction:column;gap:12px;text-align:center; }
}
`;

const commands = [
  { name: "portflo login", desc: "Authenticate with your Portflo account. Opens browser, saves token locally. Run once.", example: "$ portflo login" },
  { name: "portflo dev [port]", desc: "Tunnel any local port to a live subdomain instantly. Like ngrok but on your own domain.", example: "$ portflo dev 3000 --name api" },
  { name: "portflo deploy", desc: "Detect project type, build Docker image, push to cloud, create subdomain. Full deploy in one command.", example: "$ portflo deploy --name backend --cloud gcp" },
  { name: "portflo env", desc: "Manage environment variables for your deployed projects. Stored encrypted in your cloud's secrets manager.", example: "$ portflo env set DATABASE_URL=xxx" },
  { name: "portflo logs", desc: "Stream live logs from any deployed project directly to your terminal.", example: "$ portflo logs api --follow" },
  { name: "portflo db", desc: "Provision a managed database on your cloud account. Auto-injects DATABASE_URL into your project.", example: "$ portflo db add postgres --project api" },
  { name: "portflo list", desc: "List all your live projects, subdomains, tunnel status, and cloud provider.", example: "$ portflo list" },
  { name: "portflo down", desc: "Tear down a deployment or kill a tunnel. Cleans up DNS records automatically.", example: "$ portflo down api" },
];

const flags = [
  { name: "--name", type: "string", def: "folder name", desc: "Subdomain prefix. Becomes [name].yourdomain.xyz" },
  { name: "--cloud", type: "enum", def: "gcp", desc: "Cloud provider to deploy to. Options: gcp, aws" },
  { name: "--port", type: "number", def: "auto", desc: "Port your app runs on. Auto-detected from package.json or env" },
  { name: "--domain", type: "string", def: "primary", desc: "Which of your domains to use if you own multiple" },
  { name: "--dockerfile", type: "path", def: "auto-gen", desc: "Path to custom Dockerfile. If omitted, we generate one" },
  { name: "--env-file", type: "path", def: ".env", desc: "Path to env file to inject into deployment" },
  { name: "--watch", type: "boolean", def: "false", desc: "Watch for file changes and redeploy automatically" },
];

const installOptions: Record<string, string> = {
  npm: "npm install -g portflo",
  brew: "brew install portflo/tap/portflo",
  curl: "curl -sf https://portflo.dev/install.sh | sh",
  pnpm: "pnpm add -g portflo",
};

const paletteItems = [
  { icon: "🚀", label: "Portflo: Deploy Current Project", sel: true },
  { icon: "🌐", label: "Portflo: Start Dev Tunnel", sel: false },
  { icon: "📋", label: "Portflo: View Logs", sel: false },
  { icon: "🔑", label: "Portflo: Manage Env Variables", sel: false },
  { icon: "🗄️", label: "Portflo: Add Database", sel: false },
  { icon: "📊", label: "Portflo: Open Dashboard", sel: false },
];

export function CLIPage() {
  const [installPkg, setInstallPkg] = useState("npm");
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const copy = () => {
    navigator.clipboard.writeText(installOptions[installPkg]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    const existing = document.getElementById("landing-fonts");
    let created: HTMLLinkElement | null = null;
    if (!existing) {
      created = document.createElement("link");
      created.id = "landing-fonts";
      created.rel = "stylesheet";
      created.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap";
      document.head.appendChild(created);
    }
    return () => { if (created) document.head.removeChild(created); };
  }, []);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) { cursorRef.current.style.left = `${mx - 6}px`; cursorRef.current.style.top = `${my - 6}px`; }
    };
    const animRing = () => {
      rx += (mx - rx - 18) * 0.3; ry += (my - ry - 18) * 0.3;
      if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(animRing);
    };
    const onScroll = () => navRef.current?.classList.toggle("scrolled", window.scrollY > 20);
    const targets = rootRef.current?.querySelectorAll("button,a,input") ?? [];
    const onEnter = () => { if (cursorRef.current) cursorRef.current.style.transform = "scale(2)"; if (ringRef.current) ringRef.current.style.transform = "scale(1.4)"; };
    const onLeave = () => { if (cursorRef.current) cursorRef.current.style.transform = "scale(1)"; if (ringRef.current) ringRef.current.style.transform = "scale(1)"; };
    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    targets.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    raf = requestAnimationFrame(animRing);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); targets.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); }); };
  }, []);

  return (
    <div className="dt-page" ref={rootRef}>
      <style>{cliStyles}</style>
      <div className="dt-cursor" ref={cursorRef} />
      <div className="dt-cursor-ring" ref={ringRef} />

      <nav className="dt-nav" ref={navRef}>
        <Link to="/" className="dt-logo"><div className="dt-logo-dot" />deploy<span>to</span></Link>
        <ul>
          <li><Link to="/domains">Domains</Link></li>
          <li><Link to="/cli" className="active">CLI</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><Link to="/sign-in" className="dt-nav-cta">Get Started →</Link></li>
        </ul>
      </nav>

      <section className="cli-hero">
        <div className="cli-hero-grid" />
        <div className="cli-hero-glow" />
        <div className="cli-hero-text">
          <div className="cli-tag"><div className="dt-logo-dot" />CLI + VS Code + Cursor</div>
          <h1>Deploy from<br /><span className="acc">anywhere.</span><br /><span className="dim">One command.</span></h1>
          <p>Your terminal becomes the control plane for your entire infrastructure. Install once. Use everywhere.</p>
          <div className="cli-install">
            <div className="cli-install-box">
              <code>{installOptions[installPkg]}</code>
              <button className={`cli-copy-btn${copied ? " copied" : ""}`} onClick={copy}>{copied ? "copied!" : "copy"}</button>
            </div>
            <div className="cli-install-alts">
              {Object.keys(installOptions).map((pkg) => (
                <button key={pkg} className={`cli-alt${installPkg === pkg ? " active" : ""}`} onClick={() => setInstallPkg(pkg)}>{pkg}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="cli-term">
          <div className="cli-term-head">
            <div className="cli-td r" /><div className="cli-td y" /><div className="cli-td g" />
            <span className="cli-tt">~/projects/my-app</span>
          </div>
          <div className="cli-term-body">
            <div className="cli-tl"><span className="cli-tp">❯</span><span className="cli-tc">portflo login</span></div>
            <div className="cli-to">▸ Opening browser for authentication...</div>
            <div className="cli-ts">✓ Logged in as abhishek@gmail.com</div>
            <br />
            <div className="cli-tl"><span className="cli-tp">❯</span><span className="cli-tc">portflo dev 5173 --name myapp</span></div>
            <div className="cli-to">▸ Starting tunnel for port 5173...</div>
            <div className="cli-ts">✓ Tunnel active</div>
            <div className="cli-tu">🌐 https://myapp.abhishek.xyz</div>
            <br />
            <div className="cli-tl"><span className="cli-tp">❯</span><span className="cli-tc">portflo deploy --name api --cloud gcp</span></div>
            <div className="cli-to">▸ Detected: Node.js</div>
            <div className="cli-to">▸ Building Docker image...</div>
            <div className="cli-to">▸ Pushing to Cloud Run...</div>
            <div className="cli-to">▸ Creating DNS record...</div>
            <div className="cli-ts">✓ Deployed in 48s</div>
            <div className="cli-tu">🚀 https://api.abhishek.xyz</div>
            <br />
            <div className="cli-tl"><span className="cli-tp">❯</span><span className="cli-tb" /></div>
          </div>
        </div>
      </section>

      <section className="cli-section">
        <div className="cli-section-tag">// commands</div>
        <h2>Everything you need</h2>
        <div className="cli-cmd-grid">
          {commands.map((cmd) => (
            <div key={cmd.name} className="cli-cmd-card">
              <div className="cli-cmd-name">{cmd.name}</div>
              <div className="cli-cmd-desc">{cmd.desc}</div>
              <div className="cli-cmd-example"><span className="cp">$</span> {cmd.example.replace("$ ", "")}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cli-section">
        <div className="cli-section-tag">// flags</div>
        <h2>deploy flags</h2>
        <table className="cli-flags-table">
          <thead>
            <tr><th>Flag</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            {flags.map((f) => (
              <tr key={f.name}>
                <td className="cli-flag-name">{f.name}</td>
                <td className="cli-flag-type">{f.type}</td>
                <td className="cli-flag-default">{f.def}</td>
                <td className="cli-flag-desc">{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="cli-vscode">
        <div className="cli-vscode-info">
          <div className="cli-section-tag">// editor extension</div>
          <h2>Deploy without leaving your editor.</h2>
          <p>The Portflo VS Code and Cursor extension brings the entire CLI into your command palette. No terminal switching. Just code and ship.</p>
          <div className="cli-vscode-steps">
            {[
              { icon: "🔍", text: <><strong>Cmd+Shift+P</strong> to open command palette</> },
              { icon: "⌨️", text: <>Type <strong>Portflo: Deploy</strong></> },
              { icon: "📝", text: <>Pick subdomain and cloud provider</> },
              { icon: "✅", text: <><strong>api.you.xyz is live.</strong> Notification appears in editor</> },
            ].map((s, i) => (
              <div key={i} className="cli-vstep">
                <div className="cli-vstep-icon">{s.icon}</div>
                <div className="cli-vstep-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="cli-vscode-preview">
          <div className="cli-vscode-bar">📁 my-backend — VS Code</div>
          <div className="cli-palette-input">› <span>Portflo: Deploy Current Project</span></div>
          {paletteItems.map((item, i) => (
            <div key={i} className={`cli-palette-item${item.sel ? " sel" : ""}`}>
              <span className="vi">{item.icon}</span>{item.label}
            </div>
          ))}
        </div>
      </div>

      <footer className="dt-footer">
        <Link to="/" className="dt-logo dt-logo-sm"><div className="dt-logo-dot" />deploy<span>to</span></Link>
        <div>Built for developers who hate config files.</div>
        <div>© 2025 deployto</div>
      </footer>
    </div>
  );
}