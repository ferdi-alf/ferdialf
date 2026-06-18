// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://ferdialf.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Freelance Software Engineer for Hire | Muhammad Ferdi Alfian",
    template: "%s | Muhammad Ferdi Alfian — Web Developer",
  },

  description:
    "Freelance Full-Stack Web Developer from Indonesia. Specialized in Next.js, React, Laravel, TypeScript & Golang. 20+ projects delivered for clients worldwide. Available for remote freelance & long-term contracts.",

  keywords: [
    // International — high commercial intent
    "freelance web developer for hire",
    "hire web developer",
    "hire full-stack developer",
    "hire Next.js developer",
    "hire React developer",
    "hire Laravel developer",
    "remote web developer",
    "affordable web developer",
    "offshore web developer",
    "web developer from Indonesia",
    "web designer",
    "Indonesian web developer",
    "freelance full-stack developer",
    "web development services",
    "custom web application development",
    "software engineer for hire",
    "remote software engineer",

    //International — tech-specific (clients who know what they want) ===
    "Next.js developer",
    "React developer for hire",
    "Laravel developer for hire",
    "TypeScript developer",
    "Golang developer",
    "full-stack Next.js developer",
    "Node.js developer for hire",

    //🇮🇩 Indonesia — lokal, tetap dipertahankan
    "jasa web developer",
    "jasa pembuatan website",
    "web developer Indonesia",
    "software engineer Indonesia",
    "freelance web developer Indonesia",
    "jasa web developer Palembang",
    "web developer Palembang",
    "jasa software development Indonesia",

    //  Personal brand
    "Muhammad Ferdi Alfian",
    "Ferdi Alfian",
    "ferdialf",
    "ferdialf.dev",
  ],

  authors: [{ name: "Muhammad Ferdi Alfian", url: BASE_URL }],
  creator: "Muhammad Ferdi Alfian",
  publisher: "Muhammad Ferdi Alfian",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  alternates: {
    canonical: BASE_URL,

    languages: {
      "en-US": BASE_URL,
      "id-ID": `${BASE_URL}/id`,

      "x-default": BASE_URL,
    },
  },

  applicationName: "Ferdialf — Software Engineer",

  openGraph: {
    type: "profile",
    firstName: "Muhammad Ferdi",
    lastName: "Alfian",
    username: "ferdialf",
    gender: "male",
    title: "Freelance Software Developer for Hire | Muhammad Ferdi Alfian",
    description:
      "Software Engineer from Indonesia. Next.js, React, Laravel, TypeScript & Golang. 20+ projects delivered. Available for remote freelance worldwide.",
    url: BASE_URL,
    siteName: "Ferdialf — Software Engineer",
    locale: "en_US",
    alternateLocale: "id_ID",
    images: [
      {
        url: `${BASE_URL}/images/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Muhammad Ferdi Alfian — Freelance Software from Indonesia",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Freelance Software Engineer for Hire | Muhammad Ferdi Alfian",
    description:
      "Software Engineer from Indonesia. Next.js, React, Laravel, TypeScript. 20+ projects. Available for remote freelance worldwide.",
    images: [`${BASE_URL}/images/og-image.webp`],
    creator: "@ferdialf",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// ─── JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Muhammad Ferdi Alfian",
      alternateName: ["Ferdi Alfian", "ferdialf"],
      url: BASE_URL,
      email: "ferdialf.dev@gmail.com",
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/icon.webp`,
        caption:
          "Muhammad Ferdi Alfian — Freelance Web Developer from Indonesia",
      },
      description:
        "Muhammad Ferdi Alfian is a Software Engineer and Full-Stack Web Developer from Palembang, Indonesia. Currently studying Software Engineering at SMKN 4 Palembang (2023–2026). Freelance full-stack developer since 2023 with 20+ projects delivered for clients locally and internationally. Specializes in Next.js, React, Laravel, TypeScript, and Golang — with a focus on performant UIs and scalable backend architectures. Award-winning developer: 1st Place at VALTER 2025 (Web Design & Development, Politeknik Negeri Sriwijaya) and 1st Runner-Up at the Digital Technology Innovation competition, South Sumatra.",
      jobTitle: "Freelance Full-Stack Web Developer & Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance (Remote)",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "SMKN 4 Palembang",
        description: "Software Engineering, 2023–2026",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Palembang",
        addressRegion: "South Sumatra",
        addressCountry: "ID",
        postalCode: "30000",
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
        "1st Place — Web Design & Development, VALTER 2025, Politeknik Negeri Sriwijaya, Indonesia",
        "1st Runner-Up — Digital Technology Innovation, South Sumatra Province, Indonesia",
      ],
      sameAs: [
        "https://github.com/ferdi-alf",
        "https://www.instagram.com/eternalferr_",
        "https://www.linkedin.com/in/muhammad-ferdi-alfian-979273396",
        "https://www.fiverr.com/ferdialf_dev",
        "https://www.upwork.com/freelancers/~010945969eb89d66ab",
        "https://www.freelancer.com/u/Ferdialfian80",
      ],
      availableService: [
        {
          "@type": "Offer",
          url: "https://www.fiverr.com/ferdialf_dev",
          seller: { "@id": `${BASE_URL}/#person` },
          description: "Available for web development projects on Fiverr",
        },
        {
          "@type": "Offer",
          url: "https://www.upwork.com/freelancers/~010945969eb89d66ab",
          seller: { "@id": `${BASE_URL}/#person` },
          description: "Available for web development projects on Upwork",
        },
        {
          "@type": "Offer",
          url: "https://www.freelancer.com/u/Ferdialfian80",
          seller: { "@id": `${BASE_URL}/#person` },
          description:
            "Available for web development projects on Freelancer.com",
        },
      ],
    },

    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Freelance Web Development Services — Muhammad Ferdi Alfian",
      alternateName: [
        "Jasa Web Developer Indonesia",
        "Jasa Pembuatan Website",
        "Hire Web Developer Indonesia",
        "Remote Web Developer for Hire",
        "Affordable Web Development Services",
      ],
      // English description
      description:
        "Professional web development and software engineering services from Indonesia. Specializing in Next.js, React, Laravel, TypeScript, and Golang. Affordable rates with high-quality output. Available for remote freelance worldwide — startups, SMEs, and enterprise clients.",
      url: BASE_URL,
      email: "ferdialf.dev@gmail.com",
      provider: { "@id": `${BASE_URL}/#person` },
      // Bilingual serviceType — Google matches ini ke search query dalam bahasa apapun
      serviceType: [
        // English
        "Web Development",
        "Full-Stack Web Development",
        "Frontend Development",
        "Backend Development",
        "Software Development",
        "API Development",
        "Web Application Development",
        "Landing Page Development",
        "Company Profile Website",
        "E-commerce Development",
        "Custom Software Development",
        "Remote Web Development",
        // Indonesian
        "Jasa Pembuatan Website",
        "Jasa Web Developer",
        "Jasa Software Development",
        "Jasa Aplikasi Web",
      ],
      // areaServed — explicit worldwide + Indonesia
      areaServed: [
        { "@type": "Country", name: "Indonesia" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Singapore" },
        { "@type": "Country", name: "Malaysia" },
        { "@type": "AdministrativeArea", name: "Worldwide (Remote)" },
      ],
      availableLanguage: [
        { "@type": "Language", name: "English" },
        { "@type": "Language", name: "Indonesian" },
      ],
      priceRange: "$$",
      paymentAccepted: ["Bank Transfer", "PayPal", "Wise", "Crypto"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Professional Website Development",
            description:
              "Modern, fast, SEO-friendly websites built with Next.js or Laravel. Perfect for company profiles, landing pages, and portfolios.",
          },
          {
            "@type": "Offer",
            name: "Web Application Development",
            description:
              "Full-stack web applications with authentication, database, and REST API. Built with Next.js + PostgreSQL or Laravel + MySQL.",
          },
          {
            "@type": "Offer",
            name: "API & Backend Development",
            description:
              "High-performance REST APIs with Go (Golang) or Laravel. Ideal for startups needing scalable backend infrastructure.",
          },
          {
            "@type": "Offer",
            name: "Frontend Development",
            description:
              "UI/UX implementation with React, Next.js, and Tailwind CSS. Highly performant, responsive, and accessible.",
          },
        ],
      },
    },

    // 3. WebSite
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Ferdalf — Freelance Web Developer",
      description:
        "Portfolio and services of Muhammad Ferdi Alfian — Freelance Web Developer & Software Engineer from Indonesia.",
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: ["en", "id"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/projects?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 4. WebPage
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Freelance Web Developer for Hire | Muhammad Ferdi Alfian",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      description:
        "Portfolio and freelance web development services by Muhammad Ferdi Alfian — Full-Stack Developer from Indonesia, available worldwide.",
      inLanguage: ["en", "id"],
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
        ],
      },
    },

    // 5. ProfilePage
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: "Muhammad Ferdi Alfian — Web Developer Profile",
      mainEntity: { "@id": `${BASE_URL}/#person` },
      dateModified: new Date().toISOString(),
      mentions: [
        { "@type": "DataFeed", url: `${BASE_URL}/api/about` },
        { "@type": "DataFeed", url: `${BASE_URL}/api/projects` },
        { "@type": "DataFeed", url: `${BASE_URL}/api/journey` },
        { "@type": "DataFeed", url: `${BASE_URL}/api/certificates` },
      ],
    },

    // 6. ItemList — Projects
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#projects`,
      name: "Projects by Muhammad Ferdi Alfian",
      description:
        "Selected web development and software engineering projects by Muhammad Ferdi Alfian.",
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
              "High-performance online examination platform with real-time academic integrity detection and a Go-powered backend for sub-millisecond response.",
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
            name: "VALTER 2025 — 1st Place Winner",
            description:
              "Award-winning competition entry for VALTER 2025 at Politeknik Negeri Sriwijaya — a polished, performance-focused web design showcase.",
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
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
