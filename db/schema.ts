import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

// ---- news テーブル ----
export const news = pgTable("news", {
  id:          serial("id").primaryKey(),
  date:        text("date").notNull(),       // "2025.06.01" 形式
  title:       text("title").notNull(),
  description: text("description"),          // 数行の説明（任意）
  isNew:       boolean("is_new").notNull().default(false),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
});

// ---- projects テーブル ----
export const projects = pgTable("projects", {
  id:        serial("id").primaryKey(),
  title:     text("title").notNull(),
  desc:      text("desc").notNull(),
  thumbnail: text("thumbnail"),            // null = プレースホルダー
  tags:      text("tags").notNull(),       // "React,Next.js,TypeScript" のようにカンマ区切りで保存
  demo:      text("demo"),                 // null = リンクなし
  github:    text("github"),              // null = リンクなし
  order:     serial("order"),             // 表示順
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// 型のエクスポート（各ページで使う）
export type News    = typeof news.$inferSelect;
export type Project = typeof projects.$inferSelect;