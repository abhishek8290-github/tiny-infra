// ============================================================
// theme.config.ts — Full Design System
// Each preset changes: colors + fonts + radius + visual style
// ============================================================

export type ThemeMode = "light" | "dark" | "system";

export interface PresetTokens {
  // Colors
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  "sidebar-foreground": string;
  "sidebar-border": string;
  "sidebar-accent": string;
  "sidebar-accent-foreground": string;
  "sidebar-primary": string;
  "sidebar-primary-foreground": string;
  "sidebar-ring": string;
}

export interface ThemePreset {
  label: string;
  description: string;
  // Typography
  fonts: {
    display: string;
    body: string;
    mono: string;
    displayUrl: string; // Google Fonts URL
    bodyUrl: string;
  };
  // Shape
  radius: string;
  // Visual style
  style: {
    shadowStrength: "none" | "subtle" | "medium" | "strong";
    borderStyle: "none" | "subtle" | "default" | "bold";
    density: "compact" | "default" | "spacious";
  };
  tokens: {
    light: PresetTokens;
    dark: PresetTokens;
  };
}

const theme = {
  defaultMode: "dark" as ThemeMode,
  defaultPreset: "ocean" as const,

  sidebar: {
    defaultCollapsed: false,
    width: "240px",
    collapsedWidth: "64px",
  },

  app: {
    name: "deployto",
    description: "your domain. your way.",
    logo: "/logo.svg",
  },

  presets: {

    // ──────────────────────────────────────────────
    // 1. ZINC — Clean neutral default
    // ──────────────────────────────────────────────
    zinc: {
      label: "Zinc",
      description: "Clean, neutral, gets out of the way",
      fonts: {
        display: "'Geist', sans-serif",
        body: "'Geist', sans-serif",
        mono: "'Geist Mono', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap",
        bodyUrl: "",
      },
      radius: "0.75rem",
      style: { shadowStrength: "subtle", borderStyle: "default", density: "default" },
      tokens: {
        light: {
          background: "0 0% 100%", foreground: "240 10% 4%",
          card: "0 0% 99%", "card-foreground": "240 10% 4%",
          popover: "0 0% 100%", "popover-foreground": "240 10% 4%",
          primary: "240 5% 26%", "primary-foreground": "0 0% 98%",
          secondary: "240 5% 96%", "secondary-foreground": "240 6% 10%",
          muted: "240 5% 96%", "muted-foreground": "240 4% 46%",
          accent: "240 5% 94%", "accent-foreground": "240 6% 10%",
          destructive: "0 84% 60%", "destructive-foreground": "0 0% 98%",
          border: "240 6% 90%", input: "240 6% 90%", ring: "240 5% 26%",
          sidebar: "0 0% 98%", "sidebar-foreground": "240 6% 10%",
          "sidebar-border": "240 6% 90%", "sidebar-accent": "240 5% 94%",
          "sidebar-accent-foreground": "240 6% 10%", "sidebar-primary": "240 5% 26%",
          "sidebar-primary-foreground": "0 0% 98%", "sidebar-ring": "240 5% 26%",
        },
        dark: {
          background: "240 10% 4%", foreground: "0 0% 98%",
          card: "240 10% 6%", "card-foreground": "0 0% 98%",
          popover: "240 10% 6%", "popover-foreground": "0 0% 98%",
          primary: "0 0% 98%", "primary-foreground": "240 6% 10%",
          secondary: "240 4% 16%", "secondary-foreground": "0 0% 98%",
          muted: "240 4% 16%", "muted-foreground": "240 5% 65%",
          accent: "240 4% 16%", "accent-foreground": "0 0% 98%",
          destructive: "0 63% 31%", "destructive-foreground": "0 0% 98%",
          border: "240 4% 16%", input: "240 4% 16%", ring: "240 5% 84%",
          sidebar: "240 10% 5%", "sidebar-foreground": "0 0% 90%",
          "sidebar-border": "240 4% 12%", "sidebar-accent": "240 4% 10%",
          "sidebar-accent-foreground": "0 0% 98%", "sidebar-primary": "0 0% 98%",
          "sidebar-primary-foreground": "240 6% 10%", "sidebar-ring": "240 5% 84%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 2. CYBERPUNK — Dark moody neon
    // ──────────────────────────────────────────────
    cyberpunk: {
      label: "Cyberpunk",
      description: "Dark neon, sharp edges, electric",
      fonts: {
        display: "'Orbitron', sans-serif",
        body: "'Share Tech Mono', monospace",
        mono: "'Share Tech Mono', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Share+Tech+Mono&display=swap",
        bodyUrl: "",
      },
      radius: "0.125rem",
      style: { shadowStrength: "strong", borderStyle: "bold", density: "compact" },
      tokens: {
        light: {
          background: "240 20% 96%", foreground: "240 30% 8%",
          card: "240 15% 100%", "card-foreground": "240 30% 8%",
          popover: "240 15% 100%", "popover-foreground": "240 30% 8%",
          primary: "291 96% 55%", "primary-foreground": "0 0% 100%",
          secondary: "240 12% 90%", "secondary-foreground": "240 30% 8%",
          muted: "240 10% 92%", "muted-foreground": "240 10% 40%",
          accent: "180 100% 40%", "accent-foreground": "0 0% 0%",
          destructive: "0 90% 55%", "destructive-foreground": "0 0% 100%",
          border: "291 60% 60%", input: "240 10% 88%", ring: "291 96% 55%",
          sidebar: "240 15% 94%", "sidebar-foreground": "240 30% 8%",
          "sidebar-border": "291 60% 60%", "sidebar-accent": "240 12% 90%",
          "sidebar-accent-foreground": "240 30% 8%", "sidebar-primary": "291 96% 55%",
          "sidebar-primary-foreground": "0 0% 100%", "sidebar-ring": "291 96% 55%",
        },
        dark: {
          background: "240 20% 4%", foreground: "180 100% 85%",
          card: "240 18% 7%", "card-foreground": "180 100% 85%",
          popover: "240 18% 7%", "popover-foreground": "180 100% 85%",
          primary: "291 96% 65%", "primary-foreground": "240 20% 4%",
          secondary: "240 15% 12%", "secondary-foreground": "180 100% 85%",
          muted: "240 15% 12%", "muted-foreground": "240 10% 55%",
          accent: "180 100% 50%", "accent-foreground": "240 20% 4%",
          destructive: "0 90% 60%", "destructive-foreground": "0 0% 100%",
          border: "291 70% 40%", input: "240 15% 12%", ring: "291 96% 65%",
          sidebar: "240 20% 3%", "sidebar-foreground": "180 100% 85%",
          "sidebar-border": "291 70% 35%", "sidebar-accent": "240 15% 10%",
          "sidebar-accent-foreground": "180 100% 85%", "sidebar-primary": "291 96% 65%",
          "sidebar-primary-foreground": "240 20% 4%", "sidebar-ring": "291 96% 65%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 3. NOIR — Dark moody cinematic
    // ──────────────────────────────────────────────
    noir: {
      label: "Noir",
      description: "Cinematic dark, warm blacks, editorial",
      fonts: {
        display: "'Playfair Display', serif",
        body: "'Lato', sans-serif",
        mono: "'Fira Code', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&family=Fira+Code:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "0.25rem",
      style: { shadowStrength: "strong", borderStyle: "subtle", density: "spacious" },
      tokens: {
        light: {
          background: "30 8% 97%", foreground: "20 14% 10%",
          card: "0 0% 100%", "card-foreground": "20 14% 10%",
          popover: "0 0% 100%", "popover-foreground": "20 14% 10%",
          primary: "20 14% 10%", "primary-foreground": "30 8% 97%",
          secondary: "30 6% 92%", "secondary-foreground": "20 14% 10%",
          muted: "30 5% 92%", "muted-foreground": "20 8% 42%",
          accent: "38 70% 88%", "accent-foreground": "20 14% 10%",
          destructive: "0 72% 48%", "destructive-foreground": "0 0% 100%",
          border: "30 6% 86%", input: "30 6% 86%", ring: "20 14% 10%",
          sidebar: "30 6% 96%", "sidebar-foreground": "20 14% 10%",
          "sidebar-border": "30 6% 86%", "sidebar-accent": "38 50% 92%",
          "sidebar-accent-foreground": "20 14% 10%", "sidebar-primary": "20 14% 10%",
          "sidebar-primary-foreground": "30 8% 97%", "sidebar-ring": "20 14% 10%",
        },
        dark: {
          background: "20 10% 6%", foreground: "38 25% 88%",
          card: "20 10% 9%", "card-foreground": "38 25% 88%",
          popover: "20 10% 9%", "popover-foreground": "38 25% 88%",
          primary: "38 70% 62%", "primary-foreground": "20 10% 6%",
          secondary: "20 8% 14%", "secondary-foreground": "38 25% 88%",
          muted: "20 8% 14%", "muted-foreground": "30 8% 55%",
          accent: "38 50% 24%", "accent-foreground": "38 25% 88%",
          destructive: "0 68% 48%", "destructive-foreground": "0 0% 100%",
          border: "20 8% 18%", input: "20 8% 18%", ring: "38 70% 62%",
          sidebar: "20 10% 5%", "sidebar-foreground": "38 25% 88%",
          "sidebar-border": "20 8% 14%", "sidebar-accent": "20 8% 12%",
          "sidebar-accent-foreground": "38 25% 88%", "sidebar-primary": "38 70% 62%",
          "sidebar-primary-foreground": "20 10% 6%", "sidebar-ring": "38 70% 62%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 4. ZEN — Ultra minimal, Japanese calm
    // ──────────────────────────────────────────────
    zen: {
      label: "Zen",
      description: "Ultra minimal, calm, japanese aesthetic",
      fonts: {
        display: "'DM Serif Display', serif",
        body: "'DM Sans', sans-serif",
        mono: "'DM Mono', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "0.25rem",
      style: { shadowStrength: "none", borderStyle: "subtle", density: "spacious" },
      tokens: {
        light: {
          background: "60 9% 98%", foreground: "60 3% 12%",
          card: "60 9% 100%", "card-foreground": "60 3% 12%",
          popover: "60 9% 100%", "popover-foreground": "60 3% 12%",
          primary: "60 3% 12%", "primary-foreground": "60 9% 98%",
          secondary: "60 5% 93%", "secondary-foreground": "60 3% 12%",
          muted: "60 5% 93%", "muted-foreground": "60 3% 46%",
          accent: "60 5% 90%", "accent-foreground": "60 3% 12%",
          destructive: "0 60% 50%", "destructive-foreground": "0 0% 100%",
          border: "60 4% 88%", input: "60 4% 88%", ring: "60 3% 12%",
          sidebar: "60 6% 97%", "sidebar-foreground": "60 3% 12%",
          "sidebar-border": "60 4% 88%", "sidebar-accent": "60 5% 93%",
          "sidebar-accent-foreground": "60 3% 12%", "sidebar-primary": "60 3% 12%",
          "sidebar-primary-foreground": "60 9% 98%", "sidebar-ring": "60 3% 12%",
        },
        dark: {
          background: "60 3% 8%", foreground: "60 9% 92%",
          card: "60 3% 11%", "card-foreground": "60 9% 92%",
          popover: "60 3% 11%", "popover-foreground": "60 9% 92%",
          primary: "60 9% 92%", "primary-foreground": "60 3% 8%",
          secondary: "60 3% 15%", "secondary-foreground": "60 9% 92%",
          muted: "60 3% 15%", "muted-foreground": "60 3% 55%",
          accent: "60 3% 18%", "accent-foreground": "60 9% 92%",
          destructive: "0 60% 45%", "destructive-foreground": "0 0% 100%",
          border: "60 3% 18%", input: "60 3% 18%", ring: "60 9% 92%",
          sidebar: "60 3% 7%", "sidebar-foreground": "60 9% 92%",
          "sidebar-border": "60 3% 15%", "sidebar-accent": "60 3% 13%",
          "sidebar-accent-foreground": "60 9% 92%", "sidebar-primary": "60 9% 92%",
          "sidebar-primary-foreground": "60 3% 8%", "sidebar-ring": "60 9% 92%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 5. SWISS — Bold typographic, red + black
    // ──────────────────────────────────────────────
    swiss: {
      label: "Swiss",
      description: "Bold typography, brutalist grid, iconic red",
      fonts: {
        display: "'Space Grotesk', sans-serif",
        body: "'Space Grotesk', sans-serif",
        mono: "'Space Mono', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap",
        bodyUrl: "",
      },
      radius: "0rem",
      style: { shadowStrength: "none", borderStyle: "bold", density: "compact" },
      tokens: {
        light: {
          background: "0 0% 100%", foreground: "0 0% 4%",
          card: "0 0% 98%", "card-foreground": "0 0% 4%",
          popover: "0 0% 100%", "popover-foreground": "0 0% 4%",
          primary: "0 90% 50%", "primary-foreground": "0 0% 100%",
          secondary: "0 0% 94%", "secondary-foreground": "0 0% 4%",
          muted: "0 0% 94%", "muted-foreground": "0 0% 44%",
          accent: "0 0% 90%", "accent-foreground": "0 0% 4%",
          destructive: "0 90% 50%", "destructive-foreground": "0 0% 100%",
          border: "0 0% 0%", input: "0 0% 88%", ring: "0 90% 50%",
          sidebar: "0 0% 97%", "sidebar-foreground": "0 0% 4%",
          "sidebar-border": "0 0% 0%", "sidebar-accent": "0 0% 92%",
          "sidebar-accent-foreground": "0 0% 4%", "sidebar-primary": "0 90% 50%",
          "sidebar-primary-foreground": "0 0% 100%", "sidebar-ring": "0 90% 50%",
        },
        dark: {
          background: "0 0% 4%", foreground: "0 0% 98%",
          card: "0 0% 7%", "card-foreground": "0 0% 98%",
          popover: "0 0% 7%", "popover-foreground": "0 0% 98%",
          primary: "0 90% 58%", "primary-foreground": "0 0% 4%",
          secondary: "0 0% 12%", "secondary-foreground": "0 0% 98%",
          muted: "0 0% 12%", "muted-foreground": "0 0% 58%",
          accent: "0 0% 15%", "accent-foreground": "0 0% 98%",
          destructive: "0 90% 58%", "destructive-foreground": "0 0% 4%",
          border: "0 0% 96%", input: "0 0% 14%", ring: "0 90% 58%",
          sidebar: "0 0% 3%", "sidebar-foreground": "0 0% 98%",
          "sidebar-border": "0 0% 96%", "sidebar-accent": "0 0% 10%",
          "sidebar-accent-foreground": "0 0% 98%", "sidebar-primary": "0 90% 58%",
          "sidebar-primary-foreground": "0 0% 4%", "sidebar-ring": "0 90% 58%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 6. PEACH — Warm friendly soft
    // ──────────────────────────────────────────────
    peach: {
      label: "Peach",
      description: "Warm, soft, friendly consumer app",
      fonts: {
        display: "'Nunito', sans-serif",
        body: "'Nunito', sans-serif",
        mono: "'Fira Code', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "1.25rem",
      style: { shadowStrength: "medium", borderStyle: "none", density: "default" },
      tokens: {
        light: {
          background: "28 100% 98%", foreground: "16 30% 18%",
          card: "0 0% 100%", "card-foreground": "16 30% 18%",
          popover: "0 0% 100%", "popover-foreground": "16 30% 18%",
          primary: "16 90% 60%", "primary-foreground": "0 0% 100%",
          secondary: "28 80% 93%", "secondary-foreground": "16 30% 18%",
          muted: "28 55% 92%", "muted-foreground": "20 18% 42%",
          accent: "8 88% 90%", "accent-foreground": "16 30% 18%",
          destructive: "0 74% 52%", "destructive-foreground": "0 0% 100%",
          border: "24 45% 88%", input: "24 45% 88%", ring: "16 90% 60%",
          sidebar: "28 80% 97%", "sidebar-foreground": "16 30% 18%",
          "sidebar-border": "24 45% 88%", "sidebar-accent": "23 70% 92%",
          "sidebar-accent-foreground": "16 30% 18%", "sidebar-primary": "16 90% 60%",
          "sidebar-primary-foreground": "0 0% 100%", "sidebar-ring": "16 90% 60%",
        },
        dark: {
          background: "16 28% 9%", foreground: "30 90% 95%",
          card: "16 26% 12%", "card-foreground": "30 90% 95%",
          popover: "16 26% 12%", "popover-foreground": "30 90% 95%",
          primary: "20 95% 65%", "primary-foreground": "16 28% 9%",
          secondary: "16 18% 17%", "secondary-foreground": "30 90% 95%",
          muted: "16 18% 17%", "muted-foreground": "24 35% 68%",
          accent: "14 28% 22%", "accent-foreground": "30 90% 95%",
          destructive: "0 66% 50%", "destructive-foreground": "0 0% 100%",
          border: "16 16% 22%", input: "16 16% 22%", ring: "20 95% 65%",
          sidebar: "16 28% 8%", "sidebar-foreground": "30 90% 95%",
          "sidebar-border": "16 16% 18%", "sidebar-accent": "16 18% 14%",
          "sidebar-accent-foreground": "30 90% 95%", "sidebar-primary": "20 95% 65%",
          "sidebar-primary-foreground": "16 28% 9%", "sidebar-ring": "20 95% 65%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 7. SAND — Warm earthy neutral
    // ──────────────────────────────────────────────
    sand: {
      label: "Sand",
      description: "Earthy warm tones, calm and grounded",
      fonts: {
        display: "'Cormorant Garamond', serif",
        body: "'Jost', sans-serif",
        mono: "'Fira Code', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500&family=Fira+Code:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "0.5rem",
      style: { shadowStrength: "subtle", borderStyle: "subtle", density: "spacious" },
      tokens: {
        light: {
          background: "38 30% 97%", foreground: "30 20% 18%",
          card: "38 20% 100%", "card-foreground": "30 20% 18%",
          popover: "38 20% 100%", "popover-foreground": "30 20% 18%",
          primary: "30 40% 32%", "primary-foreground": "38 30% 97%",
          secondary: "38 22% 91%", "secondary-foreground": "30 20% 18%",
          muted: "38 18% 91%", "muted-foreground": "30 12% 44%",
          accent: "42 35% 85%", "accent-foreground": "30 20% 18%",
          destructive: "0 65% 48%", "destructive-foreground": "0 0% 100%",
          border: "36 18% 84%", input: "36 18% 84%", ring: "30 40% 32%",
          sidebar: "38 22% 96%", "sidebar-foreground": "30 20% 18%",
          "sidebar-border": "36 18% 84%", "sidebar-accent": "38 22% 91%",
          "sidebar-accent-foreground": "30 20% 18%", "sidebar-primary": "30 40% 32%",
          "sidebar-primary-foreground": "38 30% 97%", "sidebar-ring": "30 40% 32%",
        },
        dark: {
          background: "28 15% 8%", foreground: "38 25% 88%",
          card: "28 14% 11%", "card-foreground": "38 25% 88%",
          popover: "28 14% 11%", "popover-foreground": "38 25% 88%",
          primary: "38 50% 68%", "primary-foreground": "28 15% 8%",
          secondary: "28 10% 16%", "secondary-foreground": "38 25% 88%",
          muted: "28 10% 16%", "muted-foreground": "34 12% 55%",
          accent: "32 18% 22%", "accent-foreground": "38 25% 88%",
          destructive: "0 60% 46%", "destructive-foreground": "0 0% 100%",
          border: "28 10% 20%", input: "28 10% 20%", ring: "38 50% 68%",
          sidebar: "28 15% 7%", "sidebar-foreground": "38 25% 88%",
          "sidebar-border": "28 10% 16%", "sidebar-accent": "28 10% 13%",
          "sidebar-accent-foreground": "38 25% 88%", "sidebar-primary": "38 50% 68%",
          "sidebar-primary-foreground": "28 15% 8%", "sidebar-ring": "38 50% 68%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 8. GOLD — Luxury refined premium
    // ──────────────────────────────────────────────
    gold: {
      label: "Gold",
      description: "Luxury, premium, refined gold tones",
      fonts: {
        display: "'Libre Baskerville', serif",
        body: "'Libre Franklin', sans-serif",
        mono: "'Fira Code', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Libre+Franklin:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "0.375rem",
      style: { shadowStrength: "medium", borderStyle: "default", density: "spacious" },
      tokens: {
        light: {
          background: "48 30% 98%", foreground: "40 20% 12%",
          card: "48 20% 100%", "card-foreground": "40 20% 12%",
          popover: "48 20% 100%", "popover-foreground": "40 20% 12%",
          primary: "42 75% 42%", "primary-foreground": "48 30% 98%",
          secondary: "46 30% 92%", "secondary-foreground": "40 20% 12%",
          muted: "46 20% 92%", "muted-foreground": "40 10% 44%",
          accent: "44 55% 86%", "accent-foreground": "40 20% 12%",
          destructive: "0 68% 48%", "destructive-foreground": "0 0% 100%",
          border: "44 22% 82%", input: "44 22% 82%", ring: "42 75% 42%",
          sidebar: "46 25% 96%", "sidebar-foreground": "40 20% 12%",
          "sidebar-border": "44 22% 82%", "sidebar-accent": "44 35% 90%",
          "sidebar-accent-foreground": "40 20% 12%", "sidebar-primary": "42 75% 42%",
          "sidebar-primary-foreground": "48 30% 98%", "sidebar-ring": "42 75% 42%",
        },
        dark: {
          background: "36 18% 7%", foreground: "46 50% 88%",
          card: "36 16% 10%", "card-foreground": "46 50% 88%",
          popover: "36 16% 10%", "popover-foreground": "46 50% 88%",
          primary: "44 80% 58%", "primary-foreground": "36 18% 7%",
          secondary: "36 12% 15%", "secondary-foreground": "46 50% 88%",
          muted: "36 12% 15%", "muted-foreground": "40 18% 52%",
          accent: "38 20% 22%", "accent-foreground": "46 50% 88%",
          destructive: "0 64% 48%", "destructive-foreground": "0 0% 100%",
          border: "36 12% 20%", input: "36 12% 20%", ring: "44 80% 58%",
          sidebar: "36 18% 6%", "sidebar-foreground": "46 50% 88%",
          "sidebar-border": "36 12% 16%", "sidebar-accent": "36 12% 12%",
          "sidebar-accent-foreground": "46 50% 88%", "sidebar-primary": "44 80% 58%",
          "sidebar-primary-foreground": "36 18% 7%", "sidebar-ring": "44 80% 58%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 9. RETRO — Bold loud 70s/80s pop
    // ──────────────────────────────────────────────
    retro: {
      label: "Retro",
      description: "70s/80s pop, bold, loud, nostalgic",
      fonts: {
        display: "'Righteous', sans-serif",
        body: "'Outfit', sans-serif",
        mono: "'Space Mono', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Righteous&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap",
        bodyUrl: "",
      },
      radius: "0.5rem",
      style: { shadowStrength: "strong", borderStyle: "bold", density: "default" },
      tokens: {
        light: {
          background: "55 80% 96%", foreground: "330 40% 12%",
          card: "0 0% 100%", "card-foreground": "330 40% 12%",
          popover: "0 0% 100%", "popover-foreground": "330 40% 12%",
          primary: "330 85% 52%", "primary-foreground": "55 80% 96%",
          secondary: "55 60% 88%", "secondary-foreground": "330 40% 12%",
          muted: "50 50% 90%", "muted-foreground": "330 15% 42%",
          accent: "180 70% 55%", "accent-foreground": "330 40% 12%",
          destructive: "0 80% 50%", "destructive-foreground": "0 0% 100%",
          border: "330 50% 70%", input: "50 40% 88%", ring: "330 85% 52%",
          sidebar: "55 60% 94%", "sidebar-foreground": "330 40% 12%",
          "sidebar-border": "330 50% 70%", "sidebar-accent": "55 55% 88%",
          "sidebar-accent-foreground": "330 40% 12%", "sidebar-primary": "330 85% 52%",
          "sidebar-primary-foreground": "55 80% 96%", "sidebar-ring": "330 85% 52%",
        },
        dark: {
          background: "240 30% 8%", foreground: "55 80% 88%",
          card: "250 28% 12%", "card-foreground": "55 80% 88%",
          popover: "250 28% 12%", "popover-foreground": "55 80% 88%",
          primary: "330 90% 62%", "primary-foreground": "240 30% 8%",
          secondary: "250 22% 18%", "secondary-foreground": "55 80% 88%",
          muted: "250 22% 18%", "muted-foreground": "280 15% 60%",
          accent: "180 80% 50%", "accent-foreground": "240 30% 8%",
          destructive: "0 80% 55%", "destructive-foreground": "0 0% 100%",
          border: "280 40% 35%", input: "250 22% 18%", ring: "330 90% 62%",
          sidebar: "240 30% 7%", "sidebar-foreground": "55 80% 88%",
          "sidebar-border": "280 40% 28%", "sidebar-accent": "250 22% 15%",
          "sidebar-accent-foreground": "55 80% 88%", "sidebar-primary": "330 90% 62%",
          "sidebar-primary-foreground": "240 30% 8%", "sidebar-ring": "330 90% 62%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 10. FOREST — Nature organic deep green
    // ──────────────────────────────────────────────
    forest: {
      label: "Forest",
      description: "Deep greens, organic, grounded nature",
      fonts: {
        display: "'Fraunces', serif",
        body: "'Cabin', sans-serif",
        mono: "'Fira Code', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&family=Cabin:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "0.625rem",
      style: { shadowStrength: "medium", borderStyle: "subtle", density: "default" },
      tokens: {
        light: {
          background: "120 15% 97%", foreground: "140 30% 12%",
          card: "0 0% 100%", "card-foreground": "140 30% 12%",
          popover: "0 0% 100%", "popover-foreground": "140 30% 12%",
          primary: "148 55% 30%", "primary-foreground": "120 15% 97%",
          secondary: "120 15% 91%", "secondary-foreground": "140 30% 12%",
          muted: "120 10% 91%", "muted-foreground": "140 12% 42%",
          accent: "95 40% 86%", "accent-foreground": "140 30% 12%",
          destructive: "0 65% 48%", "destructive-foreground": "0 0% 100%",
          border: "120 12% 84%", input: "120 12% 84%", ring: "148 55% 30%",
          sidebar: "120 12% 96%", "sidebar-foreground": "140 30% 12%",
          "sidebar-border": "120 12% 84%", "sidebar-accent": "110 22% 90%",
          "sidebar-accent-foreground": "140 30% 12%", "sidebar-primary": "148 55% 30%",
          "sidebar-primary-foreground": "120 15% 97%", "sidebar-ring": "148 55% 30%",
        },
        dark: {
          background: "150 20% 6%", foreground: "120 20% 88%",
          card: "148 18% 9%", "card-foreground": "120 20% 88%",
          popover: "148 18% 9%", "popover-foreground": "120 20% 88%",
          primary: "148 60% 45%", "primary-foreground": "150 20% 6%",
          secondary: "148 14% 14%", "secondary-foreground": "120 20% 88%",
          muted: "148 14% 14%", "muted-foreground": "140 10% 55%",
          accent: "140 20% 20%", "accent-foreground": "120 20% 88%",
          destructive: "0 60% 46%", "destructive-foreground": "0 0% 100%",
          border: "148 12% 18%", input: "148 12% 18%", ring: "148 60% 45%",
          sidebar: "150 20% 5%", "sidebar-foreground": "120 20% 88%",
          "sidebar-border": "148 12% 14%", "sidebar-accent": "148 14% 11%",
          "sidebar-accent-foreground": "120 20% 88%", "sidebar-primary": "148 60% 45%",
          "sidebar-primary-foreground": "150 20% 6%", "sidebar-ring": "148 60% 45%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 11. OCEAN — Cool calm deep blue
    // ──────────────────────────────────────────────
    ocean: {
      label: "Ocean",
      description: "Dark neon-lime theme inspired by the landing page",
      fonts: {
        display: "'Syne', sans-serif",
        body: "'Syne', sans-serif",
        mono: "'Space Mono', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap",
        bodyUrl: "",
      },
      radius: "0.75rem",
      style: { shadowStrength: "medium", borderStyle: "default", density: "default" },
      tokens: {
        light: {
          background: "0 0% 97%", foreground: "0 0% 8%",
          card: "0 0% 100%", "card-foreground": "0 0% 8%",
          popover: "0 0% 100%", "popover-foreground": "0 0% 8%",
          primary: "74 88% 40%", "primary-foreground": "0 0% 5%",
          secondary: "80 24% 92%", "secondary-foreground": "0 0% 10%",
          muted: "0 0% 93%", "muted-foreground": "0 0% 42%",
          accent: "74 78% 85%", "accent-foreground": "0 0% 10%",
          destructive: "0 72% 50%", "destructive-foreground": "0 0% 100%",
          border: "0 0% 86%", input: "0 0% 86%", ring: "74 88% 40%",
          sidebar: "0 0% 96%", "sidebar-foreground": "0 0% 8%",
          "sidebar-border": "0 0% 86%", "sidebar-accent": "78 24% 90%",
          "sidebar-accent-foreground": "0 0% 10%", "sidebar-primary": "74 88% 40%",
          "sidebar-primary-foreground": "0 0% 5%", "sidebar-ring": "74 88% 40%",
        },
        dark: {
          background: "0 0% 3%", foreground: "0 0% 94%",
          card: "0 0% 7%", "card-foreground": "0 0% 94%",
          popover: "0 0% 7%", "popover-foreground": "0 0% 94%",
          primary: "74 86% 58%", "primary-foreground": "0 0% 5%",
          secondary: "0 0% 11%", "secondary-foreground": "0 0% 94%",
          muted: "0 0% 11%", "muted-foreground": "0 0% 62%",
          accent: "74 24% 20%", "accent-foreground": "0 0% 94%",
          destructive: "0 68% 50%", "destructive-foreground": "0 0% 100%",
          border: "0 0% 12%", input: "0 0% 12%", ring: "74 86% 58%",
          sidebar: "0 0% 4%", "sidebar-foreground": "0 0% 92%",
          "sidebar-border": "0 0% 10%", "sidebar-accent": "0 0% 9%",
          "sidebar-accent-foreground": "0 0% 94%", "sidebar-primary": "74 86% 58%",
          "sidebar-primary-foreground": "0 0% 5%", "sidebar-ring": "74 86% 58%",
        },
      },
    } satisfies ThemePreset,

    // ──────────────────────────────────────────────
    // 12. AMETHYST — Bold purple futuristic
    // ──────────────────────────────────────────────
    amethyst: {
      label: "Amethyst",
      description: "Bold purple, futuristic, confident",
      fonts: {
        display: "'Plus Jakarta Sans', sans-serif",
        body: "'Plus Jakarta Sans', sans-serif",
        mono: "'Fira Code', monospace",
        displayUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap",
        bodyUrl: "",
      },
      radius: "0.875rem",
      style: { shadowStrength: "medium", borderStyle: "default", density: "default" },
      tokens: {
        light: {
          background: "260 50% 98%", foreground: "260 30% 14%",
          card: "0 0% 100%", "card-foreground": "260 30% 14%",
          popover: "0 0% 100%", "popover-foreground": "260 30% 14%",
          primary: "267 80% 54%", "primary-foreground": "0 0% 100%",
          secondary: "260 48% 93%", "secondary-foreground": "260 30% 14%",
          muted: "260 30% 92%", "muted-foreground": "260 15% 44%",
          accent: "286 72% 89%", "accent-foreground": "260 30% 14%",
          destructive: "0 70% 50%", "destructive-foreground": "0 0% 100%",
          border: "260 24% 82%", input: "260 24% 82%", ring: "267 80% 54%",
          sidebar: "260 55% 97%", "sidebar-foreground": "260 30% 14%",
          "sidebar-border": "260 24% 82%", "sidebar-accent": "270 55% 91%",
          "sidebar-accent-foreground": "260 30% 14%", "sidebar-primary": "267 80% 54%",
          "sidebar-primary-foreground": "0 0% 100%", "sidebar-ring": "267 80% 54%",
        },
        dark: {
          background: "258 38% 8%", foreground: "270 35% 95%",
          card: "258 32% 12%", "card-foreground": "270 35% 95%",
          popover: "258 32% 12%", "popover-foreground": "270 35% 95%",
          primary: "271 95% 70%", "primary-foreground": "258 38% 8%",
          secondary: "257 22% 16%", "secondary-foreground": "270 35% 95%",
          muted: "257 22% 16%", "muted-foreground": "265 18% 62%",
          accent: "266 28% 22%", "accent-foreground": "270 35% 95%",
          destructive: "0 62% 50%", "destructive-foreground": "0 0% 100%",
          border: "258 18% 22%", input: "258 18% 22%", ring: "271 95% 70%",
          sidebar: "258 38% 7%", "sidebar-foreground": "270 35% 95%",
          "sidebar-border": "258 18% 18%", "sidebar-accent": "257 22% 14%",
          "sidebar-accent-foreground": "270 35% 95%", "sidebar-primary": "271 95% 70%",
          "sidebar-primary-foreground": "258 38% 8%", "sidebar-ring": "271 95% 70%",
        },
      },
    } satisfies ThemePreset,

  } as const,
};

export default theme;
export type Theme = typeof theme;
export type ThemePresetKey = keyof Theme["presets"];
