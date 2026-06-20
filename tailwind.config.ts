import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode は 'class' にしておき、layout.tsx の <html> に class="dark" を固定する
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ベースカラー
        bg: {
          primary: "#0a0a0f",   // メイン背景
          card:    "#111118",   // カード・セクション背景
          subtle:  "#1a1a28",   // ホバー・ハイライト用
        },
        // テキスト
        text: {
          primary:   "#e8e8ee", // 本文
          secondary: "#a0a0b8", // サブテキスト・ラベル
          muted:     "#5a5a72", // 最も薄いテキスト
        },
        // アクセント（インディゴ系）
        accent: {
          DEFAULT: "#5b5bd6",
          dim:     "#3d3da8",
          glow:    "#5b5bd640", // 発光エフェクト用（透明度込み）
        },
        // ボーダー
        border: {
          DEFAULT: "#1e1e2e",
          subtle:  "#2a2a3e",
        },
      },
      fontFamily: {
        // Next.js が Geist を CSS 変数として注入する
        sans:  ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      // ナビゲーションのグロー・アニメーション用
      boxShadow: {
        "accent-sm": "0 0 12px 0 #5b5bd640",
        "accent":    "0 0 24px 0 #5b5bd650",
      },
      // スムーズなトランジション
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
