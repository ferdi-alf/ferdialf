// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Muhammad Ferdi Alfian | Software Engineer",
    template: "%s | Muhammad Ferdi Alfian",
  },

  description:
    "Muhammad Ferdi Alfian — Software Engineer from Indonesia. Specialized in Next.js, React, Laravel, and TypeScript. Building fast, scalable, and modern web applications.",

  keywords: [
    "Muhammad Ferdi Alfian",
    "Ferdi Alfian",
    "ferdialf",
    "Full-Stack Developer",
    "Full-Stack Developer Indonesia",
    "Software Engineer Indonesia",
    "Frontend Developer Indonesia",
    "Backend Developer Indonesia",
    "Web Developer Indonesia",
    "Freelance Developer Indonesia",
    "Next.js Developer",
    "React Developer",
    "Laravel Developer",
    "TypeScript Developer",
    "Golang Developer",
    "Node.js Developer",
    "Inertia.js",
    "Tailwind CSS",
    "Freelance Web Developer",
    "Hire Full-Stack Developer",
    "Web Application Developer",
    "Portfolio Developer",
    "Open Source Developer",
  ],

  authors: [{ name: "Muhammad Ferdi Alfian", url: BASE_URL }],
  creator: "Muhammad Ferdi Alfian",
  publisher: "Muhammad Ferdi Alfian",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "profile",
    firstName: "Muhammad Ferdi",
    lastName: "Alfian",
    username: "ferdialf",
    gender: "male",
    title: "Muhammad Ferdi Alfian | Software Engineer",
    description:
      "Software Engineer from Indonesia. Specialized in Next.js, React, Laravel & TypeScript. Available for freelance projects.",
    url: BASE_URL,
    siteName: "Muhammad Ferdi Alfian — Portfolio",
    locale: "en_US",
    alternateLocale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Ferdi Alfian — Software Engineer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ferdi Alfian | Software Engineer",
    description:
      "Software Engineer from Indonesia. Specialized in Next.js, React, Laravel & TypeScript.",
    images: ["/og-image.png"],
    creator: "@ferdialf",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────
