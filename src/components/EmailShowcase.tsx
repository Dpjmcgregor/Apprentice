import { RejectionEmail } from "@/components/app/RejectionEmail";
import { hexToHslString, readableForeground } from "@/lib/format";
import type {
  BrandSettings,
  RejectionTemplate,
  Reward,
  Tone,
} from "@/lib/types";
import type { RenderContext } from "@/lib/format";

// "Show the artifact." Three real rejection emails in three brand liveries,
// rendered by the same component the product uses, not a mockup.
interface Sample {
  color: string;
  brand: BrandSettings;
  template: RejectionTemplate;
  reward: Reward;
  ctx: RenderContext;
}

const brandOf = (
  name: string,
  color: string,
  sender: string,
  tone: Tone
): BrandSettings => ({
  name,
  primaryColor: color,
  senderName: sender,
  replyTo: "careers@example.com",
  defaultTone: tone,
  whiteLabel: true, // keep the showcase clean (no "Powered by" footer)
  videoRejections: false,
  plan: "premium",
});

const SAMPLES: Sample[] = [
  {
    color: "#B95F3B",
    brand: brandOf("Bean & Bloom", "#B95F3B", "The Bean & Bloom Team", "warm"),
    template: {
      stage: "applied",
      enabled: true,
      subject: "Thank you, {{firstname}}",
      heading: "Thank you, {{firstname}}",
      body: "We loved that you wanted to pull shots with us. We had a huge response to the {{role}} role and won't be moving forward this time.\n\nYou chose us, so here's a coffee on the house next time you're in.",
      signoff: "Warmly,\nThe {{company}} team",
      tone: "warm",
      rewardId: "r1",
    },
    reward: {
      id: "r1",
      label: "A free coffee, on us",
      code: "ONUS-BREW",
      type: "freeproduct",
      value: 0,
    },
    ctx: {
      name: "Ava",
      role: "Barista",
      company: "Bean & Bloom",
      stage: "Applied",
      location: "London",
    },
  },
  {
    color: "#1F7A4D",
    brand: brandOf("Forge Fitness", "#1F7A4D", "Forge Talent", "aspirational"),
    template: {
      stage: "interview",
      enabled: true,
      subject: "It was great to meet you, {{firstname}}",
      heading: "So close, {{firstname}}",
      body: "Thanks for interviewing for the {{role}} role, you were up against a strong field and we've gone another way this time.\n\nKeep training with us. Here's three months of membership on the house.",
      signoff: "Onwards,\n{{company}}",
      tone: "aspirational",
      rewardId: "r2",
    },
    reward: {
      id: "r2",
      label: "3 months membership, free",
      code: "FORGE90",
      type: "freeproduct",
      value: 0,
    },
    ctx: {
      name: "Marcus",
      role: "Personal Trainer",
      company: "Forge Fitness",
      stage: "Interview",
      location: "Manchester",
    },
  },
  {
    color: "#2A1837",
    brand: brandOf("Maison Ivy", "#2A1837", "Maison Ivy Talent", "professional"),
    template: {
      stage: "final",
      enabled: true,
      subject: "A personal note from {{company}}",
      heading: "You were right there with us",
      body: "Reaching the final stage for the {{role}} role is no small thing, and this was a close call. We've made a different decision this time.\n\nWe'd love to keep you close. Enjoy 25% off the new collection.",
      signoff: "Personally,\nThe {{company}} team",
      tone: "professional",
      rewardId: "r3",
    },
    reward: {
      id: "r3",
      label: "25% off the new collection",
      code: "IVY25",
      type: "percentage",
      value: 25,
    },
    ctx: {
      name: "Priya",
      role: "Store Lead",
      company: "Maison Ivy",
      stage: "Final stage",
      location: "Leeds",
    },
  },
];

export function EmailShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {SAMPLES.map((s) => (
        <div
          key={s.brand.name}
          style={
            {
              "--primary": hexToHslString(s.color),
              "--primary-foreground": readableForeground(s.color),
            } as React.CSSProperties
          }
        >
          <RejectionEmail
            brand={s.brand}
            template={s.template}
            reward={s.reward}
            ctx={s.ctx}
            className="max-w-none"
          />
        </div>
      ))}
    </div>
  );
}
