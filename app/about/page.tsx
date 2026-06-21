import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "自己紹介・プロフィールページ",
};

// ========================================================
// ▼ ここを自分の情報に書き換える
// ========================================================
const PROFILE = {
  name:     "Junsei Fukushima",
  nameJa:   "福島 惇聖",
  role:     "Graduate Student / Frontend Engineer",
  avatar:   "/avatar.jpg",   // public/ に置く画像パス。なければ initials にフォールバック
  initials: "JF",            // 画像が読み込めないときのフォールバック文字
  table: [
    { label: "Birthday",  value: "2003年11月28日" },
    { label: "Location",  value: "東京都" },
    { label: "Education", value: "東京科学大学 環境・社会理工学院" },
    { label: "Languages", value: "日本語（母国語）/ 英語" },
  ],
  career: [
    { year: "Now", org: "東京科学大学 環境・社会理工学院 在学中", role: "" },
    { year: "2026.3", org: "早稲田大学基幹理工学部卒業", role: "" },
    { year: "2022.12", org: "Waseda IT Leader Labにジョイン", role: "フロントエンドエンジニア" },
    { year: "2022.4", org: "早稲田大学基幹理工学部入学", role: "" },
    { year: "2022.3", org: "東京都立国際高等学校卒業", role: "" },
  ],
  stance: "仕事への価値観や大切にしていることをここに書きます。ユーザーの体験を第一に考え、コードの読みやすさや保守性を大切にしています。チームで働くことが好きで、積極的にコードレビューやドキュメント整備に取り組みます。",
  interests: ["コーヒー", "登山", "読書", "自転車", "写真"],
};
// ========================================================

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6">

      {/* ---- ページヘッダー: アバター + 名前 ---- */}
      <header className="flex items-center gap-5 py-12">
        <Avatar src={PROFILE.avatar} initials={PROFILE.initials} />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{PROFILE.nameJa}</h1>
          <p className="font-mono text-[12px] tracking-[0.08em] text-text-secondary mt-1">
            {PROFILE.role}
          </p>
        </div>
      </header>

      <hr className="border-border" />

      {/* ---- Profile テーブル ---- */}
      <section className="py-8" aria-labelledby="about-profile">
        <SectionHeading label="Profile" />
        <table className="w-full" id="about-profile">
          <tbody>
            {PROFILE.table.map(({ label, value }) => (
              <tr key={label} className="border-b border-border last:border-0">
                <td className="py-[10px] pr-6 align-top w-28">
                  <span className="font-mono text-[11px] tracking-[0.05em] text-text-muted">
                    {label}
                  </span>
                </td>
                <td className="py-[10px] text-[13px] text-text-secondary leading-relaxed">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <hr className="border-border" />

      {/* ---- Career ---- */}
      <section className="py-8" aria-labelledby="about-career">
        <SectionHeading label="Career" />
        <ol className="flex flex-col" id="about-career">
          {PROFILE.career.map(({ year, org, role }, i) => (
            <li
              key={i}
              className="flex gap-4 py-[14px] border-b border-border last:border-0"
            >
              <time
                className="font-mono text-[11px] text-text-muted whitespace-nowrap pt-0.5 min-w-[40px]"
              >
                {year}
              </time>
              <div>
                <p className="text-[13px] font-medium text-text-primary">{org}</p>
                <p className="text-[12px] text-text-muted mt-0.5">{role}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="border-border" />

      {/* ---- Stance ---- */}
      <section className="py-8" aria-labelledby="about-stance">
        <SectionHeading label="Stance" />
        <p
          id="about-stance"
          className="text-[14px] text-text-secondary leading-[1.85]"
        >
          {PROFILE.stance}
        </p>
      </section>

      <hr className="border-border" />

      {/* ---- Interests ---- */}
      <section className="py-8 pb-16" aria-labelledby="about-interests">
        <SectionHeading label="Interests" />
        <ul className="flex flex-wrap gap-2" id="about-interests">
          {PROFILE.interests.map((item) => (
            <li
              key={item}
              className="
                text-[12px] text-text-secondary
                bg-bg-card border border-border-subtle
                rounded-md px-3 py-[5px]
              "
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}

// ---- 内部コンポーネント: アバター ----
// next/image を使いつつ、画像がない場合はイニシャルを表示
function Avatar({ src, initials }: { src: string; initials: string }) {
  return (
    <div className="relative w-[72px] h-[72px] flex-shrink-0">
      {/* イニシャルフォールバック（画像の下に敷く） */}
      <div
        className="
          absolute inset-0 rounded-full
          bg-bg-subtle border border-border-subtle
          flex items-center justify-center
          font-mono text-[18px] text-text-muted
        "
        aria-hidden
      >
        {initials}
      </div>
      {/* 画像（読み込めなければ透明になりイニシャルが見える） */}
      <Image
        src={src}
        alt="アバター画像"
        width={72}
        height={72}
        className="relative rounded-full object-cover"
        onError={(e) => {
          // 画像エラー時に非表示にしてフォールバックを見せる
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />
    </div>
  );
}
