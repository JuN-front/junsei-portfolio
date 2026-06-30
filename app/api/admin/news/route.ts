import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { news } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const items = await db.select().from(news).orderBy(desc(news.createdAt));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { date, title, description, isNew } = await req.json();
  if (!date || !title) {
    return NextResponse.json({ error: "date と title は必須です" }, { status: 400 });
  }
  const [item] = await db
    .insert(news)
    .values({ date, title, description: description || null, isNew: isNew ?? false })
    .returning();
  return NextResponse.json(item, { status: 201 });
}