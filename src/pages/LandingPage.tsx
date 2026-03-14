import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const landingStyles = `
.dt-page, .dt-page * , .dt-page *::before, .dt-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

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

.dt-page h1,
.dt-page h2,
.dt-page h3,
.dt-page h4,
.dt-page h5,
.dt-page h6,
.dt-page button,
.dt-page a {
  font-family: 'Syne', sans-serif;
}

.dt-page code,
.dt-page pre,
.dt-page kbd {
  font-family: 'Space Mono', monospace;
}

.dt-page::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1000;
  opacity: 0.5;
}

.dt-cursor { width: 12px; height: 12px; background: var(--accent); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transition: transform 0.08s linear; mix-blend-mode: difference; }
.dt-cursor-ring { width: 36px; height: 36px; border: 1px solid var(--accent); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9998; transition: transform 0.12s linear; mix-blend-mode: difference; opacity: 0.4; }

.dt-nav { display: flex; justify-content: space-between; align-items: center; padding: 24px 48px; position: fixed; top: 0; left: 0; right: 0; z-index: 1001; transition: border-color 0.3s, background 0.3s; }
.dt-nav.scrolled { border-bottom: 1px solid var(--border); background: rgba(8,8,8,0.92); backdrop-filter: blur(12px); }
.dt-logo { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; }
.dt-logo span { color: var(--accent); }
.dt-logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: dt-pulse 2s infinite; }
@keyframes dt-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
.dt-nav ul { display: flex; gap: 32px; list-style: none; }
.dt-nav a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
.dt-nav a:hover { color: var(--text); }
.dt-nav-cta { background: var(--accent); color: #000; padding: 8px 20px; border-radius: 4px; font-weight: 700; }

.dt-hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 120px 48px 80px; position: relative; overflow: hidden; z-index: 1; }
.dt-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(200,241,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,241,53,0.03) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%); }
.dt-hero-glow { position: absolute; width: 700px; height: 700px; background: radial-gradient(circle, rgba(200,241,53,0.06) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
.dt-hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(200,241,53,0.07); border: 1px solid rgba(200,241,53,0.18); color: var(--accent); font-size: 12px; font-family: 'Space Mono', monospace; padding: 6px 14px; border-radius: 100px; margin-bottom: 32px; width: fit-content; animation: dt-fade-up 0.6s ease both; }
.dt-hero h1 { font-size: clamp(52px, 8vw, 96px); font-weight: 800; line-height: 0.95; letter-spacing: -3px; max-width: 900px; animation: dt-fade-up 0.6s ease 0.1s both; }
.dt-hero h1 .acc { color: var(--accent); }
.dt-hero h1 .dim { color: var(--muted); }
.dt-hero-sub { font-size: 18px; color: var(--muted); margin-top: 28px; max-width: 500px; line-height: 1.6; animation: dt-fade-up 0.6s ease 0.2s both; }
.dt-hero-sub code { color: #fff; font-family: 'Space Mono', monospace; font-size: 14px; }

.dt-search-box { display: flex; align-items: center; margin-top: 44px; max-width: 560px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: visible; transition: border-color 0.2s, box-shadow 0.2s; animation: dt-fade-up 0.6s ease 0.3s both; position: relative; z-index: 5; }
.dt-search-box:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(200,241,53,0.07); }
.dt-search-box input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-family: 'Space Mono', monospace; font-size: 16px; padding: 16px 20px; }
.dt-search-box input::placeholder { color: var(--muted); }
.dt-search-tld { position: relative; padding-right: 10px; }
.dt-search-tld-btn {
  border: none;
  outline: none;
  background: transparent;
  color: var(--accent);
  font-family: 'Space Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  padding: 0 8px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: none;
}
.dt-search-tld-btn .chev {
  color: #8aa71f;
  font-size: 11px;
  transform: translateY(1px);
}
.dt-search-tld-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 110px;
  background: #0f0f0f;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.45);
  z-index: 1200;
}
.dt-search-tld-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--muted);
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  text-align: left;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: none;
  transition: background 0.2s, color 0.2s;
}
.dt-search-tld-item:hover {
  background: rgba(200,241,53,0.12);
  color: var(--accent);
}
.dt-search-tld-item.active {
  background: var(--accent);
  color: #000;
}
.dt-search-btn { background: var(--accent); border: none; color: #000; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; padding: 16px 28px; cursor: none; transition: background 0.2s; letter-spacing: 0.3px; }
.dt-search-btn:hover { background: #d8ff40; }

.dt-live-examples { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; animation: dt-fade-up 0.6s ease 0.4s both; }
.dt-ex-tag { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--muted); background: var(--surface); border: 1px solid var(--border); padding: 5px 10px; border-radius: 4px; transition: color 0.2s, border-color 0.2s; }
.dt-ex-tag:hover { color: var(--accent); border-color: rgba(200,241,53,0.3); }
.dt-ex-tag.on { color: var(--accent); border-color: rgba(200,241,53,0.25); }

.dt-hero-stats { display: flex; gap: 48px; margin-top: 56px; animation: dt-fade-up 0.6s ease 0.5s both; }
.dt-stat { display: flex; flex-direction: column; gap: 4px; }
.dt-stat-n { font-size: 30px; font-weight: 800; letter-spacing: -1.5px; }
.dt-stat-l { font-size: 11px; color: var(--muted); font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; }

.dt-ticker-wrap { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 11px 0; background: #0a0a0a; }
.dt-ticker { display: flex; animation: dt-tick 30s linear infinite; white-space: nowrap; }
.dt-tick-item { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--muted); padding: 0 36px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.dt-tdot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; animation: dt-pulse 2s infinite; }
@keyframes dt-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.dt-split { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1460px; margin: 0 auto; padding: 96px 34px; }
.dt-split-text { justify-self: start; }
.dt-split-text .tag { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
.dt-split-text h2 { font-size: clamp(50px, 6.2vw, 86px); font-weight: 800; letter-spacing: -1.8px; line-height: 0.93; margin-bottom: 20px; max-width: 760px; }
.dt-split-text p { color: var(--muted); font-size: 16px; line-height: 1.68; margin-bottom: 34px; max-width: 560px; }
.dt-cmd-rows { display: flex; flex-direction: column; gap: 10px; }
.dt-cmd-row { display: flex; align-items: center; gap: 12px; font-family: 'Space Mono', monospace; font-size: 13px; }
.dt-cmd-row .c { color: var(--accent); }
.dt-cmd-row .a { color: #444; }
.dt-cmd-row .u { color: #60c8ff; }

.dt-term { width: min(100%, 780px); justify-self: end; background: #090909; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02); }
.dt-term { transform: translate(var(--term-x, 0px), var(--term-y, 0px)); transition: transform 0.08s ease-out; }
.dt-term.dragging { transition: none; }
.dt-term-head { background: #111; padding: 11px 16px; display: flex; align-items: center; gap: 7px; border-bottom: 1px solid var(--border); cursor: grab; touch-action: none; user-select: none; }
.dt-term.dragging .dt-term-head { cursor: grabbing; }
.dt-td { width: 11px; height: 11px; border-radius: 50%; }
.dt-td.r{background:#ff5f57} .dt-td.y{background:#ffbd2e} .dt-td.g{background:#28ca41}
.dt-tt { font-family:'Space Mono',monospace; font-size:10px; color:var(--muted); margin-left:8px; }
.dt-term-body { padding: 26px 28px; font-family:'Space Mono',monospace; font-size:14px; line-height:2.05; min-height: 300px; max-height: 620px; overflow-y: auto; }
.dt-tl { display:flex; gap:8px; }
.dt-tp { color: var(--accent); }
.dt-tc { color: #fff; }
.dt-term-input-wrap { align-items: center; }
.dt-term-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-family: 'Space Mono', monospace;
  font-size: inherit;
}
.dt-term-input::placeholder { color: #5a5a5a; }
.dt-to { color: var(--muted); padding-left: 18px; }
.dt-ts { color: var(--accent); padding-left: 18px; }
.dt-tu { color: #60c8ff; padding-left: 18px; }
.dt-tb { display:inline-block; width:7px; height:13px; background:var(--accent); animation:dt-blink 1s infinite; vertical-align:middle; }
@keyframes dt-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

.dt-steps-section { border-top: 1px solid var(--border); padding: 80px 48px; text-align: center; }
.dt-steps-section .tag { font-family:'Space Mono',monospace; font-size:11px; color:var(--accent); letter-spacing:2px; text-transform:uppercase; margin-bottom:16px; }
.dt-steps-section h2 { font-size: 44px; font-weight:800; letter-spacing:-2px; margin-bottom: 8px; }
.dt-steps-section .sub { color:var(--muted); font-size:15px; margin-bottom:52px; }
.dt-steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; max-width: 960px; margin: 0 auto; background: var(--border); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
.dt-step { background: var(--card); padding: 36px 28px; text-align: left; transition: background 0.2s; }
.dt-step:hover { background: #121212; }
.dt-step-n { font-family:'Space Mono',monospace; font-size:10px; color:var(--muted); letter-spacing:2px; margin-bottom:18px; }
.dt-step-ico { font-size:28px; margin-bottom:14px; }
.dt-step h3 { font-size:17px; font-weight:700; margin-bottom:8px; letter-spacing:-0.3px; }
.dt-step p { color:var(--muted); font-size:13px; line-height:1.6; }
.dt-step code { color:var(--accent); font-family:'Space Mono',monospace; font-size:11px; }

.dt-pricing-section { border-top: 1px solid var(--border); padding: 80px 48px; text-align: center; }
.dt-pricing-section h2 { font-size:44px; font-weight:800; letter-spacing:-2px; margin-bottom:52px; }
.dt-price-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 960px; margin: 0 auto; text-align: left; }
.dt-pc { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 32px 26px; position: relative; transition: border-color 0.2s, transform 0.2s; }
.dt-pc:hover { border-color: #2e2e2e; transform: translateY(-3px); }
.dt-pc.feat { border-color: var(--accent); background: rgba(200,241,53,0.025); }
.dt-feat-badge { position:absolute; top:-1px; right:20px; background:var(--accent); color:#000; font-size:9px; font-weight:800; padding:4px 10px; letter-spacing:1px; border-radius:0 0 5px 5px; text-transform:uppercase; }
.dt-pname { font-size:11px; color:var(--muted); font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:14px; }
.dt-pprice { font-size:44px; font-weight:800; letter-spacing:-2px; line-height:1; }
.dt-pprice sub { font-size:14px; color:var(--muted); font-weight:400; letter-spacing:0; vertical-align:baseline; }
.dt-pdesc { color:var(--muted); font-size:13px; margin:10px 0 24px; line-height:1.5; }
.dt-pfeats { list-style:none; display:flex; flex-direction:column; gap:9px; margin-bottom:24px; }
.dt-pfeats li { font-size:13px; color:#ccc; display:flex; gap:8px; align-items:center; }
.dt-pfeats li::before { content:'✓'; color:var(--accent); font-weight:700; font-size:11px; flex-shrink:0; }
.dt-pbtn { width:100%; padding:12px; border-radius:5px; font-family:'Syne',sans-serif; font-weight:700; font-size:13px; cursor:none; transition:all 0.2s; border:1px solid var(--border); background:transparent; color:var(--text); letter-spacing:0.3px; }
.dt-pbtn:hover { background:var(--surface); border-color:#333; }
.dt-pbtn.p { background:var(--accent); color:#000; border-color:var(--accent); }

.dt-footer { border-top:1px solid var(--border); padding:36px 48px; display:flex; justify-content:space-between; align-items:center; color:var(--muted); font-size:12px; }
.dt-logo-sm { font-size: 15px; }
.dt-gap-sm { height: 6px; }
.dt-gap-xs { height: 4px; }
@keyframes dt-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

@media(max-width:768px) {
  .dt-page { cursor: auto; }
  .dt-cursor, .dt-cursor-ring { display: none; }
  .dt-nav { padding:18px 24px; }
  .dt-nav ul { display:none; }
  .dt-hero { padding:100px 24px 60px; }
  .dt-hero h1 { letter-spacing:-2px; font-size: clamp(44px, 20vw, 74px); line-height: 0.9; }
  .dt-search-box {
    max-width: 100%;
    flex-wrap: wrap;
  }
  .dt-search-box input {
    min-width: 0;
    flex: 1 1 auto;
    width: calc(100% - 130px);
    padding: 14px 16px;
  }
  .dt-search-tld {
    flex: 0 0 auto;
    padding-right: 8px;
  }
  .dt-search-tld-btn {
    min-height: 50px;
    font-size: 15px;
  }
  .dt-search-btn {
    width: 100%;
    padding: 14px 16px;
    border-top: 1px solid var(--border);
    text-align: center;
  }
  .dt-search-tld-menu {
    right: 8px;
  }
  .dt-split { grid-template-columns:1fr; padding:72px 24px; gap:48px; }
  .dt-split-text h2 { font-size: clamp(44px, 12vw, 64px); line-height: 0.98; }
  .dt-split-text p { font-size: 17px; margin-bottom: 32px; }
  .dt-cmd-row { font-size: 13px; }
  .dt-term-body { font-size: 12px; padding: 20px 22px; }
  .dt-term { width: 100%; transform: translate(0, 0); }
  .dt-steps-grid, .dt-price-grid { grid-template-columns:1fr; }
  .dt-hero-stats { gap:28px; flex-wrap:wrap; }
  .dt-footer { flex-direction:column; gap:12px; text-align:center; }
  .dt-steps-section, .dt-pricing-section { padding:60px 24px; }
}
`;

