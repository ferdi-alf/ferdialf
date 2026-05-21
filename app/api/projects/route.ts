import { ApiResponse } from "@/types/api";
import { Project, ProjectsApiData } from "@/types/project";
import { NextRequest, NextResponse } from "next/server";

const projectsData: Project[] = [
  {
    id: "1",
    title: "Unfold Table",
    description:
      "Headless table component for deeply nested data with on-demand fetching, smart caching, server-side pagination, and collapsible row groups.",
    image: "/images/projects/1.png",
    techStack: ["NextJS", "TypeScript", "Tailwind", "TanStack Query"],
    isOpenSource: true,
  },
  {
    id: "2",
    title: "Dekatku",
    description:
      "Geolocation-powered MSME discovery platform with AI-assisted search and an interactive map for real-time local business exploration.",
    image: "/images/projects/2.png",
    techStack: ["React", "Laravel", "Tailwind", "Leaflet"],
    isOpenSource: true,
  },
  {
    id: "3",
    title: "VALTER 2025",
    description:
      "1st-place competition entry for VALTER 2025 at Politeknik Negeri Sriwijaya — a polished, performance-focused web design showcase.",
    image: "/images/projects/3.png",
    techStack: ["NextJS", "TypeScript", "Tailwind"],
    isOpenSource: true,
  },
  {
    id: "4",
    title: "Learning Management System",
    description:
      "Full-featured LMS covering class management, user roles, exams with cheat detection, badge assignments, and granular score analytics.",
    image: "/images/projects/4.png",
    techStack: ["Laravel", "Alpine.js", "Tailwind"],
    isOpenSource: true,
  },
  {
    id: "5",
    title: "Internship Presence Tracker",
    description:
      "Location-aware intern attendance system with geofenced check-ins and an interactive city map pinpointing each internship site.",
    image: "/images/projects/5.png",
    techStack: ["React", "TypeScript", "Laravel", "MUI", "Tailwind"],
    isOpenSource: true,
  },
  {
    id: "6",
    title: "Decision Making System",
    description:
      "Employee evaluation platform implementing AHP-TOPSIS multi-criteria analysis, integrated with a workshop registration module.",
    image: "/images/projects/6.png",
    techStack: ["React", "Laravel", "MUI"],
    isOpenSource: true,
  },
  {
    id: "7",
    title: "Event Registration Platform",
    description:
      "End-to-end event management system with attendee registration, post-event ratings, and a comment system for continuous feedback.",
    image: "/images/projects/7.png",
    techStack: ["Laravel", "Alpine.js", "Tailwind"],
    isOpenSource: true,
  },
  {
    id: "8",
    title: "Anniversary Gift Web",
    description:
      "A personalized digital anniversary experience featuring themed menus, animated transitions, and an embedded puzzle mini-game.",
    image: "/images/projects/8.png",
    techStack: ["NextJS", "TypeScript", "Tailwind"],
    isOpenSource: true,
  },
  {
    id: "9",
    title: "Smart Online Exams",
    description:
      "High-performance examination platform with real-time academic integrity detection and a Go-powered backend for sub-millisecond response.",
    image: "/images/projects/9.png",
    techStack: ["NextJS", "TypeScript", "Go", "PostgreSQL", "MUI"],
    isOpenSource: true,
  },
  {
    id: "10",
    title: "Simple Cashier Payment",
    description:
      "Streamlined POS application with Midtrans payment gateway integration, built for fast and reliable cashier transactions.",
    image: "/images/projects/10.png",
    techStack: ["NextJS", "TypeScript", "Tailwind"],
    isOpenSource: true,
  },
  {
    id: "11",
    title: "Dyson Landing Page",
    description:
      "Competition landing page for Dyson vacuum products — crafted in pure HTML/CSS/JS to highlight product design and visual storytelling.",
    image: "/images/projects/11.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    isOpenSource: true,
  },
  {
    id: "12",
    title: "RPL Class SMKN 4 PLG",
    description:
      "Dedicated class portal for the RPL department at SMKN 4 Palembang, centralizing schedules, activities, and academic resources.",
    image: "/images/projects/12.png",
    techStack: ["React", "Laravel", "MUI"],
    isOpenSource: true,
  },
  {
    id: "13",
    title: "Palembang UMKM Hub",
    description:
      "City-scoped MSME discovery platform for Palembang, enabling residents to find nearby local businesses via real-time geolocation.",
    image: "/images/projects/13.png",
    techStack: ["React", "Laravel", "Tailwind", "MUI"],
    isOpenSource: true,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(20, parseInt(searchParams.get("limit") ?? "10"));

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = projectsData.slice(start, end);

  const response: ApiResponse<ProjectsApiData> = {
    success: true,
    data: {
      items,
      total: projectsData.length,
      page,
      limit,
      hasMore: end < projectsData.length,
    },
    message: "Projects fetched successfully",
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
