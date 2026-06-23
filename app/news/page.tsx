import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";

export const metadata: Metadata = {
  title: "News",
  description: "最新情報・お知らせの一覧です。",
};

// ========================================================
// ▼ ここを自分の情報に書き換える（新しい順に追加していく）
//   Phase 2 で DB から取得するデータに差し替える予定
// ========================================================
const NEWS_ITEMS = [
  { date: "2025.06.01", title: "〇〇株式会社のインターンシップに参加しました",     isNew: true  },
  { date: "2025.04.15", title: "個人開発プロジェクト「〇〇」をリリースしました",    isNew: false },
  { date: "2025.02.10", title: "〇〇大学の〇〇学部に入学しました",                 isNew: false },
  { date: "2024.12.01", title: "基本情報技術者試験に合格しました",                  isNew: false },
  { date: "2024.09.20", title: "〇〇ハッカソンに参加し、〇〇賞を受賞しました",      isNew: false },
];
// ========================================================

export default function NewsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6">

      {/* ---- ページヘッダー ---- */}
      <header className="py-12 pb-8">
        <SectionHeading label="Updates" />
        <h1 className="text-2xl font-semibold tracking-tight">News</h1>
      </header>

      {/* ---- ニュース一覧 ---- */}
      <section className="pb-16" aria-label="ニュース一覧">
        <NewsCard items={NEWS_ITEMS} />
      </section>

    </div>
  );
}