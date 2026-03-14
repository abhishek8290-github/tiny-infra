import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const pricingStyles = `
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

/* HERO */
.pr-hero { min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:140px 48px 80px;position:relative;overflow:hidden; }
.pr-hero-glow { position:absolute;width:800px;height:400px;background:radial-gradient(ellipse,rgba(200,241,53,0.06) 0%,transparent 70%);top:30%;left:50%;transform:translate(-50%,-50%);pointer-events:none; }
.pr-tag { display:inline-flex;align-items:center;gap:8px;background:rgba(200,241,53,0.07);border:1px solid rgba(200,241,53,0.18);color:var(--accent);font-size:12px;font-family:'Space Mono',monospace;padding:6px 14px;border-radius:100px;margin-bottom:32px;animation:dt-fade-up 0.6s ease both; }
.pr-hero h1 { font-size:clamp(52px,8vw,96px);font-weight:800;line-height:0.95;letter-spacing:-3px;margin-bottom:20px;animation:dt-fade-up 0.6s ease 0.1s both; }
.pr-hero h1 .acc { color:var(--accent); }
.pr-hero p { font-family:'Space Mono',monospace;font-size:14px;color:var(--muted);max-width:460px;line-height:1.8;margin-bottom:36px;animation:dt-fade-up 0.6s ease 0.2s both; }

/* TOGGLE */
.pr-toggle { display:inline-flex;background:var(--surface);border:1px solid var(--border);padding:4px;gap:4px;border-radius:6px;animation:dt-fade-up 0.6s ease 0.3s both; }
.pr-toggle-btn { padding:8px 22px;font-family:'Space Mono',monospace;font-size:12px;background:transparent;border:none;color:var(--muted);cursor:none;transition:all 0.2s;border-radius:4px; }
.pr-toggle-btn.active { background:var(--surface);color:var(--text);border:1px solid var(--border);background:#1a1a1a; }
.pr-save { display:inline-block;background:rgba(200,241,53,0.1);border:1px solid rgba(200,241,53,0.2);color:var(--accent);font-family:'Space Mono',monospace;font-size:10px;padding:2px 8px;border-radius:4px;margin-left:6px; }

/* CARDS */
.pr-cards { padding:60px 48px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;border-bottom:1px solid var(--border); }
.pr-card { background:var(--card);border:1px solid var(--border);border-radius:10px;padding:36px 28px;position:relative;transition:all 0.3s; }
.pr-card:hover { transform:translateY(-4px);border-color:#2a2a2a; }
.pr-card.feat { border-color:var(--accent);background:rgba(200,241,53,0.025); }
.pr-feat-badge { position:absolute;top:-1px;right:20px;background:var(--accent);color:#000;font-size:9px;font-weight:800;padding:4px 10px;letter-spacing:1px;border-radius:0 0 5px 5px;text-transform:uppercase; }
.pr-plan { font-size:11px;color:var(--muted);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;font-family:'Space Mono',monospace; }
.pr-price { font-size:52px;font-weight:800;letter-spacing:-2.5px;line-height:1; }
.pr-price sub { font-size:14px;color:var(--muted);font-weight:400;letter-spacing:0;vertical-align:baseline; }
.pr-desc { color:var(--muted);font-family:'Space Mono',monospace;font-size:12px;margin:10px 0 24px;line-height:1.6; }
.pr-divider { height:1px;background:var(--border);margin-bottom:24px; }
.pr-features { list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px; }
.pr-features li { font-family:'Space Mono',monospace;font-size:12px;color:#ccc;display:flex;gap:8px;align-items:flex-start;line-height:1.5; }
.pr-features li .ck { color:var(--accent);font-weight:700;font-size:11px;flex-shrink:0;margin-top:1px; }
.pr-features li .nx { color:var(--muted);font-size:11px;flex-shrink:0;margin-top:1px; }
.pr-btn { width:100%;padding:13px;border-radius:5px;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;cursor:none;transition:all 0.2s;border:1px solid var(--border);background:transparent;color:var(--text); }
.pr-btn:hover { background:var(--surface);border-color:#333; }
.pr-btn.primary { background:var(--accent);color:#000;border-color:var(--accent); }
.pr-btn.primary:hover { background:#d8ff40; }

/* COMPARE */
.pr-compare { padding:60px 48px;border-bottom:1px solid var(--border); }
.pr-section-tag { font-family:'Space Mono',monospace;font-size:11px;color:var(--accent);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px; }
.pr-compare h2 { font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-2px;margin-bottom:36px; }
.pr-table { width:100%;border-collapse:collapse; }
.pr-table th { text-align:left;padding:14px 20px;font-family:'Space Mono',monospace;font-size:12px;font-weight:500;border-bottom:2px solid var(--border); }
.pr-table th:first-child { color:var(--muted); }
.pr-table th:not(:first-child) { text-align:center;color:var(--text); }
.pr-table td { padding:13px 20px;border-bottom:1px solid var(--border);font-family:'Space Mono',monospace;font-size:12px; }
.pr-table tr:hover td { background:var(--card); }
.pr-table td:first-child { color:var(--muted); }
.pr-table td:not(:first-child) { text-align:center; }
.pr-cat td { background:#0c0c0c !important;color:#555 !important;font-size:10px !important;letter-spacing:2px;text-transform:uppercase; }
.cy { color:#4dff91; }
.cn { color:var(--muted); }
.cv { color:var(--accent);font-weight:600; }

/* FAQ */
.pr-faq { padding:60px 48px; }
.pr-faq h2 { font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-2px;margin-bottom:36px; }
.pr-faq-grid { display:grid;grid-template-columns:1fr 1fr;gap:2px; }
.pr-faq-item { background:var(--card);border:1px solid var(--border);padding:28px;transition:background 0.2s;cursor:none; }
.pr-faq-item:hover { background:#121212; }
.pr-faq-q { font-size:15px;font-weight:700;letter-spacing:-0.3px;margin-bottom:10px; }
.pr-faq-a { font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);line-height:1.8; }

.dt-footer { border-top:1px solid var(--border);padding:36px 48px;display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:12px; }
.dt-logo-sm { font-size:15px; }

@keyframes dt-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

@media(max-width:768px) {
  .dt-page { cursor:auto; }
  .dt-cursor,.dt-cursor-ring { display:none; }
  .dt-nav { padding:18px 24px; }
  .dt-nav ul { display:none; }
  .pr-hero { padding:100px 24px 60px; }
  .pr-cards { grid-template-columns:1fr;padding:40px 24px; }
  .pr-compare,.pr-faq { padding:60px 24px; }
  .pr-faq-grid { grid-template-columns:1fr; }
  .dt-footer { flex-direction:column;gap:12px;text-align:center; }
}
`;

