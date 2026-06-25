import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Resume",
  description: "職歴・スキル・資格",
};

// ========================================================
// ▼ ここを自分の情報に書き換える
// ========================================================

// 職歴・インターン（新しい順）
const EXPERIENCE: TimelineItem[] = [
  {
    period: "2025.04 — 2026.06",
    org:    "株式会社Skillnote",
    role:   "マーケティングインターン",
    desc:   "主にデータの集計・分析・加工による施策提案の補佐を担当。\n1年間勤務をし、HubspotやWordPressなどのローコードツールの使用や分析も経験し、開発に役立つ知識をデータの観点から実践で学びました",
  },
  {
    period: "2022.12 — 現在",
    org:    "Waseda IT Leader Lab (WILL)",
    role:   "フロントエンド",
    desc:   "フロントエンドを学習し、修了後はレビュアーを担当。\nその後、SNSチームを経験した後、WILLの公式HPプロジェクトを担当し、開発にも携わりました。\n現在は、WILLの親サークルであるPlayGroundの公式HPの改装プロジェクトを立ち上げ、リーダーとして着手しております",
  },
];

// スキル（グループ分けして列挙）
const SKILLS: SkillGroup[] = [
  {
    label: "Frontend",
    tags:  ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    label: "Backend",
    tags:  ["Node.js", "PostgreSQL"],
  },
  {
    label: "Tools",
    tags:  ["Git/GitHub", "Figma", "Vercel", "Stitch"],
  },
];

// 資格・受賞歴（新しい順）
const CERTIFICATIONS: CertItem[] = [
  { year: "2026.6", name: "基本情報技術者試験" },
  { year: "2026.4", name: "中国語検定準4級" },
  { year: "2025.5", name: "TOEIC 920点" },
  { year: "2021.9", name: "英検1級" },
];
// ========================================================

type TimelineItem = {
  period: string;
  org:    string;
  role:   string;
  desc?:  string;   // 任意：業務内容の補足
};

type SkillGroup = {
  label: string;
  tags:  string[];
};

type CertItem = {
  year: string;
  name: string;
};

export default function ResumePage() {
  return (
    <div className="max-w-2xl mx-auto px-6">

      {/* ---- ページヘッダー ---- */}
      <header className="py-12 pb-8">
        <SectionHeading label="Career" />
        <h1 className="text-2xl font-semibold tracking-tight">Resume</h1>
      </header>

      <hr className="border-border" />

      {/* ---- Experience（タイムライン） ---- */}
      <section className="py-8" aria-labelledby="resume-experience">
        <h2 id="resume-experience" className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-5">
          Experience
        </h2>
        <ol className="relative flex flex-col">
          {EXPERIENCE.map((item, i) => (
            <li key={i} className="flex gap-4 pb-7 last:pb-0">
              {/* 左: ドット + 縦線 */}
              <div className="flex flex-col items-center w-10 flex-shrink-0">
                {/* ドット */}
                <span
                  className="
                    w-2 h-2 mt-[5px] rounded-full flex-shrink-0
                    bg-accent ring-2 ring-bg-primary ring-offset-0
                    shadow-accent-sm
                  "
                  aria-hidden
                />
                {/* 縦線（最後のアイテムには出さない） */}
                {i < EXPERIENCE.length - 1 && (
                  <span className="flex-1 w-px bg-border mt-1" aria-hidden />
                )}
              </div>

              {/* 右: テキスト */}
              <div className="flex-1 pb-0">
                <p className="font-mono text-[11px] text-text-muted mb-1">
                  {item.period}
                </p>
                <p className="text-[14px] font-medium text-text-primary">
                  {item.org}
                </p>
                <p className="text-[12px] text-text-secondary mt-0.5">
                  {item.role}
                </p>
                {item.desc && (
                  <p className="text-[12px] text-text-muted mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="border-border" />

      {/* ---- Skills ---- */}
      <section className="py-8" aria-labelledby="resume-skills">
        <h2 id="resume-skills" className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-5">
          Skills
        </h2>
        <div className="flex flex-col gap-5">
          {SKILLS.map(({ label, tags }) => (
            <div key={label}>
              <p className="font-mono text-[11px] text-text-muted tracking-[0.05em] mb-2">
                {label}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label={`${label}のスキル`}>
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="
                      text-[11px] text-text-secondary
                      bg-bg-card border border-border-subtle
                      rounded-md px-3 py-1
                    "
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* ---- Certifications ---- */}
      <section className="py-8 pb-16" aria-labelledby="resume-certs">
        <h2 id="resume-certs" className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-5">
          Certifications
        </h2>
        <ul
          className="flex flex-col gap-px bg-border rounded-xl overflow-hidden border border-border"
          role="list"
        >
          {CERTIFICATIONS.map(({ year, name }) => (
            <li
              key={name}
              className="flex items-center gap-4 bg-bg-card px-5 py-3"
            >
              <time className="font-mono text-[11px] text-text-muted min-w-[36px]">
                {year}
              </time>
              <span className="text-[13px] text-text-secondary">{name}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
