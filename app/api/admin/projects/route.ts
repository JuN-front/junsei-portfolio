import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  const items = await db.select().from(projects).orderBy(asc(projects.order));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { title, desc: description, tags, thumbnail, demo, github } = await req.json();
  if (!title || !description) {
    return NextResponse.json({ error: "title と desc は必須です" }, { status: 400 });
  }
  const [item] = await db
    .insert(projects)
    .values({ title, desc: description, tags: tags ?? "", thumbnail, demo, github })
    .returning();
  return NextResponse.json(item, { status: 201 });
}