import { cn } from "@/lib/cn";
import type { BullardAwardClass, BullardAwardRecipient } from "@/lib/bullard-award";

function RecipientCell({
  recipient,
  className,
}: {
  recipient: BullardAwardRecipient;
  className?: string;
}) {
  return (
    <article className={cn("px-6 py-8 sm:px-8 sm:py-10", className)}>
      <p className="font-label text-xs uppercase tracking-[0.22em] text-gold">
        {recipient.categoryLabel}
      </p>
      <h3 className="mt-3 font-display text-2xl font-bold tracking-wide text-white sm:text-[1.65rem]">
        {recipient.name}
      </h3>
      {(recipient.role || recipient.unit) && (
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          {recipient.role}
          {recipient.role && recipient.unit && (
            <span aria-hidden="true" className="mx-2 text-gold/60">
              ·
            </span>
          )}
          {recipient.unit}
        </p>
      )}
    </article>
  );
}

function AwardClass({ awardClass }: { awardClass: BullardAwardClass }) {
  const [officer, nco] = awardClass.recipients;

  return (
    <div className="overflow-hidden rounded border border-artillery-light/15 bg-artillery text-white shadow-[0_12px_40px_rgba(20,20,20,0.12)]">
      <div className="flex items-end justify-between gap-4 border-b border-gold/25 bg-gradient-to-r from-redleg/20 via-transparent to-transparent px-6 py-5 sm:px-8">
        <div>
          <p className="font-label text-xs uppercase tracking-[0.24em] text-gold">
            Recipients
          </p>
          <p className="mt-1 text-sm text-white/70">
            Engraved on the chapter trophy at Saint Francis Barracks
          </p>
        </div>
        <p className="font-display text-4xl font-bold leading-none tracking-wide text-gold sm:text-5xl">
          {awardClass.year}
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        <RecipientCell
          recipient={officer}
          className="border-b border-gold/15 md:border-b-0 md:border-r"
        />
        <RecipientCell recipient={nco} />
      </div>
    </div>
  );
}

export function BullardAwardRecipients({
  classes,
  className,
}: {
  classes: BullardAwardClass[];
  className?: string;
}) {
  if (classes.length === 0) return null;

  return (
    <section className={cn("mt-14", className)} aria-labelledby="recipients-heading">
      <h2
        id="recipients-heading"
        className="font-display text-2xl font-bold tracking-wide text-artillery"
      >
        Award Recipients
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-artillery-light">
        Two Redlegs are honored each year — one junior officer and one NCO —
        for leadership that reflects the standard set by MG (Ret) Bullard.
      </p>

      <div className="mt-8 space-y-8">
        {classes.map((awardClass) => (
          <AwardClass key={awardClass.year} awardClass={awardClass} />
        ))}
      </div>
    </section>
  );
}
