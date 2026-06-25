import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function middleware(req: NextRequest) {
  // /admin/login は認証不要なのでスキップ
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return res;
  } catch {
    // セッション取得に失敗した場合もログインページへ
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};