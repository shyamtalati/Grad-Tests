import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grad-tests.vercel.app"),
  title: "Apta Tests | LSAT Practice and Graduate Exam Prep",
  description:
    "Apta Tests offers original, unofficial LSAT-style practice with timed sections, review, and clear legal disclaimers.",
  openGraph: {
    title: "Apta Tests",
    description:
      "Original, unofficial LSAT-style practice for focused legal exam preparation.",
    images: ["/apta-legal-study-hero.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
