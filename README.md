# AI Landing Page Generator

プロダクト情報を入力するだけで、AIがランディングページ用のコピーを即座に生成するツールです。

## 機能

- AIによるヘッドライン・機能説明・CTAの自動生成
- ユーザー認証（Email/Password）
- 生成履歴の保存と再表示
- レートリミット（1日10回 / 1分3回）

## 使用技術

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript (strict mode) |
| スタイリング | Tailwind CSS v4 |
| アイコン | Lucide React |
| 認証・DB | Supabase |
| AI | OpenAI API (gpt-4o-mini) |

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repo-url>
cd ai-lp-generator
npm install
```

### 2. 環境変数の設定

`.env.local` を作成し、以下を設定:

```env
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabaseのテーブル作成

Supabase SQL Editorで以下を実行:

```sql
create table generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  product_name text not null,
  product_description text not null,
  generated_content jsonb not null,
  created_at timestamp with time zone default now()
);

alter table generations enable row level security;

create policy "Users can view own generations"
  on generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own generations"
  on generations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own generations"
  on generations for delete
  using (auth.uid() = user_id);
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

## デモURL

（後で追加）

## ページ構成

| パス | 説明 |
|------|------|
| `/` | メインページ（入力フォーム + LP表示） |
| `/login` | ログイン・サインアップ |
| `/history` | 生成履歴一覧 |
