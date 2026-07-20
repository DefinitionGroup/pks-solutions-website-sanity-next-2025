// app/api/draft-mode/enable/route.ts
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).enable();
  return NextResponse.redirect(new URL("/de", request.url));
}
