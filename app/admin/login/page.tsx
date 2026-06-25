"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "ログインに失敗しました");
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-2">
            Admin
          </p>
          <h1 className="text-xl font-semibold tracking-tight">ログイン</h1>
        </div>

        {/* フォーム */}
        <div
          className="bg-bg-card border border-border rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-mono text-[11px] text-text-muted tracking-wider">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                bg-bg-subtle border border-border-subtle rounded-lg
                px-3 py-2 text-[13px] text-text-primary
                placeholder:text-text-muted
                focus:outline-none focus:border-accent
                transition-colors duration-150
              "
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-mono text-[11px] text-text-muted tracking-wider">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                bg-bg-subtle border border-border-subtle rounded-lg
                px-3 py-2 text-[13px] text-text-primary
                placeholder:text-text-muted
                focus:outline-none focus:border-accent
                transition-colors duration-150
              "
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            className="
              mt-1 w-full py-2 rounded-lg text-[13px] font-medium
              bg-accent hover:bg-accent-dim
              text-white
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors duration-150
            "
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </div>
      </div>
    </div>
  );
}