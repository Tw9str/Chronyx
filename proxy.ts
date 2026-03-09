import { NextRequest, NextResponse } from "next/server";
import { verifyTokenFromRequest } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifyTokenFromRequest(req);

  const isLoginPage = pathname.startsWith("/admin/login");
  const isAdminPage = pathname.startsWith("/admin") && !isLoginPage;

  // Logged-out user trying to access a protected admin page → redirect to login
  if (isAdminPage && !session) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged-in user visiting the login page → redirect to dashboard
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
