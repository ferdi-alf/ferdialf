import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LightRays from "@/components/LightRays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ferdi Alfian",
  description: "Portofolio Muhammad Ferdi Alfian",
  keywords:
    "Muhammad Ferdi Alfian, muhammad ferdi alfian portofolio, web developer, jasa web developer, programmer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <div className="relative bg-black flex justify-center items-center">
          <Navbar />
          <div className=" md:px-0 p-3  w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
