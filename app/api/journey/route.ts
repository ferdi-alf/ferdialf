import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { JOURNEY_QUERY } from "@/lib/sanity/queries";
import type { ApiResponse } from "@/types/api";
import type { Journey } from "@/types/journey";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const events = await sanityClient.fetch(JOURNEY_QUERY);

    const data: Journey = { events };
    const etag = `"${Buffer.from(JSON.stringify(data)).length}-journey-v1"`;

    if (request.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304 });
    }

    const response: ApiResponse<Journey> = {
      success: true,
      data,
      message: "Journey data fetched successfully",
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control":
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        ETag: etag,
      },
    });
  } catch (error) {
    console.error("[/api/v1/journey] Sanity fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch journey data",
      } satisfies ApiResponse<null>,
      { status: 500 },
    );
  }
}
