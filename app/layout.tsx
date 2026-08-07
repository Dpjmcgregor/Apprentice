import type { Metadata } from "next";
import "../src/index.css";
import { Providers } from "./providers";

const TITLE = "Cushion | Keep the customers you reject";
const DESCRIPTION =
  "You reject thousands of people who wanted to work for you. Cushion plugs into your ATS and turns each rejection into a warm, on-brand note with a real reward, so the people who chose your brand stay customers. Built for consumer brands.";
const OG_DESCRIPTION =
  "Cushion plugs into your ATS and turns each rejected applicant into a warm, on-brand note with a real reward. Talent installs it once, growth gets the reporting.";

// Metadata API: title, description and Open Graph tags are emitted into the
// server-rendered <head> by Next, not hardcoded in an index.html.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.joincushion.com"),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Cushion" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    url: "https://www.joincushion.com/",
    siteName: "Cushion",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Turn each rejected applicant into a warm, on-brand note with a real reward. Talent installs it once, growth gets the reporting.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
