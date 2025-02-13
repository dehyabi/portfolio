import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    icon: "/github.svg",
    apple: "/github.svg",
  },
  openGraph: {
    title: "Dehya Qalbi - Full-Stack Developer",
    description: "Personal portfolio showcasing skills and projects",
    type: "website",
    locale: "en_US",
    images: ["/github.svg"],
  },
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