const plans = [
  {
    name: "Hobby",
    monthlyPrice: "Free",
    annualPrice: "Free",
    desc: "For tinkering and side projects.",
    featured: false,
    features: [
      { text: "1 domain", included: true },
      { text: "3 active tunnels", included: true },
      { text: "Local deploy only", included: true },
      { text: "Unlimited subdomains", included: true },
      { text: "Cloud deploy (AWS/GCP)", included: false },
      { text: "VS Code extension", included: false },
      { text: "DB provisioning", included: false },
    ],
    btnLabel: "Get Started",
    btnClass: "",
    to: "/sign-in" as const,
  },
  {
    name: "Pro",
    monthlyPrice: "$9",
    annualPrice: "$7",
    desc: "For developers who ship constantly.",
    featured: true,
    features: [
      { text: "5 domains", included: true },
      { text: "Unlimited tunnels", included: true },
      { text: "Cloud deploy (AWS + GCP)", included: true },
      { text: "Unlimited subdomains", included: true },
      { text: "VS Code + Cursor extension", included: true },
      { text: "DB provisioning", included: true },
      { text: "Priority support", included: true },
    ],
    btnLabel: "Start Free Trial",
    btnClass: "primary",
    to: "/sign-up" as const,
  },
  {
    name: "Team",
    monthlyPrice: "$29",
    annualPrice: "$23",
    desc: "For teams deploying together.",
    featured: false,
    features: [
      { text: "Unlimited domains", included: true },
      { text: "Unlimited tunnels", included: true },
      { text: "Everything in Pro", included: true },
      { text: "Team dashboard", included: true },
      { text: "Shared subdomains", included: true },
      { text: "5 team members", included: true },
      { text: "Slack support", included: true },
    ],
    btnLabel: "Contact Us",
    btnClass: "",
    to: "/sign-up" as const,
  },
];

const faqs = [
  { q: "Do you charge for compute?", a: "No. We charge for the platform. Compute runs on your AWS or GCP account — you pay them directly. We just wire everything together." },
  { q: "Who owns my domain?", a: "You do. We register it on your behalf via Cloudflare Registrar. You can transfer it out to any registrar at any time, for free." },
  { q: "What happens if I cancel?", a: "Your domains stay yours. Your deployments keep running on your cloud. You lose access to the Portflo dashboard and CLI after the billing period ends." },
  { q: "Can I use my existing domain?", a: "Yes. Transfer it in from any registrar. Takes 5–7 days. DNS stays live throughout the entire transfer process." },
  { q: "Do you support Google Pay and UPI?", a: "Yes. We use Stripe which supports Google Pay, Apple Pay, UPI, NetBanking, and all major cards globally." },
  { q: "Is there a free trial for Pro?", a: "The Hobby plan is your permanent trial. Upgrade to Pro when you need cloud deploys or more tunnels. No credit card required for Hobby." },
];

