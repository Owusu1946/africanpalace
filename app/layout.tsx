import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The African Palace | Tamale's Premier Luxury Airbnb",
  description: "Tamale's most reviewed and luxurious Airbnb. Experience world-class hospitality, modern comfort, and northern character.",
  openGraph: {
    title: "The African Palace",
    description: "Tamale's most reviewed and luxurious Airbnb.",
    url: "https://africanpalace.vercel.app", // Placeholder URL, update if you have a real one
    siteName: "The African Palace",
    images: [
      {
        url: "/hero/main.jpg",
        width: 1200,
        height: 630,
        alt: "The African Palace - Tamale Luxury Airbnb",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The African Palace",
    description: "Tamale's most reviewed and luxurious Airbnb.",
    images: ["/hero/main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
