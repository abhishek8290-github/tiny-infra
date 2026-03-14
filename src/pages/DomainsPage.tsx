import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const domainsStyles = `
.dt-page, .dt-page *, .dt-page *::before, .dt-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

.dt-page {
  --bg: #080808;
  --surface: #111;
  --border: #1e1e1e;
  --accent: #c8f135;
  --text: #f0f0f0;
  --muted: #666;
  --card: #0e0e0e;
  background: var(--bg);
  color: var(--text);
  font-family: 'Syne', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  cursor: none;
}
.dt-page h1,.dt-page h2,.dt-page h3,.dt-page h4,.dt-page h5,.dt-page h6,.dt-page button,.dt-page a { font-family: 'Syne', sans-serif; }
.dt-page code,.dt-page pre,.dt-page kbd { font-family: 'Space Mono', monospace; }
.dt-page::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1000;
  opacity: 0.5;
}
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
.dt-nav a:hover,.dt-nav a.active { color:var(--text); }
.dt-nav a.active { color:var(--accent); }
.dt-nav-cta { background:var(--accent);color:#000;padding:8px 20px;border-radius:4px;font-weight:700; }

/* HERO */
.dom-hero { min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:120px 48px 80px;position:relative;overflow:hidden;z-index:1; }
.dom-hero-grid { position:absolute;inset:0;background-image:linear-gradient(rgba(200,241,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,241,53,0.03) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at 50% 50%,black 20%,transparent 75%); }
.dom-hero-glow { position:absolute;width:700px;height:700px;background:radial-gradient(circle,rgba(200,241,53,0.05) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none; }
.dom-tag { display:inline-flex;align-items:center;gap:8px;background:rgba(200,241,53,0.07);border:1px solid rgba(200,241,53,0.18);color:var(--accent);font-size:12px;font-family:'Space Mono',monospace;padding:6px 14px;border-radius:100px;margin-bottom:32px;width:fit-content;animation:dt-fade-up 0.6s ease both; }
.dom-hero h1 { font-size:clamp(52px,8vw,96px);font-weight:800;line-height:0.95;letter-spacing:-3px;max-width:900px;animation:dt-fade-up 0.6s ease 0.1s both; }
.dom-hero h1 .acc { color:var(--accent); }
.dom-hero h1 .dim { color:var(--muted); }
.dom-hero p { font-size:18px;color:var(--muted);margin-top:28px;max-width:500px;line-height:1.6;animation:dt-fade-up 0.6s ease 0.2s both; }

/* SEARCH */
.dom-search-wrap { margin-top:44px;max-width:580px;animation:dt-fade-up 0.6s ease 0.3s both; }
.dom-search-box { display:flex;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:border-color 0.2s,box-shadow 0.2s; }
.dom-search-box:focus-within { border-color:var(--accent);box-shadow:0 0 0 3px rgba(200,241,53,0.07); }
.dom-search-box input { flex:1;background:none;border:none;outline:none;color:var(--text);font-family:'Space Mono',monospace;font-size:16px;padding:16px 20px; }
.dom-search-box input::placeholder { color:var(--muted); }
.dom-search-btn { background:var(--accent);border:none;color:#000;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;padding:16px 28px;cursor:none;transition:background 0.2s;white-space:nowrap; }
.dom-search-btn:hover { background:#d8ff40; }

/* RESULTS */
.dom-results { margin-top:12px;display:flex;flex-direction:column;gap:2px; }
.dom-result { display:flex;align-items:center;justify-content:space-between;background:var(--card);border:1px solid var(--border);padding:14px 20px;transition:border-color 0.2s;animation:dt-fade-up 0.3s ease both; }
.dom-result.avail:hover { border-color:rgba(200,241,53,0.3); }
.dom-result-name { font-family:'Space Mono',monospace;font-size:14px;font-weight:700; }
.dom-result-name .tld { color:var(--accent); }
.dom-result-status-ok { font-family:'Space Mono',monospace;font-size:11px;color:#4dff91;display:flex;align-items:center;gap:5px; }
.dom-result-status-ok::before { content:'';width:5px;height:5px;background:#4dff91;border-radius:50%;display:inline-block; }
.dom-result-status-taken { font-family:'Space Mono',monospace;font-size:11px;color:var(--muted); }
.dom-result-price { font-weight:700;font-size:14px; }
.dom-result-btn { background:transparent;border:1px solid var(--accent);color:var(--accent);padding:6px 16px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:none;transition:all 0.2s;border-radius:4px; }
.dom-result-btn:hover { background:var(--accent);color:#000; }
.dom-result-btn-taken { background:transparent;border:1px solid var(--border);color:var(--muted);padding:6px 16px;font-family:'Syne',sans-serif;font-size:12px;border-radius:4px;cursor:not-allowed; }

/* TLD GRID */
.dom-section { padding:80px 48px;border-top:1px solid var(--border); }
.dom-section-tag { font-family:'Space Mono',monospace;font-size:11px;color:var(--accent);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px; }
.dom-section h2 { font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-2px;margin-bottom:12px; }
.dom-section-sub { color:var(--muted);font-size:15px;margin-bottom:48px; }
.dom-tld-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:2px; }
.dom-tld-card { background:var(--card);border:1px solid var(--border);padding:22px 20px;transition:all 0.2s;cursor:none; }
.dom-tld-card:hover { background:#121212;border-color:#2a2a2a;transform:translateY(-2px); }
.dom-tld-card:hover .dom-tld-ext { color:var(--accent); }
.dom-tld-ext { font-size:22px;font-weight:800;letter-spacing:-1px;margin-bottom:6px;transition:color 0.2s; }
.dom-tld-price { font-family:'Space Mono',monospace;font-size:12px;color:var(--muted); }
.dom-tld-badge { font-family:'Space Mono',monospace;font-size:10px;color:var(--accent);margin-top:4px;opacity:0.7; }

/* TRANSFER */
.dom-transfer { display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;padding:80px 48px;border-top:1px solid var(--border); }
.dom-transfer-info h2 { font-size:clamp(36px,4vw,52px);font-weight:800;letter-spacing:-2px;margin-bottom:16px; }
.dom-transfer-info p { color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:32px; }
.dom-transfer-steps { display:flex;flex-direction:column;gap:16px; }
.dom-tstep { display:flex;gap:14px;align-items:flex-start; }
.dom-tstep-num { width:24px;height:24px;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:10px;color:var(--muted);flex-shrink:0;border-radius:4px; }
.dom-tstep-text { font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);line-height:1.7;padding-top:3px; }
.dom-transfer-box { background:var(--card);border:1px solid var(--border);padding:36px;border-radius:8px; }
.dom-transfer-box h3 { font-size:20px;font-weight:700;margin-bottom:6px; }
.dom-transfer-box p { font-family:'Space Mono',monospace;font-size:12px;color:var(--muted);margin-bottom:24px; }
.dom-transfer-input { display:flex;gap:0;margin-bottom:12px; }
.dom-transfer-input input { flex:1;background:var(--surface);border:1px solid var(--border);border-right:none;color:var(--text);font-family:'Space Mono',monospace;font-size:13px;padding:12px 16px;outline:none;border-radius:4px 0 0 4px;transition:border-color 0.2s; }
.dom-transfer-input input:focus { border-color:var(--accent); }
.dom-transfer-input button { background:var(--surface);border:1px solid var(--border);color:var(--muted);padding:12px 20px;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;cursor:none;transition:all 0.2s;border-radius:0 4px 4px 0; }
.dom-transfer-input button:hover { color:var(--text);border-color:#333; }
.dom-transfer-note { font-family:'Space Mono',monospace;font-size:11px;color:var(--muted);line-height:1.8; }

.dt-footer { border-top:1px solid var(--border);padding:36px 48px;display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:12px; }
.dt-logo-sm { font-size:15px; }

@keyframes dt-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

@media(max-width:768px) {
  .dt-page { cursor:auto; }
  .dt-cursor,.dt-cursor-ring { display:none; }
  .dt-nav { padding:18px 24px; }
  .dt-nav ul { display:none; }
  .dom-hero { padding:100px 24px 60px; }
  .dom-hero h1 { font-size:clamp(44px,14vw,72px); }
  .dom-section { padding:60px 24px; }
  .dom-transfer { grid-template-columns:1fr;padding:60px 24px;gap:48px; }
  .dt-footer { flex-direction:column;gap:12px;text-align:center; }
}
`;

