@AGENTS.md
@AGENTS.md
# Project Rules

## Stack

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui
- Supabase (認証・データベース)
- OpenAI API（gpt-4o-mini）

## Code Rules

- any 禁止
- コンポーネントは小さく分割する
- 1ファイル100行以内を目指す
- 日本語でコメントを書く

## Design Rules

- モバイルファースト
- レスポンシブ必須（sm, md, lg対応）
- shadcn/ui のコンポーネントを優先して使う
- 色はTailwindのデフォルトカラーを使用

## Git Rules

- 1つの機能が完成したらコミットする
- コミットメッセージは英語で書く
- 例：「ログイン機能を追加」「TODOの削除機能を実装」

## Workflow

- 実装前に必ず計画を作成する
- 計画が承認されてから実装を開始する
- 実装後はビルドが通ることを確認する

## File Structure

src/
├── app/           # ページ
├── components/    # UIコンポーネント
├── hooks/         # カスタムフック
├── lib/           # ユーティリティ
└── types/         # 型定義

## API Usage Rules

### Rate Limiting (IMPORTANT - 金銭的理由)
- AI API calls must be rate limited
- Maximum 10 requests per user per day
- Maximum 3 requests per minute per user
- Show "Limit reached" message when exceeded

### Implementation
- Use localStorage to track user requests
- Store: { count: number, lastReset: timestamp }
- Reset count every 24 hours
- Display remaining requests to user

### Cost Protection
- All AI features must have rate limiting before deployment
- No unlimited API calls allowed
- Demo mode: use dummy responses when possible

最後にREADME.mdを作成してください。
- プロジェクト概要
- 使用技術
- セットアップ方法
- デモURL（後で追加）