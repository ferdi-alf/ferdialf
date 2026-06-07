// app/api/v1/projects/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { ApiResponse } from "@/types/api";
import type { Project, ProjectsApiData } from "@/types/project";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(
      20,
      Math.max(1, parseInt(searchParams.get("limit") ?? "10")),
    );

    const allProjects: Project[] = await sanityClient.fetch(PROJECTS_QUERY);

    const start = (page - 1) * limit;
    const end = start + limit;
    const items = allProjects.slice(start, end);

    const response: ApiResponse<ProjectsApiData> = {
      success: true,
      data: {
        items,
        total: allProjects.length,
        page,
        limit,
        hasMore: end < allProjects.length,
      },
      message: "Projects fetched successfully",
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[/api/v1/projects] Sanity fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      } satisfies ApiResponse<null>,
      { status: 500 },
    );
  }
}
