import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Post Maker — Instant Listing Creatives",
  description:
    "Turn four property details into a polished, share-ready listing post in seconds. Built by Saiteja Mathamala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
