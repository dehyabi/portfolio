import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dehya Qalbi - Full-Stack Developer",
  description:
    "Personal portfolio of Dehya Qalbi, a full-stack developer specializing in web development and project management.",
  keywords: [
    "full-stack developer",
    "web development",
    "next.js",
    "typescript",
    "tailwind css",
  ],
  authors: [{ name: "Dehya Qalbi" }],
  icons: {
    icon: [
      { url: "/portfolio/favicons/favicon.ico" },
      {
        url: "/portfolio/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/portfolio/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/portfolio/favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: "Dehya Qalbi - Full-Stack Developer",
    description: "Personal portfolio showcasing skills and projects",
    type: "website",
    locale: "en_US",
    images: ["/portfolio/favicons/og-image.png"],
  },
  manifest: "/portfolio/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
