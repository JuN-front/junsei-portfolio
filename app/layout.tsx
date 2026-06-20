import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "福島惇聖のポートフォリオ",
    template: "%s | 福島惇聖",
  },
  description: "福島惇聖のポートフォリオへようこそ！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // class="dark" を固定してダークテーマを強制する
    <html lang="ja" className="dark">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          font-sans antialiased
          bg-bg-primary text-text-primary
          min-h-screen
        `}
      >
        <NavBar />
        {/* ナビバーの高さ分だけ上部に余白を確保 */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
