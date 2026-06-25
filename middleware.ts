import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // /admin/login は認証不要なのでスキップ
  if (req.nextUrl.pathname === "/admin/login") return res;

  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};