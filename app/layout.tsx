import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://ferdialf.vercel.app"),
  title: {
    default: "Muhammad Ferdi Alfian | Software Engineer",
    template: "%s | Muhammad Ferdi Alfian",
  },
  description:
    "Software Engineer from Indonesia. Specialized in Next.js, Golang, and scalable web systems.",
  keywords: [
    "Muhammad Ferdi Alfian",
    "Freelance Developer",
    "Web Developer Indonesia",
    "Web Developer",
    "Web Development",
    "Fullstack Developer",
    "Fullstack Web Developer",
    "Web Engineer",
    "Next.js Developer",
    "Golang Developer",
    "Software Engineer",
    "Web Application Developer",
    "React Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Open Source Contributor",
    "App Developer",
  ],
  authors: [{ name: "Muhammad Ferdi Alfian" }],
  openGraph: {
    title: "Muhammad Ferdi Alfian | Software Engineer",
    description:
      "Software Engineer building scalable web applications with Next.js and Golang.",
    url: "https://ferdialf.vercel.app",
    siteName: "Muhammad Ferdi Alfian",
    images: [
      {
        url: "/og-image.png",
        width: 1000,
        height: 1000,
        alt: "Muhammad Ferdi Alfian Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Muhammad Ferdi Alfian | Software Engineer",
    description: "Software Engineer specializing in modern web architecture.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
