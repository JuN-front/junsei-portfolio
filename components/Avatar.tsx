"use client";

import Image from "next/image";

type Props = {
  src: string;
  initials: string;
};

export default function Avatar({ src, initials }: Props) {
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
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />
    </div>
  );
}
