import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const file = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf-8");
  return new NextResponse(file, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
