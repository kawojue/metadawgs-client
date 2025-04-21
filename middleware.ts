import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.nextUrl.href);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
