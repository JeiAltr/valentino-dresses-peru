import { cn } from "@/lib/utils";

/**
 * Premium placeholder visual for product images.
 * Creates an elegant silhouette with decorative patterns
 * that looks intentional and polished — not like a generic placeholder.
 */
export function ProductArt({
  name,
  tone = 0,
  className,
}: {
  name: string;
  tone?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "product-art relative flex aspect-[3/4] items-end overflow-hidden p-5",
        `tone-${tone}`,
        className
      )}
    >
      {/* Decorative dress silhouette */}
      <div className="absolute inset-x-[20%] top-[8%] bottom-[14%] flex flex-col items-center">
        {/* Head */}
        <div className="w-[28%] aspect-square rounded-full border border-foreground/8 bg-background/15" />
        {/* Neck */}
        <div className="w-[12%] h-[4%] bg-background/10" />
        {/* Shoulders & bodice */}
        <div className="w-[75%] h-[18%] rounded-[50%_50%_8%_8%] border border-foreground/8 bg-background/12" />
        {/* Waist */}
        <div className="w-[50%] h-[6%] bg-background/10 border-x border-foreground/6" />
        {/* Skirt */}
        <div className="w-full flex-1 rounded-[6%_6%_35%_35%] border border-foreground/8 bg-background/12" />
      </div>

      {/* Subtle diagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 8px, currentColor 8px, currentColor 9px)",
        }}
      />

      {/* Bottom shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Product name label */}
      {name && (
        <span className="relative font-display text-xl leading-tight text-foreground/70 drop-shadow-sm">
          {name}
        </span>
      )}
    </div>
  );
}
