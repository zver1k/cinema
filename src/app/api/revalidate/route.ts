import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "No secret found." }, { status: 401 });
  }
  const tag = request.nextUrl.searchParams.get("tag");
  if (!tag) return Response.json({ error: "No tag found." }, { status: 400 });
  revalidateTag(tag, "max");
  return Response.json({ status: "success" });
}
