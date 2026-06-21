"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  initials: string;
};

export default function Avatar({ src, initials }: Props) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-[72px] h-[72px] flex-shrink-0">
      {hasError ? (
        /* 画像エラー時: イニシャルを表示 */
        <div
          className="
            w-full h-full rounded-full
            bg-bg-subtle border border-border-subtle
            flex items-center justify-center
            font-mono text-[18px] text-text-muted
          "
        >
          {initials}
        </div>
      ) : (
        /* 通常時: 画像を表示 */
        <Image
          src={src}
          alt="アバター画像"
          width={72}
          height={72}
          className="rounded-full object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
