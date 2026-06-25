import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { db } from "@/db";
import { news } from "@/db/schema";
import { desc } from "drizzle-orm";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";

export const revalidate = 60;

// ========================================================
// ▼ ここを自分の情報に書き換える
// ========================================================
const PROFILE = {
  name:      "Your Name",
  role:      "Frontend Engineer",
  catchcopy: "「あってよかった」と思えるWebアプリで、日常をちょっと便利に",
  skills:    "React / Next.js / TypeScript",
  about:     "ポートフォリオをご覧いただき、ありがとうございます！福島惇聖です！\nWeb開発を通じて、ユーザーの体験を大切にすることをモットーにしています。主にフロントエンドを担当し、使いやすく見た目にも美しいインターフェースを実装します。常に新しい技術を学び続けながら、チームの課題を解決し、プロダクトの価値を高めることがやりがいです！\nプログラミング以外にも色々とやっているのんきな変人ですが、よろしくお願いします！",
  github:    "https://github.com/JuN-front",
  instagram:   "https://instagram.com/junsei1128",
  email:     "junseifukushima@fuji.waseda.jp",
};
// ========================================================

export default async function HomePage() {
  // 最新3件だけ取得
  const newsItems = await db
    .select()
    .from(news)
    .orderBy(desc(news.createdAt))
    .limit(3);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        className="
          flex flex-col items-center justify-center text-center
          min-h-[calc(100svh-4rem)]
          px-6 gap-6
        "
        aria-label="ヒーローセクション"
      >
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">
          {PROFILE.role}
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.02em] leading-tight">
          {PROFILE.name}
        </h1>
        <p className="text-text-secondary text-[15px] leading-relaxed max-w-md">
          {PROFILE.catchcopy}
          <br />
          <span className="font-mono text-[13px] text-text-muted">{PROFILE.skills}</span>
        </p>
        <div className="flex gap-3 mt-2">
          <SocialButton href={PROFILE.github}  icon={<FaGithub      size={14} />} label="GitHub" />
          <SocialButton href={PROFILE.instagram} icon={<FaInstagram   size={14} />} label="Instagram" />
          <SocialButton href={PROFILE.email}   icon={<MdOutlineMail size={15} />} label="Mail"   />
        </div>
        <div className="flex flex-col items-center gap-2 mt-6 text-text-muted select-none" aria-hidden>
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <span className="block w-[14px] h-[14px] mt-1 border-r border-b border-text-muted rotate-45 animate-bounce" />
        </div>
      </section>

      <hr className="border-border mx-6" />

      {/* ===================== ABOUT サマリー ===================== */}
      <section className="max-w-5xl mx-auto px-6 py-16" aria-labelledby="home-about">
        <SectionHeading label="About" href="/about" />
        <p id="home-about" className="text-text-secondary text-[14px] leading-[1.85] max-w-xl mx-auto text-center">
          {PROFILE.about}
        </p>
      </section>

      <hr className="border-border mx-6" />

      {/* ===================== NEWS サマリー ===================== */}
      <section className="max-w-5xl mx-auto px-6 py-16" aria-labelledby="home-news">
        <SectionHeading label="News" href="/news" />
        <h2 id="home-news" className="sr-only">最新ニュース</h2>
        {newsItems.length === 0 ? (
          <p className="text-text-muted text-[13px] text-center py-8">まだ投稿がありません</p>
        ) : (
          <NewsCard items={newsItems} />
        )}
      </section>
    </>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const isExternal = !href.startsWith("mailto");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="
        flex items-center gap-2
        border border-border-subtle rounded-lg
        px-4 py-2 text-[12px] text-text-secondary
        hover:bg-bg-subtle hover:text-text-primary hover:border-border
        transition-all duration-200
      "
    >
      {icon}{label}
    </Link>
  );
}
