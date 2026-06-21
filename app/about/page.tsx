import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "About",
  description: "自己紹介・プロフィールページ",
};

// ========================================================
// ▼ ここを自分の情報に書き換える
// ========================================================
const PROFILE = {
  name:     "Your Name",
  nameJa:   "田中 太郎",
  role:     "Frontend Engineer",
  avatar:   "/avatar.jpg",   // public/ に置く画像パス。なければ initials にフォールバック
  initials: "YN",            // 画像が読み込めないときのフォールバック文字
  table: [
    { label: "Birthday",  value: "2000年1月1日" },
    { label: "Location",  value: "東京都" },
    { label: "Education", value: "〇〇大学 〇〇学部（2022年入学）" },
    { label: "Languages", value: "日本語（母国語）/ English（読み書き可）" },
  ],
  career: [
    { year: "2024", org: "〇〇株式会社", role: "フロントエンドエンジニア インターン" },
    { year: "2023", org: "〇〇株式会社", role: "Webデザイナー アルバイト" },
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


