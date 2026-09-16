"use client";

import dynamic from "next/dynamic";

// Everything that isn't the marketing homepage (sign in, the applicant apply
// flow, the rejection experience and the whole authenticated workspace) runs as
// a client-only single-page app built on react-router. It is loaded with
// ssr:false so react-router owns the URL in the browser and never renders on
// the server.
const SpaApp = dynamic(() => import("@/spa/SpaApp"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />,
});

export default function CatchAll() {
  return <SpaApp />;
}
