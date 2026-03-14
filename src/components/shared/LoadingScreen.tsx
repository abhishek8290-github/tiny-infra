import { cn } from "@/lib/utils";
import theme from "@/theme.config";

// ============================================================
// LoadingScreen — Full page loader shown while Clerk loads
// or while navigating between protected pages
// ============================================================
export function LoadingScreen({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-background",
        className
      )}
    >
      {/* Animated logo / app name */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Spinning ring */}
          <div className="h-10 w-10 rounded-full border-2 border-muted border-t-primary animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground font-mono tracking-wider animate-pulse">
          {theme.app.name}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// LoadingSpinner — Inline spinner for smaller loading states
// ============================================================
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 w-4 rounded-full border-2 border-muted border-t-primary animate-spin",
        className
      )}
    />
  );
}