const tlds = [
  { ext: ".xyz", price: "$12/yr", badge: "POPULAR" },
  { ext: ".dev", price: "$15/yr", badge: "DEV FAVOURITE" },
  { ext: ".app", price: "$15/yr", badge: "" },
  { ext: ".io", price: "$35/yr", badge: "" },
  { ext: ".co", price: "$10/yr", badge: "" },
  { ext: ".me", price: "$12/yr", badge: "PERSONAL" },
  { ext: ".sh", price: "$25/yr", badge: "CLI TOOLS" },
  { ext: ".ai", price: "$80/yr", badge: "" },
  { ext: ".tech", price: "$10/yr", badge: "" },
  { ext: ".cloud", price: "$8/yr", badge: "" },
  { ext: ".run", price: "$12/yr", badge: "" },
  { ext: ".codes", price: "$18/yr", badge: "" },
];

const prices: Record<string, number> = { xyz: 12, dev: 15, app: 15, io: 35, co: 10, me: 12, sh: 25, ai: 80, tech: 10 };

type Result = { name: string; tld: string; available: boolean; price: number };

export function DomainsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const search = () => {
    const base = query.trim().replace(/\.[a-z]+$/, "") || "yourname";
    const tldList = ["xyz", "dev", "io", "app", "co"];
    setResults(
      tldList.map((tld) => ({
        name: base,
        tld,
        available: tld === "com" ? false : Math.random() > 0.25,
        price: prices[tld] ?? 12,
      }))
    );
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
      <style>{domainsStyles}</style>
      <div className="dt-cursor" ref={cursorRef} />
      <div className="dt-cursor-ring" ref={ringRef} />

      <nav className="dt-nav" ref={navRef}>
        <Link to="/" className="dt-logo"><div className="dt-logo-dot" />deploy<span>to</span></Link>
        <ul>
          <li><Link to="/domains" className="active">Domains</Link></li>
          <li><Link to="/cli">CLI</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><Link to="/sign-in" className="dt-nav-cta">Get Started →</Link></li>
        </ul>
      </nav>

      <section className="dom-hero">
        <div className="dom-hero-grid" />
        <div className="dom-hero-glow" />
        <div className="dom-tag"><div className="dt-logo-dot" />400+ TLDs via Cloudflare Registrar</div>
        <h1>Your name.<br /><span className="acc">On the internet.</span><br /><span className="dim">Today.</span></h1>
        <p>Buy a real domain. DNS, SSL, and nameservers handled automatically. Start deploying in 60 seconds.</p>

        <div className="dom-search-wrap">
          <div className="dom-search-box">
            <input
              type="text"
              placeholder="type your name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <button className="dom-search-btn" onClick={search}>Search Domains →</button>
          </div>
          {results.length > 0 && (
            <div className="dom-results">
              {results.map((r, i) => (
                <div key={i} className={`dom-result${r.available ? " avail" : ""}`} style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="dom-result-name">{r.name}<span className="tld">.{r.tld}</span></div>
                  {r.available
                    ? <div className="dom-result-status-ok">Available</div>
                    : <div className="dom-result-status-taken">Taken</div>}
                  {r.available ? <div className="dom-result-price">${r.price}/yr</div> : <div style={{ color: "var(--muted)" }}>—</div>}
                  {r.available
                    ? <button className="dom-result-btn">Buy Now</button>
                    : <button className="dom-result-btn-taken">Taken</button>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="dom-section">
        <div className="dom-section-tag">// popular extensions</div>
        <h2>400+ TLDs available</h2>
        <p className="dom-section-sub">All via Cloudflare Registrar — at cost pricing, no markup games.</p>
        <div className="dom-tld-grid">
          {tlds.map((t) => (
            <div key={t.ext} className="dom-tld-card">
              <div className="dom-tld-ext">{t.ext}</div>
              <div className="dom-tld-price">{t.price}</div>
              {t.badge && <div className="dom-tld-badge">{t.badge}</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="dom-transfer">
        <div className="dom-transfer-info">
          <div className="dom-section-tag">// transfer in</div>
          <h2>Already own a domain? Bring it over.</h2>
          <p>Transfer your existing domain and manage everything — DNS, subdomains, deployments — from one place.</p>
          <div className="dom-transfer-steps">
            {["Unlock your domain at your current registrar and get the EPP/auth code.", "Enter your domain and paste the auth code below.", "We handle the transfer. Takes 5–7 days. DNS stays live throughout.", "Once transferred, deploy from CLI instantly."].map((text, i) => (
              <div key={i} className="dom-tstep">
                <div className="dom-tstep-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="dom-tstep-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="dom-transfer-box">
          <h3>Transfer a domain</h3>
          <p>Free transfer, no hidden fees.</p>
          <div className="dom-transfer-input">
            <input type="text" placeholder="yourdomain.xyz" />
            <button>Check →</button>
          </div>
          <div className="dom-transfer-input">
            <input type="text" placeholder="EPP / Auth code" />
            <button>Transfer</button>
          </div>
          <div className="dom-transfer-note">
            Transfer adds 1 year to your registration. Your domain stays live throughout. DNS propagation is maintained during the entire transfer process.
          </div>
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