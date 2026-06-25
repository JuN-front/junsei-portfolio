import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 環境変数と照合
  if (
    email    !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: "メールアドレスまたはパスワードが違います" },
      { status: 401 }
    );
  }

  // セッションにログイン状態を保存
  const res = NextResponse.json({ ok: true });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  session.isLoggedIn = true;
  await session.save();

  return res;
}