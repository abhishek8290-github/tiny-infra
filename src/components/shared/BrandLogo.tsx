import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  dotClassName?: string;
  textClassName?: string;
  accentClassName?: string;
  size?: "sm" | "md";
  showText?: boolean;
}

export function BrandLogo({
  className,
  dotClassName,
  textClassName,
  accentClassName,
  size = "md",
  showText = true,
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-display font-extrabold leading-none",
        size === "sm" ? "gap-2 text-xl" : "gap-2.5 text-2xl",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full bg-primary shrink-0",
          size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3",
          dotClassName
        )}
      />
      {showText && (
        <span className={cn("tracking-tight text-foreground", textClassName)}>
          deploy{" "}
          <span className={cn("text-primary", accentClassName)}>
            to
          </span>
        </span>
      )}
    </span>
  );
}
