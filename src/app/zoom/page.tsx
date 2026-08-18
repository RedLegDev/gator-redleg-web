import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import {
  ZOOM_JOIN_URL,
  ZOOM_MEETING_ID,
  ZOOM_PASSCODE,
  ZOOM_DIAL_IN,
  ZOOM_SIP,
} from "@/lib/zoom";

export const metadata: Metadata = {
  title: "Chapter Zoom Room",
  description:
    "Join the Gator Redleg Chapter's monthly meeting on Zoom — join link, meeting ID, passcode, and dial-in numbers.",
  // Meeting credentials live here; keep the page reachable but out of search.
  robots: { index: false, follow: true },
};

/** Label/value row used for the meeting ID and passcode. */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-label text-xs uppercase tracking-[0.2em] text-artillery-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-semibold tracking-wide text-artillery">
        {value}
      </p>
    </div>
  );
}

export default function ZoomPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Meeting"
        title="Chapter Zoom Room"
        subtitle="The Gator Redlegs meet monthly at 1900 Eastern. Everything you need to get on the call is below."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <div className="rounded border-l-4 border-gold bg-amber-50/60 p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Join the Meeting
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-artillery-light">
              The join link carries the passcode, so one click is normally all it
              takes. If you are prompted, use the meeting ID and passcode below.
            </p>

            <div className="mt-5">
              <Button href={ZOOM_JOIN_URL} size="lg">
                Join Zoom Meeting
              </Button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Detail label="Meeting ID" value={ZOOM_MEETING_ID} />
              <Detail label="Passcode" value={ZOOM_PASSCODE} />
            </div>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Join by Phone
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-artillery-light">
              Driving or short on bandwidth? Tap a number to dial in with the
              meeting ID and passcode already attached.
            </p>
            <ul className="mt-4 space-y-2">
              {ZOOM_DIAL_IN.map((line) => (
                <li key={line.tel}>
                  <a
                    href={`tel:${line.tel}`}
                    className="font-semibold text-redleg underline"
                  >
                    {line.display}
                  </a>{" "}
                  <span className="text-sm text-artillery-muted">
                    ({line.region})
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-artillery-light">
              Dialing manually? Enter meeting ID{" "}
              <strong>{ZOOM_MEETING_ID}</strong>, then passcode{" "}
              <strong>{ZOOM_PASSCODE}</strong>.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Join by SIP
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-artillery-light">
              For conference-room systems:{" "}
              <span className="font-semibold text-artillery">{ZOOM_SIP}</span>
            </p>
          </section>

          <section className="mt-10 border-t border-artillery/10 pt-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Meeting Cadence
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-artillery-light">
              Chapter meetings are generally the third Thursday of the month at
              1900 Eastern, with the occasional shift for scheduling conflicts.
              Dates go out on the{" "}
              <a href="/newsletter" className="font-semibold text-redleg underline">
                Redleg Newsletter
              </a>{" "}
              — subscribe there so you never miss the call.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
