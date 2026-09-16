import type { Metadata } from "next";
import "../src/index.css";
import { Providers } from "./providers";

const TITLE = "Cushion | Your applicants are your best advocates";
const DESCRIPTION =
  "Cushion gives every applicant access to exclusive rewards from the moment they apply, whether they get the job or not. Applicant advocacy for consumer brands, built around UK GDPR and PECR.";
const OG_DESCRIPTION =
  "The people who apply to work for you are your best advocates. Cushion gives every applicant access to exclusive rewards from the moment they apply, with consent handled properly.";

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
      "Every applicant gets access to exclusive rewards from the moment they apply. Whether they get the job or not. Applicant advocacy for consumer brands.",
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
