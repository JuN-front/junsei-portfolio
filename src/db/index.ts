import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Next.js の開発環境では HMR でモジュールが再読み込みされるため
// グローバルにキャッシュしてコネクションを使い回す
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
