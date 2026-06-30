"use client";

import { useState } from "react";

type NewsItem = {
  id:          number;
  date:        string;
  title:       string;
  description: string | null;
  isNew?:      boolean;
};

type Props = {
  items: NewsItem[];
};

export default function NewsAccordion({ items }: Props) {
  // 開いているアイテムの id を保持（複数同時オープン可）
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <ul
      className="
        flex flex-col gap-px
        bg-border rounded-[10px] overflow-hidden
        border border-border
      "
      role="list"
    >
      {items.map((item) => {
        const isOpen     = openIds.has(item.id);
        // 説明がない場合はクリック不要にする
        const hasContent = Boolean(item.description);

        return (
          <li key={item.id} className="bg-bg-card">
            <button
              type="button"
              onClick={() => hasContent && toggle(item.id)}
              disabled={!hasContent}
              aria-expanded={isOpen}
              className={`
                w-full flex items-center gap-4
                px-5 py-[14px] text-left
                transition-colors duration-150
                ${hasContent ? "hover:bg-bg-subtle cursor-pointer" : "cursor-default"}
              `}
            >
              <time className="font-mono text-[11px] text-text-muted whitespace-nowrap min-w-[72px]">
                {item.date}
              </time>

              <span className="text-[13px] text-text-secondary leading-snug flex-1">
                {item.title}
              </span>

              {item.isNew && (
                <span className="text-[10px] text-accent bg-bg-subtle border border-border-subtle rounded px-2 py-0.5 whitespace-nowrap">
                  New
                </span>
              )}

              {/* 開閉矢印（説明がある場合のみ表示） */}
              {hasContent && (
                <span
                  className={`
                    block w-[7px] h-[7px] flex-shrink-0
                    border-r border-b border-text-muted
                    transition-transform duration-200
                    ${isOpen ? "-rotate-[135deg] mt-1" : "rotate-45 -mt-0.5"}
                  `}
                  aria-hidden
                />
              )}
            </button>

            {/* アコーディオン本文 */}
            {hasContent && (
              <div
                className={`
                  grid transition-all duration-200 ease-out
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 pl-[108px] text-[12px] text-text-muted leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
