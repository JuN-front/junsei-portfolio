import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FaGithub } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "制作物・プロジェクト一覧",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const items = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.order));

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="py-12 pb-8">
        <SectionHeading label="Works" />
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      </header>

      {items.length === 0 ? (
        <p className="text-text-muted text-[13px] text-center py-12">
          まだプロジェクトがありません
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16" role="list">
          {items.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---- ProjectCard ----
type Project = {
  id:        number;
  title:     string;
  desc:      string;
  thumbnail: string | null;
  tags:      string;           // "React,Next.js" のカンマ区切り文字列
  demo:      string | null;
  github:    string | null;
};

function ProjectCard({ project }: { project: Project }) {
  const { title, desc, thumbnail, tags, demo, github } = project;
  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <article
      className="
        flex flex-col h-full
        bg-bg-card border border-border rounded-xl overflow-hidden
        hover:border-border-subtle transition-colors duration-200
      "
    >
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] tracking-widest text-border-subtle uppercase">
              no image
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h2 className="text-[15px] font-medium leading-snug">{title}</h2>
        <p className="text-[12px] text-text-secondary leading-relaxed flex-1">{desc}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="使用技術">
          {tagList.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[10px] text-accent bg-bg-subtle border border-border-subtle rounded px-2 py-0.5"
            >
              {tag}
            </li>
          ))}
        </ul>

        {(demo || github) && (
          <div className="flex gap-2 pt-1">
            {demo   && <CardLink href={demo}   icon={<MdOpenInNew size={13} />} label="Demo"   isPrimary />}
            {github && <CardLink href={github} icon={<FaGithub    size={12} />} label="GitHub"            />}
          </div>
        )}
      </div>
    </article>
  );
}

function CardLink({ href, icon, label, isPrimary = false }: {
  href: string; icon: React.ReactNode; label: string; isPrimary?: boolean;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-1.5 text-[11px] rounded-md px-3 py-[5px]
        border transition-colors duration-200
        ${isPrimary
          ? "text-accent border-accent/30 hover:bg-accent/10"
          : "text-text-secondary border-border-subtle hover:bg-bg-subtle hover:text-text-primary"
        }
      `}
    >
      {icon}{label}
    </Link>
  );
}