// ============================================================
// LandingPage
// ============================================================
export function LandingPage() {
  type TerminalLineKind = "cmd" | "out" | "success" | "link";
  type TerminalLine = { kind: TerminalLineKind; text: string };

  const availableTlds = ["xyz", "dev", "app", "io", "tech"];
  const tickerItems = [
    "api.todo.abhishek.xyz → live 2m ago",
    "app.portfolio.sarah.xyz → live 5m ago",
    "testing.ios.john.xyz → live 9m ago",
    "backend.shop.priya.xyz → live 13m ago",
    "dev.blog.rahul.xyz → live 17m ago",
    "app.game.alex.xyz → live 21m ago",
  ];

  const [domainInput, setDomainInput] = useState("");
  const [domainTld, setDomainTld] = useState("xyz");
  const [tldOpen, setTldOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tldRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    x: 0,
    y: 0,
  });

  const searchDomain = () => {
    const value = domainInput.trim() || "yourname";
    const available = Math.random() > 0.3;
    window.alert(
      `${value}.${domainTld}\n\n${
        available
          ? "✓ Available — $10/yr\n\nIn the real app this opens Stripe checkout!"
          : "✗ Taken — try another name"
      }`
    );
  };

  const runTerminalCommand = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    if (command === "clear") {
      setTerminalHistory([]);
      return;
    }

    const nextHistory: TerminalLine[] = [
      { kind: "cmd", text: command },
    ];

    if (command === "help") {
      nextHistory.push({ kind: "out", text: "Commands: help, deploy <port>, npm run dev, clear" });
    } else if (command === "npm run dev") {
      nextHistory.push({ kind: "out", text: "Local:  http://localhost:5173" });
    } else if (command.startsWith("deploy")) {
      const selectedName = domainInput.trim() || "john";
      const host = `api.todo.${selectedName}.${domainTld}`;
      nextHistory.push({ kind: "out", text: "Connecting tunnel..." });
      nextHistory.push({ kind: "out", text: "Generating SSL cert..." });
      nextHistory.push({ kind: "out", text: `Updating DNS → ${selectedName}.${domainTld}` });
      nextHistory.push({ kind: "success", text: "✓ Live in 3.8s" });
      nextHistory.push({ kind: "link", text: `→ https://${host}` });
    } else {
      nextHistory.push({ kind: "out", text: `command not found: ${command}` });
      nextHistory.push({ kind: "out", text: "Try: help" });
    }

    setTerminalHistory((current) => [...current, ...nextHistory]);
  };

  const handleTerminalDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || window.innerWidth <= 768) return;
    const drag = dragRef.current;
    drag.active = true;
    drag.pointerId = event.pointerId;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.baseX = drag.x;
    drag.baseY = drag.y;
    event.currentTarget.setPointerCapture(event.pointerId);
    terminalRef.current?.classList.add("dragging");
    document.body.style.userSelect = "none";
  };

  const handleTerminalDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;
    const nextX = Math.max(-260, Math.min(260, drag.baseX + (event.clientX - drag.startX)));
    const nextY = Math.max(-140, Math.min(180, drag.baseY + (event.clientY - drag.startY)));
    drag.x = nextX;
    drag.y = nextY;
    if (terminalRef.current) {
      terminalRef.current.style.setProperty("--term-x", `${nextX}px`);
      terminalRef.current.style.setProperty("--term-y", `${nextY}px`);
    }
  };

  const handleTerminalDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    drag.active = false;
    drag.pointerId = -1;
    event.currentTarget.releasePointerCapture(event.pointerId);
    terminalRef.current?.classList.remove("dragging");
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!tldRef.current?.contains(event.target as Node)) {
        setTldOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTldOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.userSelect = "";
    };
  }, []);

  useEffect(() => {
    const existing = document.getElementById("landing-fonts");
    let created: HTMLLinkElement | null = null;

    if (!existing) {
      created = document.createElement("link");
      created.id = "landing-fonts";
      created.rel = "stylesheet";
      created.href =
        "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap";
      document.head.appendChild(created);
    }

    return () => {
      if (created) {
        document.head.removeChild(created);
      }
    };
  }, []);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx - 6}px`;
        cursorRef.current.style.top = `${my - 6}px`;
      }
    };

    const animateRing = () => {
      rx += (mx - rx - 18) * 0.3;
      ry += (my - ry - 18) * 0.3;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }

      raf = window.requestAnimationFrame(animateRing);
    };

    const onScroll = () => {
      navRef.current?.classList.toggle("scrolled", window.scrollY > 20);
    };

    const hoverTargets = rootRef.current?.querySelectorAll("button,a,input") ?? [];

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "scale(2)";
      if (ringRef.current) ringRef.current.style.transform = "scale(1.4)";
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "scale(1)";
    };

    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    hoverTargets.forEach((element) => {
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
    });

    raf = window.requestAnimationFrame(animateRing);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      hoverTargets.forEach((element) => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="dt-page" ref={rootRef}>
      <style>{landingStyles}</style>

      <div className="dt-cursor" ref={cursorRef} />
      <div className="dt-cursor-ring" ref={ringRef} />

      <nav className="dt-nav" ref={navRef}>
        <div className="dt-logo"><div className="dt-logo-dot" />deploy<span>to</span></div>
        <ul>
          <li><a href="#">Domains</a></li>
          <li><a href="#">CLI</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Docs</a></li>
          <li><Link to="/sign-in" className="dt-nav-cta">Get Started →</Link></li>
        </ul>
      </nav>

      <section className="dt-hero">
        <div className="dt-hero-grid" />
        <div className="dt-hero-glow" />

        <div className="dt-hero-tag"><div className="dt-logo-dot" />now in beta — 200+ developers</div>

        <h1>
          your port.<br />
          <span className="acc">your domain.</span><br />
          <span className="dim">60 seconds.</span>
        </h1>

        <p className="dt-hero-sub">
          Buy <code>john.xyz</code>, run one command, and your local project is live at
          <code> api.todo.john.xyz</code>. No config. No AWS console.
        </p>

        <div className="dt-search-box">
          <input
            type="text"
            placeholder="yourname"
            value={domainInput}
            onChange={(event) => setDomainInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") searchDomain();
            }}
          />
          <div className="dt-search-tld" ref={tldRef}>
            <button
              type="button"
              className="dt-search-tld-btn"
              onClick={() => setTldOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={tldOpen}
              aria-label="Select domain extension"
            >
              .{domainTld}
              <span className="chev">{tldOpen ? "▲" : "▼"}</span>
            </button>
            {tldOpen && (
              <div className="dt-search-tld-menu" role="listbox">
                {availableTlds.map((tld) => (
                  <button
                    key={tld}
                    type="button"
                    className={`dt-search-tld-item${domainTld === tld ? " active" : ""}`}
                    onClick={() => {
                      setDomainTld(tld);
                      setTldOpen(false);
                    }}
                    role="option"
                    aria-selected={domainTld === tld}
                  >
                    .{tld}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" className="dt-search-btn" onClick={searchDomain}>Check Domain →</button>
        </div>

        <div className="dt-live-examples">
          <div className="dt-ex-tag on">abhishek.xyz — $10/yr</div>
          <div className="dt-ex-tag">api.todo.john.xyz</div>
          <div className="dt-ex-tag">app.portfolio.sarah.xyz</div>
          <div className="dt-ex-tag">testing.ios.priya.xyz</div>
          <div className="dt-ex-tag">backend.shop.mike.xyz</div>
        </div>

        <div className="dt-hero-stats">
          <div className="dt-stat"><span className="dt-stat-n">60s</span><span className="dt-stat-l">avg deploy</span></div>
          <div className="dt-stat"><span className="dt-stat-n">$10</span><span className="dt-stat-l">domain/yr</span></div>
          <div className="dt-stat"><span className="dt-stat-n">∞</span><span className="dt-stat-l">subdomains</span></div>
          <div className="dt-stat"><span className="dt-stat-n">free</span><span className="dt-stat-l">SSL always</span></div>
        </div>
      </section>

      <div className="dt-ticker-wrap">
        <div className="dt-ticker">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item}-${index}`} className="dt-tick-item"><div className="dt-tdot" />{item}</div>
          ))}
        </div>
      </div>

      <section className="dt-split">
        <div className="dt-split-text">
          <div className="tag">// the magic</div>
          <h2>One command.<br />Any machine.</h2>
          <p>Running locally? On AWS? GCP? Doesn't matter. Point any port to a real subdomain instantly. No YAML. No dashboards.</p>
          <div className="dt-cmd-rows">
            <div className="dt-cmd-row"><span className="c">$ deploy 5173</span><span className="a">→</span><span className="u">myapp.john.xyz</span></div>
            <div className="dt-cmd-row"><span className="c">$ deploy 3000 --name api</span><span className="a">→</span><span className="u">api.john.xyz</span></div>
            <div className="dt-cmd-row"><span className="c">$ deploy 8080 --aws</span><span className="a">→</span><span className="u">backend.john.xyz</span></div>
            <div className="dt-cmd-row"><span className="c">$ deploy 5173 --gcp</span><span className="a">→</span><span className="u">app.john.xyz</span></div>
          </div>
        </div>

        <div
          className="dt-term"
          ref={terminalRef}
          onClick={() => {
            terminalInputRef.current?.focus();
          }}
        >
          <div
            className="dt-term-head"
            onPointerDown={handleTerminalDragStart}
            onPointerMove={handleTerminalDragMove}
            onPointerUp={handleTerminalDragEnd}
            onPointerCancel={handleTerminalDragEnd}
          >
            <div className="dt-td r" /><div className="dt-td y" /><div className="dt-td g" />
            <span className="dt-tt">~/projects/todo-app</span>
          </div>
          <div className="dt-term-body">
            <div className="dt-tl"><span className="dt-tp">❯</span><span className="dt-tc">npm run dev</span></div>
            <div className="dt-to">Local:  http://localhost:5173</div>
            <div className="dt-gap-sm" />
            {terminalHistory.map((line, index) => {
              if (line.kind === "cmd") {
                return (
                  <div key={`${line.kind}-${index}-${line.text}`} className="dt-tl">
                    <span className="dt-tp">❯</span>
                    <span className="dt-tc">{line.text}</span>
                  </div>
                );
              }

              if (line.kind === "success") {
                return <div key={`${line.kind}-${index}-${line.text}`} className="dt-ts">{line.text}</div>;
              }

              if (line.kind === "link") {
                return <div key={`${line.kind}-${index}-${line.text}`} className="dt-tu">{line.text}</div>;
              }

              return <div key={`${line.kind}-${index}-${line.text}`} className="dt-to">{line.text}</div>;
            })}
            <div className="dt-gap-xs" />
            <form
              className="dt-tl dt-term-input-wrap"
              onSubmit={(event) => {
                event.preventDefault();
                runTerminalCommand(terminalInput);
                setTerminalInput("");
              }}
            >
              <span className="dt-tp">❯</span>
              <input
                ref={terminalInputRef}
                className="dt-term-input"
                value={terminalInput}
                onChange={(event) => setTerminalInput(event.target.value)}
                placeholder='type a command'
                aria-label="Terminal input"
              />
              <span className="dt-tb" />
            </form>
          </div>
        </div>
      </section>

      <section className="dt-steps-section">
        <div className="tag">// how it works</div>
        <h2>Three steps. That's it.</h2>
        <p className="sub">No PhD in DevOps required.</p>
        <div className="dt-steps-grid">
          <div className="dt-step">
            <div className="dt-step-n">01</div>
            <div className="dt-step-ico">🌐</div>
            <h3>Buy your domain</h3>
            <p>Search and buy <strong>yourname.xyz</strong> right here. DNS, SSL, and nameservers — all handled automatically.</p>
          </div>
          <div className="dt-step">
            <div className="dt-step-n">02</div>
            <div className="dt-step-ico">⚡</div>
            <h3>Install the CLI</h3>
            <p>Run <code>npm i -g deployto</code> once. Connect your account in 30 seconds. Works on Mac, Linux &amp; Windows.</p>
          </div>
          <div className="dt-step">
            <div className="dt-step-n">03</div>
            <div className="dt-step-ico">🚀</div>
            <h3>Deploy anything</h3>
            <p>Point any port from any machine to a subdomain. Share a URL your friends will actually remember.</p>
          </div>
        </div>
      </section>

      <section className="dt-pricing-section">
        <h2>Simple pricing.</h2>
        <div className="dt-price-grid">
          <div className="dt-pc">
            <div className="dt-pname">Hobby</div>
            <div className="dt-pprice">Free</div>
            <div className="dt-pdesc">For tinkering and side projects.</div>
            <ul className="dt-pfeats">
              <li>1 domain</li>
              <li>3 live tunnels</li>
              <li>Free SSL</li>
              <li>Community support</li>
            </ul>
            <Link to="/sign-in" className="dt-pbtn">Get Started</Link>
          </div>
          <div className="dt-pc feat">
            <div className="dt-feat-badge">Popular</div>
            <div className="dt-pname">Pro</div>
            <div className="dt-pprice">$9<sub>/mo</sub></div>
            <div className="dt-pdesc">For developers who ship constantly.</div>
            <ul className="dt-pfeats">
              <li>3 domains</li>
              <li>Unlimited tunnels</li>
              <li>AWS + GCP support</li>
              <li>VS Code extension</li>
              <li>Priority support</li>
            </ul>
            <button type="button" className="dt-pbtn p">Start Free Trial</button>
          </div>
          <div className="dt-pc">
            <div className="dt-pname">Team</div>
            <div className="dt-pprice">$29<sub>/mo</sub></div>
            <div className="dt-pdesc">For teams deploying together.</div>
            <ul className="dt-pfeats">
              <li>10 domains</li>
              <li>Unlimited everything</li>
              <li>Team dashboard</li>
              <li>Shared subdomains</li>
              <li>Slack support</li>
            </ul>
            <button type="button" className="dt-pbtn">Contact Us</button>
          </div>
        </div>
      </section>

      <footer className="dt-footer">
        <div className="dt-logo dt-logo-sm"><div className="dt-logo-dot" />deploy<span>to</span></div>
        <div>Built for developers who hate config files.</div>
        <div>© 2025 deployto</div>
      </footer>
    </div>
  );
}
