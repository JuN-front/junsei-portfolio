"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ---- 型定義 ----
type NewsItem = { id: number; date: string; title: string; isNew: boolean };
type Project  = { id: number; title: string; desc: string; thumbnail: string | null; tags: string; demo: string | null; github: string | null };

export default function AdminPage() {
  const router  = useRouter();
  const [tab, setTab] = useState<"news" | "projects">("news");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* 管理画面ヘッダー */}
      <header className="border-b border-border px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-[12px] tracking-widest text-accent uppercase">Admin</span>
        <button
          onClick={handleLogout}
          className="text-[12px] text-text-muted hover:text-text-primary transition-colors"
        >
          ログアウト
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* タブ */}
        <div className="flex gap-1 mb-8 border-b border-border">
          {(["news", "projects"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                px-4 py-2 text-[13px] capitalize relative
                transition-colors duration-150
                ${tab === t
                  ? "text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
                }
              `}
            >
              {t}
              {tab === t && (
                <span className="absolute bottom-0 inset-x-4 h-px bg-accent" />
              )}
            </button>
          ))}
        </div>

        {tab === "news"     && <NewsManager />}
        {tab === "projects" && <ProjectsManager />}
      </div>
    </div>
  );
}

// ================================================================
// News 管理
// ================================================================
function NewsManager() {
  const [items,   setItems]   = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [date,    setDate]    = useState("");
  const [title,   setTitle]   = useState("");
  const [isNew,   setIsNew]   = useState(false);
  const [saving,  setSaving]  = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd() {
    if (!date || !title) return;
    setSaving(true);
    await fetch("/api/admin/news", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ date, title, isNew }),
    });
    setDate(""); setTitle(""); setIsNew(false);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("削除しますか？")) return;
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 追加フォーム */}
      <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
        <p className="font-mono text-[11px] tracking-widest text-accent uppercase">新規追加</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="2025.06.01"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input w-32"
          />
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="is-new"
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            className="accent-[#5b5bd6]"
          />
          <label htmlFor="is-new" className="text-[12px] text-text-secondary">New バッジを付ける</label>
        </div>
        <button
          onClick={handleAdd}
          disabled={saving || !date || !title}
          className="btn-primary self-end"
        >
          {saving ? "保存中..." : "追加"}
        </button>
      </div>

      {/* 一覧 */}
      <div className="flex flex-col gap-px bg-border rounded-xl overflow-hidden border border-border">
        {loading ? (
          <div className="bg-bg-card px-5 py-8 text-center text-text-muted text-[13px]">読み込み中...</div>
        ) : items.length === 0 ? (
          <div className="bg-bg-card px-5 py-8 text-center text-text-muted text-[13px]">まだ投稿がありません</div>
        ) : items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-bg-card px-5 py-3">
            <span className="font-mono text-[11px] text-text-muted min-w-[72px]">{item.date}</span>
            <span className="text-[13px] text-text-secondary flex-1">{item.title}</span>
            {item.isNew && (
              <span className="text-[10px] text-accent border border-accent/30 rounded px-2 py-0.5">New</span>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-[11px] text-text-muted hover:text-red-400 transition-colors"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// Projects 管理
// ================================================================
function ProjectsManager() {
  const [items,    setItems]    = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [title,    setTitle]    = useState("");
  const [desc,     setDesc]     = useState("");
  const [tags,     setTags]     = useState("");
  const [demo,     setDemo]     = useState("");
  const [github,   setGithub]   = useState("");
  const [thumbnail,setThumbnail]= useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd() {
    if (!title || !desc) return;
    setSaving(true);
    await fetch("/api/admin/projects", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        title, desc, tags,
        demo:      demo      || null,
        github:    github    || null,
        thumbnail: thumbnail || null,
      }),
    });
    setTitle(""); setDesc(""); setTags(""); setDemo(""); setGithub(""); setThumbnail("");
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("削除しますか？")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 追加フォーム */}
      <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
        <p className="font-mono text-[11px] tracking-widest text-accent uppercase">新規追加</p>
        <input type="text" placeholder="タイトル *" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
        <textarea placeholder="説明 *" value={desc} onChange={(e) => setDesc(e.target.value)} className="input resize-none h-20" />
        <input type="text" placeholder="タグ（カンマ区切り）例: React,TypeScript" value={tags} onChange={(e) => setTags(e.target.value)} className="input" />
        <input type="text" placeholder="サムネイル URL（例: /projects/a.png）" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="input" />
        <input type="text" placeholder="デモ URL" value={demo} onChange={(e) => setDemo(e.target.value)} className="input" />
        <input type="text" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} className="input" />
        <button onClick={handleAdd} disabled={saving || !title || !desc} className="btn-primary self-end">
          {saving ? "保存中..." : "追加"}
        </button>
      </div>

      {/* 一覧 */}
      <div className="flex flex-col gap-2">
        {loading ? (
          <p className="text-center text-text-muted text-[13px] py-8">読み込み中...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-text-muted text-[13px] py-8">まだプロジェクトがありません</p>
        ) : items.map((item) => (
          <div key={item.id} className="flex items-start gap-4 bg-bg-card border border-border rounded-xl px-5 py-4">
            <div className="flex-1">
              <p className="text-[13px] font-medium text-text-primary">{item.title}</p>
              <p className="text-[11px] text-text-muted mt-1">{item.tags}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-[11px] text-text-muted hover:text-red-400 transition-colors mt-0.5">
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}