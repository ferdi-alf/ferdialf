import { ApiResponse } from "@/types/api";
import { Journey } from "@/types/journey";
import { NextResponse } from "next/server";

const journeyData: Journey = {
  events: [
    {
      id: "smk",
      year: "2023 - 2026",
      title: "Software Engineering Student",
      subtitle: "SMK Negeri 4 Palembang",
      description:
        "Menempuh pendidikan jurusan Software Engineering. Membangun fondasi kuat dalam pemrograman, pengembangan web, algoritma, dan rekayasa perangkat lunak sejak bangku sekolah.",
      color: "text-blue-400",
    },
    {
      id: "freelance",
      year: "Oct 2023 - Present",
      title: "Freelance Web Developer",
      subtitle: "Independent",
      description:
        "Mengerjakan berbagai proyek web development untuk klien, membangun website dan aplikasi fullstack menggunakan Laravel, Next.js, React TypeScript, serta Golang.",
      color: "text-emerald-400",
    },
    {
      id: "syneps",
      year: "Jul 2025 - Jan 2026",
      title: "Software Engineering Intern",
      subtitle: "Syneps Academy, Palembang",
      description:
        "Internship sebagai software engineer, berkontribusi langsung dalam pengembangan produk dan sistem perangkat lunak bersama tim profesional.",
      color: "text-purple-400",
    },
  ],
};

export async function GET() {
  const response: ApiResponse<Journey> = {
    success: true,
    data: journeyData,
    message: "Journey data fetched successfully",
  };

  return NextResponse.json(response);
}
