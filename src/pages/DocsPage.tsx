import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const docsStyles = `
.dt-page, .dt-page *, .dt-page *::before, .dt-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
.dt-page {
  --bg: #080808; --surface: #111; --border: #1e1e1e; --accent: #c8f135; --text: #f0f0f0; --muted: #666; --card: #0e0e0e;
  background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; min-height: 100vh; overflow-x: hidden; position: relative; cursor: none;
}
.dt-page h1,.dt-page h2,.dt-page h3,.dt-page button,.dt-page a { font-family: 'Syne', sans-serif; }
.dt-page code,.dt-page pre { font-family: 'Space Mono', monospace; }
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

/* LAYOUT */
.docs-layout { display:grid;grid-template-columns:240px 1fr;margin-top:65px;min-height:calc(100vh - 65px); }

/* SIDEBAR */
.docs-sidebar { border-right:1px solid var(--border);padding:32px 0;position:sticky;top:65px;height:calc(100vh - 65px);overflow-y:auto; }
.docs-sidebar::-webkit-scrollbar { width:3px; }
.docs-sidebar::-webkit-scrollbar-thumb { background:var(--border); }
.docs-sidebar-section { margin-bottom:28px; }
.docs-sidebar-label { font-family:'Space Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;padding:0 20px;margin-bottom:8px; }
.docs-sidebar-link { display:block;padding:7px 20px;font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);text-decoration:none;cursor:none;transition:all 0.15s;border-left:2px solid transparent; }
.docs-sidebar-link:hover { color:var(--text);background:rgba(255,255,255,0.02); }
.docs-sidebar-link.active { color:var(--accent);border-left-color:var(--accent);background:rgba(200,241,53,0.04); }

/* CONTENT */
.docs-content { padding:52px 64px;max-width:820px; }
.docs-eyebrow { font-family:'Space Mono',monospace;font-size:11px;color:var(--accent);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px; }
.docs-content h1 { font-size:36px;font-weight:800;letter-spacing:-1.5px;margin-bottom:16px; }
.docs-content h2 { font-size:22px;font-weight:700;letter-spacing:-0.5px;margin:44px 0 14px;padding-top:44px;border-top:1px solid var(--border); }
.docs-content h2:first-of-type { border-top:none;padding-top:0;margin-top:0; }
.docs-content h3 { font-size:15px;font-weight:700;margin:24px 0 10px;color:#aaa; }
.docs-content p { font-family:'Space Mono',monospace;font-size:13px;color:var(--muted);line-height:1.9;margin-bottom:16px; }
.docs-content a { color:var(--accent);text-decoration:none;cursor:none; }
.docs-content a:hover { text-decoration:underline; }
.docs-content ul { padding-left:0;margin-bottom:16px;display:flex;flex-direction:column;gap:8px;list-style:none; }
.docs-content ul li { font-family:'Space Mono',monospace;font-size:13px;color:var(--muted);line-height:1.7;padding-left:18px;position:relative; }
.docs-content ul li::before { content:'→';position:absolute;left:0;color:var(--accent);font-size:11px; }

/* CODE BLOCK */
.docs-code { background:#060708;border:1px solid var(--border);margin:16px 0;position:relative;overflow:hidden;border-radius:6px; }
.docs-code-header { display:flex;justify-content:space-between;align-items:center;padding:9px 16px;border-bottom:1px solid var(--border);font-family:'Space Mono',monospace;font-size:11px;color:var(--muted); }
.docs-code pre { padding:20px;overflow-x:auto; }
.docs-code code { font-family:'Space Mono',monospace;font-size:12.5px;line-height:1.9;color:#888; }
.docs-code code .ck { color:var(--accent); }
.docs-code code .cs { color:#60c8ff; }
.docs-code code .cc { color:#444; }
.docs-code code .cv { color:#ff9d6c; }
.docs-copy { background:transparent;border:1px solid var(--border);color:var(--muted);padding:3px 10px;font-family:'Space Mono',monospace;font-size:10px;cursor:none;transition:all 0.2s;border-radius:4px; }
.docs-copy:hover { border-color:var(--accent);color:var(--accent); }
.docs-copy.copied { border-color:#4dff91;color:#4dff91; }

/* INLINE CODE */
.ic { font-family:'Space Mono',monospace;font-size:12px;background:var(--surface);border:1px solid var(--border);padding:1px 6px;color:#4dff91;border-radius:3px; }

/* INFO / WARN */
.docs-info { border-left:2px solid var(--accent);background:rgba(200,241,53,0.03);padding:14px 18px;margin:20px 0;border-radius:0 4px 4px 0; }
.docs-info p { margin:0;font-size:12px; }
.docs-warn { border-left:2px solid #ff6b47;background:rgba(255,107,71,0.03);padding:14px 18px;margin:20px 0;border-radius:0 4px 4px 0; }
.docs-warn p { margin:0;font-size:12px;color:var(--muted); }

/* BADGE */
.docs-badge { display:inline-block;font-family:'Space Mono',monospace;font-size:10px;padding:2px 7px;margin-left:8px;vertical-align:middle;border-radius:3px; }
.docs-badge.get { background:rgba(96,200,255,0.1);color:#60c8ff;border:1px solid rgba(96,200,255,0.2); }
.docs-badge.post { background:rgba(200,241,53,0.1);color:var(--accent);border:1px solid rgba(200,241,53,0.2); }
.docs-badge.del { background:rgba(255,107,71,0.1);color:#ff6b47;border:1px solid rgba(255,107,71,0.2); }

.dt-footer { border-top:1px solid var(--border);padding:36px 48px;display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:12px; }
.dt-logo-sm { font-size:15px; }

@keyframes dt-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

@media(max-width:768px) {
  .dt-page { cursor:auto; }
  .dt-cursor,.dt-cursor-ring { display:none; }
  .dt-nav { padding:18px 24px; }
  .dt-nav ul { display:none; }
  .docs-layout { grid-template-columns:1fr; }
  .docs-sidebar { display:none; }
  .docs-content { padding:32px 24px; }
  .dt-footer { flex-direction:column;gap:12px;text-align:center; }
}
`;

