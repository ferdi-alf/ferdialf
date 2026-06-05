// app/api/v1/about/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { ABOUT_QUERY } from "@/lib/sanity/queries";
import type { ApiResponse } from "@/types/api";
import type { AboutApiData } from "@/types/about";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data: AboutApiData = await sanityClient.fetch(ABOUT_QUERY);

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "About data not found",
        } satisfies ApiResponse<null>,
        { status: 404 },
      );
    }

    const response: ApiResponse<AboutApiData> = {
      success: true,
      data,
      message: "About data fetched successfully",
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("[/api/v1/about] Sanity fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch about data",
      } satisfies ApiResponse<null>,
      { status: 500 },
    );
  }
}
