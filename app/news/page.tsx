import type { Metadata } from "next";
import { db } from "@/db";
import { news } from "@/db/schema";
import { desc } from "drizzle-orm";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";

export const metadata: Metadata = {
  title: "News",
  description: "最新情報・お知らせの一覧です。",
};

// revalidate: 60 = 60秒ごとに再生成（ISR）
export const revalidate = 60;

export default async function NewsPage() {
  const items = await db
    .select()
    .from(news)
    .orderBy(desc(news.createdAt));

  return (
    <div className="max-w-2xl mx-auto px-6">

      <header className="py-12 pb-8">
        <SectionHeading label="Updates" />
        <h1 className="text-2xl font-semibold tracking-tight">News</h1>
      </header>

      <section className="pb-16" aria-label="ニュース一覧">
        {items.length === 0 ? (
          <p className="text-text-muted text-[13px] text-center py-12">
            まだ投稿がありません
          </p>
        ) : (
          <NewsCard items={items} />
        )}
      </section>

    </div>
  );
}