type DocId = "quickstart" | "install" | "connect-aws" | "connect-gcp" | "buy-domain" | "cli-dev" | "cli-deploy" | "cli-env" | "api-domains" | "api-deploy" | "guide-nextjs";

const sidebar = [
  { label: "Getting Started", links: [{ id: "quickstart" as DocId, label: "Quickstart" }, { id: "install" as DocId, label: "Installation" }, { id: "connect-aws" as DocId, label: "Connect AWS" }, { id: "connect-gcp" as DocId, label: "Connect GCP" }] },
  { label: "Domains", links: [{ id: "buy-domain" as DocId, label: "Buying a domain" }] },
  { label: "CLI", links: [{ id: "cli-dev" as DocId, label: "portflo dev" }, { id: "cli-deploy" as DocId, label: "portflo deploy" }, { id: "cli-env" as DocId, label: "portflo env" }] },
  { label: "API Reference", links: [{ id: "api-domains" as DocId, label: "Domains" }, { id: "api-deploy" as DocId, label: "Deploy" }] },
  { label: "Guides", links: [{ id: "guide-nextjs" as DocId, label: "Deploy Next.js" }] },
];

function CodeBlock({ lang, children, onCopy }: { lang: string; children: React.ReactNode; onCopy?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (onCopy) navigator.clipboard.writeText(onCopy).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  return (
    <div className="docs-code">
      <div className="docs-code-header">
        <span>{lang}</span>
        {onCopy && <button className={`docs-copy${copied ? " copied" : ""}`} onClick={copy}>{copied ? "copied!" : "copy"}</button>}
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

const docs: Record<DocId, React.ReactNode> = {
  quickstart: (
    <>
      <div className="docs-eyebrow">// getting started</div>
      <h1>Quickstart</h1>
      <p>Get from zero to a live URL on your own domain in under 5 minutes. This guide assumes you have a domain purchased through Portflo and Node.js 18+ installed.</p>
      <h2>1. Install the CLI</h2>
      <CodeBlock lang="bash" onCopy="npm install -g portflo">
        <span className="ck">npm</span>{" install -g portflo"}
      </CodeBlock>
      <h2>2. Login</h2>
      <p>Authenticate the CLI with your Portflo account. This opens a browser window and saves a token locally.</p>
      <CodeBlock lang="bash" onCopy="portflo login">
        <span className="ck">portflo</span>{" login\n"}<span className="cc">{"# ▸ Opening browser...\n# ✓ Logged in as you@email.com"}</span>
      </CodeBlock>
      <h2>3. Start a dev tunnel</h2>
      <p>Already have something running locally? Make it live instantly with <span className="ic">portflo dev</span>.</p>
      <CodeBlock lang="bash">
        <span className="cc">{"# Start your local server first\n"}</span>
        <span className="ck">npm</span>{" run dev\n"}
        <span className="cc">{"# Running on http://localhost:5173\n\n# In another terminal\n"}</span>
        <span className="ck">portflo</span>{" dev 5173 --name myapp\n"}
        <span className="cc">{"# ✓ Live at https://myapp.john.xyz"}</span>
      </CodeBlock>
      <h2>4. Deploy to cloud</h2>
      <p>When you're ready to ship permanently, deploy to your cloud account. Portflo detects your project type and handles everything.</p>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" deploy --name api --cloud gcp\n"}
        <span className="cc">{"# ▸ Detected: Node.js\n# ▸ Building Docker image...\n# ▸ Pushing to Cloud Run...\n# ▸ Creating DNS record api.john.xyz...\n# ✓ Live at https://api.john.xyz (52s)"}</span>
      </CodeBlock>
      <div className="docs-info">
        <p>💡 <strong>Tip:</strong> Run <span className="ic">portflo deploy --watch</span> during development to automatically redeploy on file changes.</p>
      </div>
      <h2>5. Set environment variables</h2>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" env set DATABASE_URL="}<span className="cv">"postgresql://..."</span>{" --project api\n"}
        <span className="ck">portflo</span>{" env set JWT_SECRET="}<span className="cv">"supersecret"</span>{" --project api\n"}
        <span className="cc">{"# ✓ 2 variables set. Redeploying..."}</span>
      </CodeBlock>
      <div className="docs-warn">
        <p>⚠️ Never commit <span className="ic">.env</span> files. Use <span className="ic">portflo env set</span> for all secrets — stored encrypted in your cloud's secrets manager.</p>
      </div>
      <h2>Next steps</h2>
      <ul>
        <li>Connect your AWS or GCP account for cloud deploys</li>
        <li>Add a managed database with portflo db add postgres</li>
        <li>Install the VS Code extension to deploy without leaving your editor</li>
      </ul>
    </>
  ),
  install: (
    <>
      <div className="docs-eyebrow">// cli</div>
      <h1>Installation</h1>
      <p>The Portflo CLI runs on macOS, Linux, and Windows. Node.js 18+ required.</p>
      <h2>via npm</h2>
      <CodeBlock lang="bash" onCopy="npm install -g portflo"><span className="ck">npm</span>{" install -g portflo"}</CodeBlock>
      <h2>via Homebrew (macOS)</h2>
      <CodeBlock lang="bash" onCopy="brew install portflo/tap/portflo"><span className="ck">brew</span>{" install portflo/tap/portflo"}</CodeBlock>
      <h2>via curl (Linux)</h2>
      <CodeBlock lang="bash" onCopy="curl -sf https://portflo.dev/install.sh | sh"><span className="ck">curl</span>{" -sf https://portflo.dev/install.sh | sh"}</CodeBlock>
      <h2>Verify installation</h2>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" --version\n"}<span className="cc">{"# portflo/1.0.0 darwin-arm64 node-v20.0.0"}</span>
      </CodeBlock>
    </>
  ),
  "connect-aws": (
    <>
      <div className="docs-eyebrow">// setup</div>
      <h1>Connect AWS</h1>
      <p>Connect your AWS account once. Portflo will use your credentials to deploy containers, manage DNS, and provision databases — all in your own account.</p>
      <h2>Create an IAM user</h2>
      <p>Go to AWS Console → IAM → Users → Create User. Give it the following permissions:</p>
      <ul>
        <li>AmazonECS_FullAccess</li>
        <li>AmazonEC2ContainerRegistryFullAccess</li>
        <li>AmazonRDSFullAccess</li>
        <li>SecretsManagerReadWrite</li>
      </ul>
      <h2>Add credentials to CLI</h2>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" cloud connect aws\n"}<span className="cc">{"# ? AWS Access Key ID: ...\n# ? AWS Secret Access Key: ...\n# ? Default region: ap-south-1\n# ✓ AWS connected"}</span>
      </CodeBlock>
      <div className="docs-warn">
        <p>⚠️ Credentials are stored encrypted locally at <span className="ic">~/.portflo/config.json</span> and never sent to Portflo servers.</p>
      </div>
    </>
  ),
  "connect-gcp": (
    <>
      <div className="docs-eyebrow">// setup</div>
      <h1>Connect GCP</h1>
      <p>Connect your Google Cloud account. Portflo uses Cloud Run for serverless containers and Cloud DNS for subdomain management.</p>
      <h2>Enable required APIs</h2>
      <p>In your GCP project, enable: Cloud Run API, Artifact Registry API, Cloud DNS API, Secret Manager API.</p>
      <h2>Create a service account</h2>
      <p>Go to GCP Console → IAM → Service Accounts → Create. Assign roles: Cloud Run Admin, Artifact Registry Admin, DNS Admin, Secret Manager Admin.</p>
      <h2>Connect via CLI</h2>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" cloud connect gcp\n"}<span className="cc">{"# ? Path to service account JSON: ./service-account.json\n# ? GCP Project ID: my-project-123\n# ✓ GCP connected"}</span>
      </CodeBlock>
    </>
  ),
  "buy-domain": (
    <>
      <div className="docs-eyebrow">// domains</div>
      <h1>Buying a domain</h1>
      <p>Purchase a domain through Portflo and it's instantly configured with Cloudflare DNS. No manual nameserver setup required.</p>
      <h2>Via the dashboard</h2>
      <p>Go to portflo.dev → search your domain → pay via Stripe. Within 2 minutes your domain is registered and DNS is live.</p>
      <h2>What happens automatically</h2>
      <ul>
        <li>Domain registered via Cloudflare Registrar at cost price</li>
        <li>Cloudflare DNS zone created for your domain</li>
        <li>Nameservers pointed to Cloudflare</li>
        <li>SSL certificates auto-provisioned for all subdomains</li>
      </ul>
      <div className="docs-info">
        <p>💡 DNS propagation typically completes within 2 minutes, but can take up to 24 hours in rare edge cases.</p>
      </div>
    </>
  ),
  "cli-dev": (
    <>
      <div className="docs-eyebrow">// cli</div>
      <h1>portflo dev</h1>
      <p>Tunnel any local port to a live public URL on your domain. Works behind NAT and firewalls via Cloudflare Tunnel. No port forwarding needed.</p>
      <h2>Usage</h2>
      <CodeBlock lang="bash"><span className="ck">portflo</span>{" dev <port> [flags]"}</CodeBlock>
      <h2>Examples</h2>
      <CodeBlock lang="bash">
        <span className="cc">{"# Basic tunnel\n"}</span>
        <span className="ck">portflo</span>{" dev 5173\n\n"}
        <span className="cc">{"# Custom subdomain name\n"}</span>
        <span className="ck">portflo</span>{" dev 3000 --name api\n\n"}
        <span className="cc">{"# Specify domain if you own multiple\n"}</span>
        <span className="ck">portflo</span>{" dev 8080 --name backend --domain john.dev"}
      </CodeBlock>
      <h2>Flags</h2>
      <ul>
        <li><span className="ic">--name</span> — subdomain prefix (default: random)</li>
        <li><span className="ic">--domain</span> — which domain to use (default: primary)</li>
      </ul>
      <p>Press <span className="ic">Ctrl+C</span> to stop the tunnel. The subdomain is automatically removed from DNS.</p>
    </>
  ),
  "cli-deploy": (
    <>
      <div className="docs-eyebrow">// cli</div>
      <h1>portflo deploy</h1>
      <p>Auto-detect your project type, build a Docker image, push it to your cloud, and create a live subdomain. All in one command.</p>
      <h2>Usage</h2>
      <CodeBlock lang="bash"><span className="ck">portflo</span>{" deploy [flags]"}</CodeBlock>
      <h2>Project detection</h2>
      <ul>
        <li>package.json → Node.js (auto Dockerfile)</li>
        <li>requirements.txt → Python (auto Dockerfile)</li>
        <li>go.mod → Go (auto Dockerfile)</li>
        <li>Dockerfile → used as-is</li>
        <li>next.config.js → Next.js (static or SSR)</li>
        <li>index.html → static site (S3)</li>
      </ul>
      <h2>Examples</h2>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" deploy --name api --cloud gcp\n"}
        <span className="ck">portflo</span>{" deploy --name frontend --cloud aws\n"}
        <span className="ck">portflo</span>{" deploy --name backend --watch"}
      </CodeBlock>
    </>
  ),
  "cli-env": (
    <>
      <div className="docs-eyebrow">// cli</div>
      <h1>portflo env</h1>
      <p>Manage environment variables for your deployed projects. All values are encrypted and stored in your cloud's native secrets manager.</p>
      <h2>Commands</h2>
      <CodeBlock lang="bash">
        <span className="cc">{"# Set a variable\n"}</span>
        <span className="ck">portflo</span>{" env set KEY="}<span className="cv">value</span>{" --project api\n\n"}
        <span className="cc">{"# List all variables\n"}</span>
        <span className="ck">portflo</span>{" env list --project api\n\n"}
        <span className="cc">{"# Delete a variable\n"}</span>
        <span className="ck">portflo</span>{" env delete KEY --project api"}
      </CodeBlock>
      <div className="docs-info">
        <p>💡 Setting an env var automatically triggers a redeploy so your app picks up the new value immediately.</p>
      </div>
    </>
  ),
  "api-domains": (
    <>
      <div className="docs-eyebrow">// api reference</div>
      <h1>Domains API</h1>
      <p>All requests require a Bearer token. Base URL: <span className="ic">https://api.portflo.dev/v1</span></p>
      <h2>Search domains <span className="docs-badge get">GET</span></h2>
      <CodeBlock lang="Request">
        {"GET /domains/search?q=john\n\nAuthorization: Bearer "}<span className="cv">{"{token}"}</span>
      </CodeBlock>
      <CodeBlock lang="Response">
        {"{\n  "}<span className="cs">"results"</span>{": [\n    { "}<span className="cs">"domain"</span>{": "}<span className="cv">"john.xyz"</span>{", "}<span className="cs">"available"</span>{": "}<span className="ck">true</span>{", "}<span className="cs">"price"</span>{": "}<span className="cv">12</span>{" },\n    { "}<span className="cs">"domain"</span>{": "}<span className="cv">"john.dev"</span>{", "}<span className="cs">"available"</span>{": "}<span className="ck">true</span>{", "}<span className="cs">"price"</span>{": "}<span className="cv">15</span>{" },\n    { "}<span className="cs">"domain"</span>{": "}<span className="cv">"john.com"</span>{", "}<span className="cs">"available"</span>{": "}<span className="ck">false</span>{", "}<span className="cs">"price"</span>{": "}<span className="ck">null</span>{" }\n  ]\n}"}
      </CodeBlock>
      <h2>Buy a domain <span className="docs-badge post">POST</span></h2>
      <CodeBlock lang="Request">
        {"POST /domains/checkout\n\n{\n  "}<span className="cs">"domain"</span>{": "}<span className="cv">"john.xyz"</span>{"\n}\n\n"}<span className="cc">{"// Returns a Stripe checkout session URL"}</span>
      </CodeBlock>
      <h2>List domains <span className="docs-badge get">GET</span></h2>
      <CodeBlock lang="Request">{"GET /domains\n\nAuthorization: Bearer "}<span className="cv">{"{token}"}</span></CodeBlock>
      <h2>Delete domain <span className="docs-badge del">DELETE</span></h2>
      <CodeBlock lang="Request">{"DELETE /domains/"}<span className="cv">{"{id}"}</span>{"\n\nAuthorization: Bearer "}<span className="cv">{"{token}"}</span></CodeBlock>
      <div className="docs-warn">
        <p>⚠️ Deleting a domain removes all associated DNS records and subdomains immediately. This cannot be undone.</p>
      </div>
    </>
  ),
  "api-deploy": (
    <>
      <div className="docs-eyebrow">// api reference</div>
      <h1>Deploy API</h1>
      <p>Trigger deployments, stream logs, and manage projects programmatically. Base URL: <span className="ic">https://api.portflo.dev/v1</span></p>
      <h2>Deploy a project <span className="docs-badge post">POST</span></h2>
      <CodeBlock lang="Request">
        {"POST /deploy\n\n{\n  "}<span className="cs">"name"</span>{": "}<span className="cv">"api"</span>{",\n  "}<span className="cs">"cloud"</span>{": "}<span className="cv">"gcp"</span>{",\n  "}<span className="cs">"domain"</span>{": "}<span className="cv">"john.xyz"</span>{"\n}"}
      </CodeBlock>
      <h2>Stream logs <span className="docs-badge get">GET</span></h2>
      <CodeBlock lang="Request">{"GET /deploy/"}<span className="cv">{"{id}"}</span>{"/logs?follow=true\n\nAuthorization: Bearer "}<span className="cv">{"{token}"}</span></CodeBlock>
      <h2>Redeploy <span className="docs-badge post">POST</span></h2>
      <CodeBlock lang="Request">{"POST /deploy/"}<span className="cv">{"{id}"}</span>{"/redeploy"}</CodeBlock>
      <h2>Tear down <span className="docs-badge del">DELETE</span></h2>
      <CodeBlock lang="Request">{"DELETE /deploy/"}<span className="cv">{"{id}"}</span></CodeBlock>
    </>
  ),
  "guide-nextjs": (
    <>
      <div className="docs-eyebrow">// guides</div>
      <h1>Deploy Next.js</h1>
      <p>Deploy a Next.js app to your own domain in under 2 minutes. Portflo auto-detects Next.js and handles the build.</p>
      <h2>Prerequisites</h2>
      <ul>
        <li>Portflo CLI installed and logged in</li>
        <li>A domain purchased through Portflo</li>
        <li>GCP or AWS account connected</li>
      </ul>
      <h2>Deploy</h2>
      <p>From your Next.js project root:</p>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" deploy --name app --cloud gcp\n"}
        {/* <span className="cc">{"# ▸ Detected: Next.js\n# ▸ Building production image...\n# ▸ Pushing to Cloud Run...\n# ▸ Creating app.john.xyz...\n# ✓ Live at https://app.john.xyz (61s)"}}</span> */}
      </CodeBlock>
      <div className="docs-info">
        <p>💡 Portflo automatically sets <span className="ic">NODE_ENV=production</span> and runs <span className="ic">next build</span> inside the container.</p>
      </div>
      <h2>Environment variables</h2>
      <CodeBlock lang="bash">
        <span className="ck">portflo</span>{" env set NEXT_PUBLIC_API_URL="}<span className="cv">"https://api.john.xyz"</span>{" --project app"}
      </CodeBlock>
    </>
  ),
};

