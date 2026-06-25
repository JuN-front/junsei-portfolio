import { SessionOptions } from "iron-session";

export type SessionData = {
  isLoggedIn: boolean;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "admin-session",
  cookieOptions: {
    // 本番環境では必ず true にする（HTTP では動かない）
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24時間
  },
};