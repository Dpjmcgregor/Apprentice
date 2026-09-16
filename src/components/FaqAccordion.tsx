"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

// Client leaf for the FAQ. The questions and answers are passed in from the
// server-rendered homepage so the copy stays in one place, verbatim. Radix
// Accordion handles the expand/collapse and the aria wiring; each question is
// rendered inside a semantic heading by the primitive.
export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <Card className="px-6 py-1">
      <Accordion type="single" collapsible className="w-full">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="last:border-b-0">
            <AccordionTrigger className="text-left text-base font-semibold text-foreground">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
