import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Standardized Practice",
  description: "Practice LSAT sections and review explanations."
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
