import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/schema";

// Self-hosted system font stacks — no external font request, which
// matters for a directory site whose ranking depends partly on page
// speed. If a licensed webfont is preferred later, swap the CSS
// variables below (or reintroduce next/font once a real domain/CDN
// budget is set) without touching any component markup.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Local Trade Directory`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Weekly-updated profiles of local trade businesses, organized by industry and city.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-paper">{children}</body>
    </html>
  );
}
