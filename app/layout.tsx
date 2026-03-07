import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chronyx — Web, Mobile & Digital Marketing",
    template: "%s | Chronyx",
  },
  description:
    "Chronyx delivers professional web & mobile app development, SEO optimisation, social media management, content strategy, and performance advertising. Let's grow your digital presence.",
  keywords: [
    "web development",
    "mobile apps",
    "SEO",
    "digital marketing",
    "social media management",
    "content strategy",
    "paid advertising",
    "Next.js developer",
    "React developer",
    "freelancer",
  ],
  authors: [{ name: "Chronyx", url: "https://chronyx.tech" }],
  creator: "Chronyx",
  metadataBase: new URL("https://chronyx.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chronyx.tech",
    siteName: "Chronyx",
    title: "Chronyx — Web, Mobile & Digital Marketing",
    description:
      "Professional web & mobile development and full-spectrum digital marketing — SEO, social, content, and ads.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Chronyx" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronyx — Web, Mobile & Digital Marketing",
    description:
      "Professional web & mobile development and full-spectrum digital marketing.",
    creator: "@chronyx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
