import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WaitlistForm, hasJoinedWaitlist } from "./WaitlistForm";

const PROMPTED_KEY = "cushion:waitlist:prompted:v1";

function alreadyPrompted(): boolean {
  try {
    return window.localStorage.getItem(PROMPTED_KEY) === "1";
  } catch {
    return false;
  }
}

// Gently prompts a first-time visitor to join the waitlist a few seconds after
// they land, once per browser, and never if they've already joined.
export function WaitlistPrompt({ delayMs = 3500 }: { delayMs?: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasJoinedWaitlist() || alreadyPrompted()) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.localStorage.setItem(PROMPTED_KEY, "1");
      } catch {
        /* ignore */
      }
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <DialogTitle className="text-xl">
            Be first to reject well
          </DialogTitle>
          <DialogDescription>
            Cushion is rolling out to consumer brands now. Join the waitlist for
            early access and start keeping the applicants you reject.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-1">
          <WaitlistForm source="landing-prompt" autoFocus />
        </div>
      </DialogContent>
    </Dialog>
  );
}
