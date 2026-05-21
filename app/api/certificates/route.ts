import { ApiResponse } from "@/types/api";
import { Certificate, CertificatesApiData } from "@/types/certificate";
import { NextRequest, NextResponse } from "next/server";

const certificatesData: Certificate[] = [
  {
    id: "1",
    title: "Software Engineer Certification",
    issuer: "HackerRank",
    credentialId: "F42333D4C421",
    image: "/images/certificates/1.png",
    redirectUrl: null,
    category: "certification",
  },
  {
    id: "2",
    title: "1st Place — Web Design & Development Competition",
    issuer: "Politeknik Negeri Sriwijaya",
    credentialId: "13356/PL6.3.3/LL/2025",
    image: "/images/certificates/2.png",
    redirectUrl: null,
    category: "award",
  },
  {
    id: "3",
    title: "1st Runner-Up — Digital Technology Innovation, South Sumatra",
    issuer: "Dinas Pendidikan Sumatera Selatan",
    credentialId: "420/15830/SMK.2/Disdik.SS/2024",
    image: "/images/certificates/3.png",
    redirectUrl: null,
    category: "award",
  },
  {
    id: "4",
    title: "AWS Educate: Introduction to Cloud 101",
    issuer: "Amazon Web Services",
    credentialId: null,
    image: "/images/certificates/4.png",
    redirectUrl: null,
    category: "certification",
  },
  {
    id: "5",
    title: "Penetration Testing — MPP Metro, Lampung",
    issuer: "Government of Metro City",
    credentialId: null,
    image: "/images/certificates/5.png",
    redirectUrl: null,
    category: "certification",
  },
  {
    id: "6",
    title: "SOLID Programming Principles",
    issuer: "Dicoding",
    credentialId: "L4PQ2WNG2ZO1",
    image: "/images/certificates/6.png",
    redirectUrl: null,
    category: "certification",
  },
  {
    id: "7",
    title: "Game Developer Palembang — Participation",
    issuer: "Game Developer Palembang",
    credentialId: null,
    image: "/images/certificates/7.png",
    redirectUrl: null,
    category: "participation",
  },
  {
    id: "8",
    title: "Full Stack Developer with Bun, Hono & React TypeScript",
    issuer: "Santricoding",
    credentialId: "SK-V8UTAW8JDW7RYRG",
    image: "/images/certificates/8.png",
    redirectUrl: null,
    category: "certification",
  },
  {
    id: "9",
    title: "Software Engineering Internship",
    issuer: "Syneps Academy",
    credentialId: "007/R1/SERTIF/INTERN/2026",
    image: "/images/certificates/9.png",
    redirectUrl: null,
    category: "certification",
  },
  {
    id: "10",
    title: "Web Development Competition — Participation",
    issuer: "Politeknik Negeri Sriwijaya",
    credentialId: "11641/PL6.3.3.1/LL/2023",
    image: "/images/certificates/10.png",
    redirectUrl: null,
    category: "participation",
  },
  {
    id: "11",
    title: "Top 20 National Finalists — Madani Entrepreneur Academy",
    issuer: "PNM (Permodalan Nasional Madani)",
    credentialId: "MEA-381/PNM-JMT/X/2024",
    image: "/images/certificates/11.png",
    redirectUrl: null,
    category: "award",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(20, parseInt(searchParams.get("limit") ?? "8"));

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = certificatesData.slice(start, end);

  const response: ApiResponse<CertificatesApiData> = {
    success: true,
    data: {
      items,
      total: certificatesData.length,
      page,
      limit,
      hasMore: end < certificatesData.length,
    },
    message: "Certificates fetched successfully",
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
