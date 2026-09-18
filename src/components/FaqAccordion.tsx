"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Client leaf for the FAQ. Questions and answers come from the server-rendered
// homepage so the copy stays in one place, verbatim. A plain, bordered shadcn
// Accordion, no cards. Radix supplies the aria wiring and a heading per item.
export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full border-t border-border">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
          <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
