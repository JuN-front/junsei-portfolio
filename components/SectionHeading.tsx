import Link from "next/link";

type Props = {
  label: string;        // "About" / "News" など
  href?: string;        // "more →" リンクの遷移先（省略可）
};

export default function SectionHeading({ label, href }: Props) {
  return (
    <div className="flex items-center justify-between mb-7">
      {/* monospace × letter-spacing でアクセントカラーの小見出し */}
      <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
        {label}
      </h2>

      {href && (
        <Link
          href={href}
          className="
            text-[11px] text-text-muted
            border-b border-border-subtle pb-px
            hover:text-text-secondary hover:border-border
            transition-colors duration-200
          "
        >
          more →
        </Link>
      )}
    </div>
  );
}
