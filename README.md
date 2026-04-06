# AI Landing Page Generator

Enter your product name and description → AI diagnoses your target market → generates high-converting landing page copy instantly. Paste directly into Framer, Cursor, or ChatGPT.

## What You Can Do

### Generate LP Copy
1. Enter your **Product Name** and **Description**
2. Optionally enter a **Target Audience** (or let AI suggest one — see below)
3. Pick a **Tone**: Professional / Casual / Urgent / Friendly / Luxury
4. Click **Generate Landing Page**
5. AI generates: Headline, Subheadline, CTA, 3 Features, 3 How-It-Works steps, Final CTA

### AI Target Audience Diagnosis
Not sure who to target? Click **"💡 AIにターゲット層を診断してもらう"** — AI analyzes your product and suggests 4 audience segments with market opportunity descriptions. Click any suggestion to use it.

### Copy for AI
After generating, click **"Copy for AI"** in the preview bar. The copy is formatted for direct paste into:
- **Framer / Webflow** — drop into text blocks
- **Cursor / VS Code** — paste as context for coding an LP
- **ChatGPT / Claude** — use as a starting point for refinement

Copy format:
```
Landing Page Copy:

[Hero]
Headline: ...
Subheadline: ...
CTA: ...

[Features]
1. Title: Description
2. Title: Description
3. Title: Description

[How It Works]
1. Title: Description
...

[Final CTA]
...
```

### Why This Copy Works
Each generated section includes a **💡 explanation** of the psychological principle behind it (loss aversion, social proof, specificity, etc.) — so you understand what makes it convert, not just what it says.

### Generation History
All generations are saved. Visit `/history` to review past outputs, re-view previews, or delete entries.

## Rate Limits

| Limit | Value |
|-------|-------|
| Per day | 10 requests (shared between generate + audience suggest) |
| Per minute | 3 requests |

Limits reset every 24 hours. Tracked in localStorage — no server-side enforcement.

## Tech Stack

| Category | Tech |
|----------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Auth & DB | Supabase |
| AI | OpenAI API (gpt-4o-mini) |

## Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd ai-lp-generator
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Table

Run in Supabase SQL Editor:

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

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Path | Description |
|------|-------------|
| `/` | Main page — form + LP preview |
| `/login` | Sign in / Sign up |
| `/history` | Past generation history |

## Demo URL

https://ai-lp-generator-mu.vercel.app
