type NewsItem = {
  date: string;   // "2025.06.01" 形式
  title: string;
  isNew?: boolean;
};

type Props = {
  items: NewsItem[];
};

export default function NewsCard({ items }: Props) {
  return (
    /*
     * リスト全体を1枚のパネルとして見せる
     * アイテム間の区切りを background（bg-border）+ gap-px で表現する
     */
    <ul
      className="
        flex flex-col gap-px
        bg-border rounded-[10px] overflow-hidden
        border border-border
      "
      role="list"
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="
            flex items-center gap-4
            bg-bg-card px-5 py-[14px]
            hover:bg-bg-subtle
            transition-colors duration-150
          "
        >
          {/* 日付 */}
          <time
            dateTime={item.date.replace(/\./g, "-")}
            className="font-mono text-[11px] text-text-muted whitespace-nowrap min-w-[72px]"
          >
            {item.date}
          </time>

          {/* タイトル */}
          <span className="text-[13px] text-text-secondary leading-snug flex-1">
            {item.title}
          </span>

          {/* New バッジ（最新1件など任意で付ける） */}
          {item.isNew && (
            <span
              className="
                text-[10px] text-accent
                bg-bg-subtle border border-border-subtle
                rounded px-2 py-0.5
                whitespace-nowrap ml-auto
              "
            >
              New
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
