"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/",        label: "Home"     },
  { href: "/about",   label: "About"    },
  { href: "/projects",label: "Projects" },
  { href: "/resume",  label: "Resume"   },
  { href: "/news",    label: "News"     },
] as const;

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* すりガラス風の背景 */}
      <div
        className="
          absolute inset-0
          bg-bg-primary/80 backdrop-blur-md
          border-b border-border
        "
        aria-hidden
      />

      <nav
        className="relative max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="メインナビゲーション"
      >
        {/* ロゴ / サイト名 */}
        <Link
          href="/"
          className="
            font-mono text-sm tracking-widest uppercase
            text-text-secondary hover:text-text-primary
            transition-colors duration-200
          "
        >
          {/* ← ここを自分の名前に変える */}
          Junsei Fukushima's Portfolio
        </Link>

        {/* ナビリンク */}
        <ul className="flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            // トップページだけ完全一致、それ以外はprefix一致
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative px-4 py-2 text-sm rounded-md
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-subtle"
                    }
                  `}
                >
                  {label}

                  {/* アクティブ時のアンダーライン + グロー */}
                  {isActive && (
                    <span
                      className="
                        absolute bottom-0 inset-x-4 h-px
                        bg-accent
                        shadow-accent-sm
                      "
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
