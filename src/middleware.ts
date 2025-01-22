import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  const privateRoutes = ["/add-project", "/projects"];

  if (privateRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(dashboard)/:path*", "/projects/:path*", "/add-project/:path*"],
};