export function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<DocId>("quickstart");
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

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
      <style>{docsStyles}</style>
      <div className="dt-cursor" ref={cursorRef} />
      <div className="dt-cursor-ring" ref={ringRef} />

      <nav className="dt-nav" ref={navRef}>
        <Link to="/" className="dt-logo"><div className="dt-logo-dot" />deploy<span>to</span></Link>
        <ul>
          <li><Link to="/domains">Domains</Link></li>
          <li><Link to="/cli">CLI</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/docs" className="active">Docs</Link></li>
          <li><Link to="/sign-in" className="dt-nav-cta">Get Started →</Link></li>
        </ul>
      </nav>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          {sidebar.map((section) => (
            <div key={section.label} className="docs-sidebar-section">
              <div className="docs-sidebar-label">{section.label}</div>
              {section.links.map((link) => (
                <a
                  key={link.id}
                  href="#"
                  className={`docs-sidebar-link${activeDoc === link.id ? " active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveDoc(link.id); window.scrollTo(0, 0); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </aside>

        <main className="docs-content">
          {docs[activeDoc]}
        </main>
      </div>

      <footer className="dt-footer">
        <Link to="/" className="dt-logo dt-logo-sm"><div className="dt-logo-dot" />deploy<span>to</span></Link>
        <div>Built for developers who hate config files.</div>
        <div>© 2025 deployto</div>
      </footer>
    </div>
  );
}