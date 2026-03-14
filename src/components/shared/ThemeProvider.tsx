import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useEffect, useState, type ComponentProps } from "react";
import theme, { type ThemePresetKey } from "@/theme.config";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;
const THEME_PRESET_STORAGE_KEY = "app-theme-preset";

function isValidPresetKey(value: string | null): value is ThemePresetKey {
  return !!value && value in theme.presets;
}

function ThemeTokenSync() {
  const { resolvedTheme } = useTheme();
  const [activePreset, setActivePreset] = useState<ThemePresetKey>(() => {
    if (typeof window === "undefined") return theme.defaultPreset;
    const stored = window.localStorage.getItem(THEME_PRESET_STORAGE_KEY);
    return isValidPresetKey(stored) ? stored : theme.defaultPreset;
  });

  useEffect(() => {
    const handlePresetChange = () => {
      const stored = window.localStorage.getItem(THEME_PRESET_STORAGE_KEY);
      if (isValidPresetKey(stored)) {
        setActivePreset(stored);
      }
    };

    window.addEventListener("theme-preset-change", handlePresetChange);
    window.addEventListener("storage", handlePresetChange);

    return () => {
      window.removeEventListener("theme-preset-change", handlePresetChange);
      window.removeEventListener("storage", handlePresetChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mode = resolvedTheme === "dark" ? "dark" : "light";
    const tokens = theme.presets[activePreset].tokens[mode];

    Object.entries(tokens).forEach(([token, value]) => {
      root.style.setProperty(`--${token}`, String(value));

      // Keep sidebar background token compatible with Tailwind mapping
      // (bg-sidebar uses --sidebar-background).
      if (token === "sidebar") {
        root.style.setProperty("--sidebar-background", String(value));
      }
    });

    const preset = theme.presets[activePreset];
    root.style.setProperty("--radius", preset.radius);
    root.style.setProperty("--font-display", preset.fonts.display);
    root.style.setProperty("--font-body", preset.fonts.body);
    root.style.setProperty("--font-mono", preset.fonts.mono);
    root.style.setProperty("--sidebar-width", theme.sidebar.width);
    root.style.setProperty("--sidebar-collapsed-width", theme.sidebar.collapsedWidth);

    // Load preset-specific webfonts
    [preset.fonts.displayUrl, preset.fonts.bodyUrl]
      .filter(Boolean)
      .forEach((url) => {
        const safeId = `theme-font-${btoa(url).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`;
        if (!document.getElementById(safeId)) {
          const link = document.createElement("link");
          link.id = safeId;
          link.rel = "stylesheet";
          link.href = url;
          document.head.appendChild(link);
        }
      });
  }, [resolvedTheme, activePreset]);

  return null;
}

// ============================================================
// ThemeProvider
// Wraps next-themes + syncs design tokens from theme.config.ts
// into CSS variables for runtime theming.
// ============================================================
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeTokenSync />
      {children}
    </NextThemesProvider>
  );
}