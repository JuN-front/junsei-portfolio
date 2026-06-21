"use client";

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
        // next/image を使わず素の <img> で試す
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="アバター画像"
          width={72}
          height={72}
          className="rounded-full object-cover w-[72px] h-[72px]"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
