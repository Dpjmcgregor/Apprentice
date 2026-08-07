"use client";

import { useStore } from "@/lib/store";
import { formatNumber } from "@/lib/format";

// The live waitlist tally. It reads from the client store (localStorage), so it
// can differ between the server-rendered seed value and the browser's actual
// value; suppressHydrationWarning lets the client number win without a warning.
export function WaitlistCount() {
  const { data } = useStore();
  const count = data.waitlist?.length ?? 0;

  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      You&rsquo;ll be in good company:{" "}
      <span className="font-semibold text-foreground" suppressHydrationWarning>
        {formatNumber(count)}
      </span>{" "}
      <span suppressHydrationWarning>
        {count === 1 ? "brand has" : "brands have"}
      </span>{" "}
      already joined.
    </p>
  );
}
