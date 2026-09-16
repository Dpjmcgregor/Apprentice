import { RejectionEmail } from "@/components/app/RejectionEmail";
import { hexToHslString, readableForeground } from "@/lib/format";
import type {
  BrandSettings,
  RejectionTemplate,
  Reward,
  Tone,
} from "@/lib/types";
import type { RenderContext } from "@/lib/format";

// "Show the artifact." The additional message Cushion sends, in three brand
// liveries, rendered by the same component the product uses, not a mockup. One
// at the point of application, two after an unsuccessful outcome. Cushion sends
// this alongside the brand's own emails; it never sends the rejection itself.
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
      subject: "Thanks for applying, {{firstname}}",
      heading: "Thanks for applying, {{firstname}}",
      body: "You applied to be our {{role}}, and we're glad you did. As a thank you, here's a coffee on us.\n\nWhatever happens next, you've got access to a few perks from us and our partners.",
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
      subject: "A thank you from {{company}}",
      heading: "Thanks for going for it, {{firstname}}",
      body: "You interviewed for the {{role}} role. It didn't work out this time, and you'll have heard that from our team already.\n\nThis is just us saying thank you. Here's three months of membership on us.",
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
      subject: "A note from {{company}}",
      heading: "You were close, {{firstname}}",
      body: "Reaching the final stage for the {{role}} role is no small thing. Our team have already been in touch about the decision.\n\nWe wanted to add our own thank you. Enjoy 25% off the new collection.",
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
