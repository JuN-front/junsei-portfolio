import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FaGithub } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "制作物・プロジェクト一覧です。",
};

// ========================================================
// ▼ ここを自分のプロジェクト情報に書き換える
//   thumbnail: public/ に置いた画像パス。なければ null でプレースホルダー表示
// ========================================================
const PROJECTS: Project[] = [
  {
    title:     "プロジェクト名 A",
    desc:      "どんなアプリか・何が課題で作ったかを2〜3文で説明します。ユーザーの課題を解決するために作りました。",
    thumbnail: "/projects/project-a.png",  // null にするとプレースホルダー
    tags:      ["Next.js", "TypeScript", "Tailwind CSS"],
    demo:      "https://example.com",
    github:    "https://github.com/your-handle/project-a",
  },
  {
    title:     "プロジェクト名 B",
    desc:      "どんなアプリか・何が課題で作ったかを2〜3文で説明します。",
    thumbnail: "/projects/project-b.png",
    tags:      ["React", "Firebase"],
    demo:      "https://example.com",
    github:    "https://github.com/your-handle/project-b",
  },
  {
    title:     "プロジェクト名 C",
    desc:      "どんなアプリか・何が課題で作ったかを2〜3文で説明します。",
    thumbnail: null,
    tags:      ["Vue.js", "Node.js"],
    demo:      null,
    github:    "https://github.com/your-handle/project-c",
  },
];
// ========================================================

type Project = {
  title:     string;
  desc:      string;
  thumbnail: string | null;
  tags:      string[];
  demo:      string | null;
  github:    string | null;
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* ---- ページヘッダー ---- */}
      <header className="py-12 pb-8">
        <SectionHeading label="Works" />
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      </header>

      {/* ---- カードグリッド ---- */}
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16"
        role="list"
      >
        {PROJECTS.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- ProjectCard ----
function ProjectCard({ project }: { project: Project }) {
  const { title, desc, thumbnail, tags, demo, github } = project;

  return (
    <article
      className="
        flex flex-col h-full
        bg-bg-card border border-border rounded-xl overflow-hidden
        hover:border-border-subtle transition-colors duration-200
      "
    >
      {/* サムネイル */}
      <div className="relative w-full aspect-video bg-bg-subtle">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} のサムネイル`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          /* プレースホルダー */
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] tracking-widest text-border-subtle uppercase">
              no image
            </span>
          </div>
        )}
      </div>

      {/* カード本文 */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* タイトル */}
        <h2 className="text-[15px] font-medium leading-snug">{title}</h2>

        {/* 説明 */}
        <p className="text-[12px] text-text-secondary leading-relaxed flex-1">
          {desc}
        </p>

        {/* 技術タグ */}
        <ul className="flex flex-wrap gap-1.5" aria-label="使用技術">
          {tags.map((tag) => (
            <li
              key={tag}
              className="
                font-mono text-[10px] text-accent
                bg-bg-subtle border border-border-subtle
                rounded px-2 py-0.5
              "
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* リンク */}
        {(demo || github) && (
          <div className="flex gap-2 pt-1">
            {demo && (
              <CardLink href={demo} icon={<MdOpenInNew size={13} />} label="Demo" isPrimary />
            )}
            {github && (
              <CardLink href={github} icon={<FaGithub size={12} />} label="GitHub" />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

// ---- CardLink ----
function CardLink({
  href,
  icon,
  label,
  isPrimary = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isPrimary?: boolean;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-1.5
        text-[11px] rounded-md px-3 py-[5px]
        border transition-colors duration-200
        ${
          isPrimary
            ? "text-accent border-accent/30 hover:bg-accent/10"
            : "text-text-secondary border-border-subtle hover:bg-bg-subtle hover:text-text-primary"
        }
      `}
    >
      {icon}
      {label}
    </Link>
  );
}
