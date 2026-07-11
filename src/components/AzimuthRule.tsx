import { cn } from "@/lib/cn";

/**
 * Signature divider: a gunner's deflection/azimuth scale — a gold baseline
 * with tick marks and a center index diamond, echoing an artillery aiming
 * circle. Used to separate major sections.
 */
export function AzimuthRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative h-4 w-full", className)}
      aria-hidden="true"
    >
      {/* tick marks */}
      <div
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--color-gold) 0 1px, transparent 1px 14px)",
          maskImage: "linear-gradient(to top, black 55%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)",
        }}
      />
      {/* baseline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold" />
      {/* center index */}
      <div className="absolute bottom-[-4px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-2 border-gold bg-artillery" />
    </div>
  );
}
