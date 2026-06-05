// app/api/v1/certificates/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { CERTIFICATES_QUERY } from "@/lib/sanity/queries";
import type { ApiResponse } from "@/types/api";
import type { Certificate, CertificatesApiData } from "@/types/certificate";

export const runtime = "nodejs";

const VALID_CATEGORIES = ["certification", "award", "participation"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

function isValidCategory(val: string | null): val is Category {
  return VALID_CATEGORIES.includes(val as Category);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(
      20,
      Math.max(1, parseInt(searchParams.get("limit") ?? "8")),
    );
    const categoryParam = searchParams.get("category");

    let allCerts: Certificate[] = await sanityClient.fetch(CERTIFICATES_QUERY);

    // Filter opsional berdasarkan category
    if (isValidCategory(categoryParam)) {
      allCerts = allCerts.filter((c) => c.category === categoryParam);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const items = allCerts.slice(start, end);

    const response: ApiResponse<CertificatesApiData> = {
      success: true,
      data: {
        items,
        total: allCerts.length,
        page,
        limit,
        hasMore: end < allCerts.length,
      },
      message: "Certificates fetched successfully",
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("[/api/v1/certificates] Sanity fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch certificates",
      } satisfies ApiResponse<null>,
      { status: 500 },
    );
  }
}