export function PricingPage() {
  const [annual, setAnnual] = useState(false);
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
      <style>{pricingStyles}</style>
      <div className="dt-cursor" ref={cursorRef} />
      <div className="dt-cursor-ring" ref={ringRef} />

      <nav className="dt-nav" ref={navRef}>
        <Link to="/" className="dt-logo"><div className="dt-logo-dot" />deploy<span>to</span></Link>
        <ul>
          <li><Link to="/domains">Domains</Link></li>
          <li><Link to="/cli">CLI</Link></li>
          <li><Link to="/pricing" className="active">Pricing</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><Link to="/sign-in" className="dt-nav-cta">Get Started →</Link></li>
        </ul>
      </nav>

      <section className="pr-hero">
        <div className="pr-hero-glow" />
        <div className="pr-tag"><div className="dt-logo-dot" />No compute charges. No surprises.</div>
        <h1>Simple.<br /><span className="acc">Honest.</span> Pricing.</h1>
        <p>You pay us for the platform. You pay your cloud for compute. That's it. Nothing hidden.</p>
        <div className="pr-toggle">
          <button className={`pr-toggle-btn${!annual ? " active" : ""}`} onClick={() => setAnnual(false)}>Monthly</button>
          <button className={`pr-toggle-btn${annual ? " active" : ""}`} onClick={() => setAnnual(true)}>Annual <span className="pr-save">save 20%</span></button>
        </div>
      </section>

      <div className="pr-cards">
        {plans.map((plan) => (
          <div key={plan.name} className={`pr-card${plan.featured ? " feat" : ""}`}>
            {plan.featured && <div className="pr-feat-badge">Popular</div>}
            <div className="pr-plan">{plan.name}</div>
            <div className="pr-price">
              {plan.monthlyPrice === "Free" ? "Free" : (
                <>{annual ? plan.annualPrice : plan.monthlyPrice}<sub>/mo</sub></>
              )}
            </div>
            {annual && plan.monthlyPrice !== "Free" && (
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
                billed annually
              </div>
            )}
            <div className="pr-desc">{plan.desc}</div>
            <div className="pr-divider" />
            <ul className="pr-features">
              {plan.features.map((f, i) => (
                <li key={i}>
                  <span className={f.included ? "ck" : "nx"}>{f.included ? "✓" : "✕"}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <Link to={plan.to} className={`pr-btn${plan.btnClass ? ` ${plan.btnClass}` : ""}`}>{plan.btnLabel}</Link>
          </div>
        ))}
      </div>

      <div className="pr-compare">
        <div className="pr-section-tag">// compare</div>
        <h2>Full feature comparison</h2>
        <table className="pr-table">
          <thead>
            <tr><th>Feature</th><th>Hobby</th><th>Pro</th><th>Team</th></tr>
          </thead>
          <tbody>
            <tr className="pr-cat"><td colSpan={4}>Domains</td></tr>
            <tr><td>Domains</td><td>1</td><td>5</td><td className="cv">Unlimited</td></tr>
            <tr><td>Subdomains per domain</td><td className="cv">Unlimited</td><td className="cv">Unlimited</td><td className="cv">Unlimited</td></tr>
            <tr><td>Domain transfer in</td><td className="cy">✓</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>Auto SSL</td><td className="cy">✓</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr className="pr-cat"><td colSpan={4}>Deploy</td></tr>
            <tr><td>Local tunnels</td><td>3 active</td><td className="cv">Unlimited</td><td className="cv">Unlimited</td></tr>
            <tr><td>Cloud deploy</td><td className="cn">✕</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>AWS support</td><td className="cn">✕</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>GCP support</td><td className="cn">✕</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>DB provisioning</td><td className="cn">✕</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr className="pr-cat"><td colSpan={4}>Tools</td></tr>
            <tr><td>CLI</td><td className="cy">✓</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>VS Code + Cursor extension</td><td className="cn">✕</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>Team dashboard</td><td className="cn">✕</td><td className="cn">✕</td><td className="cy">✓</td></tr>
            <tr><td>Shared subdomains</td><td className="cn">✕</td><td className="cn">✕</td><td className="cy">✓</td></tr>
            <tr className="pr-cat"><td colSpan={4}>Support</td></tr>
            <tr><td>Community</td><td className="cy">✓</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>Priority email</td><td className="cn">✕</td><td className="cy">✓</td><td className="cy">✓</td></tr>
            <tr><td>Slack support</td><td className="cn">✕</td><td className="cn">✕</td><td className="cy">✓</td></tr>
          </tbody>
        </table>
      </div>

      <div className="pr-faq">
        <div className="pr-section-tag">// faq</div>
        <h2>Common questions</h2>
        <div className="pr-faq-grid">
          {faqs.map((f, i) => (
            <div key={i} className="pr-faq-item">
              <div className="pr-faq-q">{f.q}</div>
              <div className="pr-faq-a">{f.a}</div>
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