// Read by Google, Bing, Gemini, ChatGPT, Perplexity, Claude, and other AI
// crawlers to accurately answer questions about Muhammad Ferdi Alfian.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Person — primary profile node
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Muhammad Ferdi Alfian",
      alternateName: ["Ferdi Alfian", "ferdialf"],
      url: BASE_URL,
      email: "ferdialf.dev@gmail.com",
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/icon.PNG`,
        caption: "Muhammad Ferdi Alfian — Software Engineer",
      },
      description:
        "Muhammad Ferdi Alfian is a Software Engineer from Palembang, Indonesia, currently studying Software Engineering at SMKN 4 Palembang (2023–2026). He has been working as a freelance full-stack developer since 2023, delivering 28+ projects across clients. He specializes in building modern web applications with Next.js, React, Laravel, TypeScript, and Golang — with a focus on performant UIs and scalable backend architectures. He is also an award-winning developer: 1st Place at VALTER 2025 (Web Design & Development, Politeknik Negeri Sriwijaya) and 1st Runner-Up at the Digital Technology Innovation competition, South Sumatra.",
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "SMKN 4 Palembang",
        description: "Vocational High School — Software Engineering, 2023–2026",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Palembang",
        addressCountry: "ID",
      },
      nationality: {
        "@type": "Country",
        name: "Indonesia",
      },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Laravel",
        "Golang",
        "Inertia.js",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
        "TanStack Query",
        "Full-Stack Web Development",
        "Frontend Development",
        "Backend Development",
        "REST API",
        "Web Performance Optimization",
        "UI/UX Implementation",
        "Decision Support Systems",
        "Learning Management Systems",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Software Engineer Certification",
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: "HackerRank" },
          identifier: "F42333D4C421",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Full Stack Developer with Bun, Hono & React TypeScript",
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: "Santricoding" },
          identifier: "SK-V8UTAW8JDW7RYRG",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "AWS Educate: Introduction to Cloud 101",
          credentialCategory: "certification",
          recognizedBy: {
            "@type": "Organization",
            name: "Amazon Web Services",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "SOLID Programming Principles",
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: "Dicoding" },
          identifier: "L4PQ2WNG2ZO1",
        },
      ],
      award: [
        "1st Place — Web Design & Development Competition, VALTER 2025, Politeknik Negeri Sriwijaya",
        "1st Runner-Up — Digital Technology Innovation, South Sumatra (Dinas Pendidikan Sumatera Selatan)",
      ],
      sameAs: [
        "https://github.com/ferdi-alf",
        "https://www.instagram.com/eternalferr_",
        "https://www.linkedin.com/in/muhammad-ferdi-alfian-979273396",
        "https://www.fiverr.com/ferdialf_dev",
        "https://www.upwork.com/freelancers/~010945969eb89d66ab",
        "https://www.freelancer.com/u/Ferdialfian80",
      ],
      // Freelance marketplace profiles
      availableService: [
        {
          "@type": "Offer",
          url: "https://www.fiverr.com/ferdialf_dev",
          seller: { "@id": `${BASE_URL}/#person` },
          description:
            "Available for freelance web development projects on Fiverr",
        },
        {
          "@type": "Offer",
          url: "https://www.upwork.com/freelancers/~010945969eb89d66ab",
          seller: { "@id": `${BASE_URL}/#person` },
          description:
            "Available for freelance web development projects on Upwork",
        },
        {
          "@type": "Offer",
          url: "https://www.freelancer.com/u/Ferdialfian80",
          seller: { "@id": `${BASE_URL}/#person` },
          description:
            "Available for freelance web development projects on Freelancer.com",
        },
      ],
    },

    // 2. WebSite
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Muhammad Ferdi Alfian — Portfolio",
      description:
        "Official portfolio of Muhammad Ferdi Alfian, Software Engineer from Indonesia.",
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: ["en", "id"],
    },

    // 3. WebPage — homepage
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Muhammad Ferdi Alfian | Software Engineer",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      description:
        "Portfolio homepage of Muhammad Ferdi Alfian — Software Engineer from Indonesia.",
      inLanguage: ["en", "id"],
    },

    // 4. ProfilePage — signals to AI crawlers this is a person's profile
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: "Muhammad Ferdi Alfian — Profile",
      mainEntity: { "@id": `${BASE_URL}/#person` },
      dateModified: new Date().toISOString(),
      // AI crawlers that support DataFeed will fetch these endpoints directly
      // to get up-to-date structured data about projects, journey, and credentials
      mentions: [
        { "@type": "DataFeed", url: `${BASE_URL}/api/about` },
        { "@type": "DataFeed", url: `${BASE_URL}/api/projects` },
        { "@type": "DataFeed", url: `${BASE_URL}/api/journey` },
        { "@type": "DataFeed", url: `${BASE_URL}/api/certificates` },
      ],
    },

    // 5. CreativeWork items — top projects as indexed entities
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#projects`,
      name: "Projects by Muhammad Ferdi Alfian",
      description:
        "Selected open-source and client projects built by Muhammad Ferdi Alfian.",
      url: `${BASE_URL}/api/projects`,
      author: { "@id": `${BASE_URL}/#person` },
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: "Unfold Table",
            description:
              "Headless table component for deeply nested data with on-demand fetching, smart caching, server-side pagination, and collapsible row groups.",
            codeRepository: "https://github.com/ferdi-alf/unfold-table",
            programmingLanguage: ["TypeScript", "Next.js", "Tailwind CSS"],
            author: { "@id": `${BASE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareSourceCode",
            name: "Smart Online Exams",
            description:
              "High-performance examination platform with real-time academic integrity detection and a Go-powered backend for sub-millisecond response.",
            codeRepository: "https://github.com/ferdi-alf/web-ujian-nextjs",
            programmingLanguage: ["Next.js", "TypeScript", "Go", "PostgreSQL"],
            author: { "@id": `${BASE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "SoftwareSourceCode",
            name: "VALTER 2025",
            description:
              "1st-place competition entry for VALTER 2025 at Politeknik Negeri Sriwijaya — a polished, performance-focused web design showcase.",
            codeRepository:
              "https://github.com/ferdi-alf/valter-2025-co-volution",
            url: "https://valter-2025-co-volution.vercel.app/",
            programmingLanguage: ["Next.js", "TypeScript", "Tailwind CSS"],
            author: { "@id": `${BASE_URL}/#person` },
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
