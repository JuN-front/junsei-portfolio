import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";

// ========================================================
// ▼ ここを自分の情報に書き換える
// ========================================================
const PROFILE = {
  name:      "Junsei Fukushimaのポートフォリオへようこそ！",
  catchcopy: "見やすく、使いやすく、便利なWebアプリ開発をモットーに",
  skills:    "React / Next.js / TypeScript etc.",
  about:     "個人で様々な種類や規模の課題解決を目指した開発を行っています！",
  github:    "https://github.com/JuN-front",
  instagram: "https://www.instagram.com/junsei1128/",
  email:     "wasefuku.fsci@gmail.com",
};

// ▼ Phase 2 で DB から取得するデータ（今はハードコーディング）
const NEWS_ITEMS = [
  { date: "2025.06.21", title: "人生初のポートフォリオをリリースしました",     isNew: true  },
  { date: "2025.05.10", title: "個人開発プロジェクト「ジョブカン」をリリースしました",    isNew: false },
  { date: "2025.04.01", title: "東京科学大学に入学しました",                 isNew: false },
];
// ========================================================

export default function HomePage() {
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
        {/* 職種ラベル */}

        {/* 名前 */}
        <h1 className="text-5xl font-semibold tracking-[-0.02em] leading-tight">
          {PROFILE.name}
        </h1>

        {/* キャッチコピー + スキル */}
        <p className="text-text-secondary text-[15px] leading-relaxed max-w-md">
          {PROFILE.catchcopy}
          <br />
          <span className="font-mono text-[13px] text-text-muted">
            {PROFILE.skills}
          </span>
        </p>

        {/* SNS / Contact リンク */}
        <div className="flex gap-3 mt-2">
          <SocialButton href={PROFILE.github}  icon={<FaGithub    size={14} />} label="GitHub" />
          <SocialButton href={PROFILE.instagram} icon={<FaInstagram size={14} />} label="Instagram" />
          <SocialButton href={PROFILE.email}   icon={<MdOutlineMail size={15} />} label="Mail"   />
        </div>

        {/* スクロール誘導アニメ */}
        <div
          className="flex flex-col items-center gap-2 mt-6 text-text-muted select-none"
          aria-hidden
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <span
            className="
              block w-[14px] h-[14px] mt-1
              border-r border-b border-text-muted
              rotate-45 animate-bounce
            "
          />
        </div>
      </section>

      <hr className="border-border mx-6" />

      {/* ===================== ABOUT サマリー ===================== */}
      <section
        className="max-w-5xl mx-auto px-6 py-16"
        aria-labelledby="home-about"
      >
        <SectionHeading label="About" href="/about" />
        <p
          id="home-about"
          className="text-text-secondary text-[14px] leading-[1.85] max-w-xl mx-auto text-center"
        >
          {PROFILE.about}
        </p>
      </section>

      <hr className="border-border mx-6" />

      {/* ===================== NEWS サマリー ===================== */}
      <section
        className="max-w-5xl mx-auto px-6 py-16"
        aria-labelledby="home-news"
      >
        <SectionHeading label="News" href="/news" />
        <h2 id="home-news" className="sr-only">最新ニュース</h2>
        <NewsCard items={NEWS_ITEMS} />
      </section>
    </>
  );
}

// ---- 内部コンポーネント: SNS ボタン ----
function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
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
      {icon}
      {label}
    </Link>
  );
}
