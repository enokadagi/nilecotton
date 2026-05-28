import type { Metadata } from "next";
import Header from "@/components/Header";
import { AutoTranslateProvider } from "@/components/AutoTranslateProvider";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NileCotton — Luxury Hospitality Textiles",
  description: "NileCotton crafts premium cotton towels, robes, and hospitality linens with a warm, luxury sensibility.",
  metadataBase: new URL("https://nilecotton.com"),
  openGraph: {
    title: "NileCotton — Luxury Hospitality Textiles",
    description: "Premium cotton towels, robes, and hospitality linens designed for luxury homes, hotels, resorts and spas.",
    type: "website",
    url: "https://nilecotton.com",
    siteName: "NileCotton",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NileCotton luxury hospitality textiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NileCotton — Luxury Hospitality Textiles",
    description: "Premium cotton towels, robes, and hospitality linens designed for luxury homes, hotels, resorts and spas.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F8F5F0] text-[#1C1B1A] font-sans">
        <AutoTranslateProvider>
          <div className="min-h-screen">
            <Header />
            {children}
          </div>
        </AutoTranslateProvider>
      </body>
    </html>
  );
}
