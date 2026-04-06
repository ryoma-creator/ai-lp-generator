import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { LPContent, Tone } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const toneDescriptions: Record<Tone, string> = {
  professional: "authoritative and trustworthy, data-driven, formal",
  casual: "conversational and relatable, like talking to a friend",
  urgent: "time-sensitive, strong action words, emphasize FOMO",
  friendly: "warm, encouraging, and supportive",
  luxury: "premium and exclusive, sophisticated, aspirational",
};

// LP生成APIエンドポイント
export async function POST(req: NextRequest) {
  const { productName, productDescription, targetAudience, tone = "professional" } =
    await req.json() as {
      productName: string;
      productDescription: string;
      targetAudience?: string;
      tone?: Tone;
    };

  if (!productName || !productDescription) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const audienceText = targetAudience?.trim() || "infer from product description";

  const prompt = `You are an expert conversion copywriter. Generate a complete, build-ready landing page brief.

Product: ${productName}
Description: ${productDescription}
Target Audience: ${audienceText}
Tone: ${tone} — ${toneDescriptions[tone]}

Rules:
- Benefits over features. Specific over vague. No filler words.
- Headline variants must each use a DISTINCT psychological angle.
- SEO fields must be within character limits (title ≤60, description ≤155).
- Layout sections array uses these names only: "Hero", "Social Proof", "Features", "How It Works", "FAQ", "Pricing", "CTA"

Return ONLY valid JSON:

{
  "headline": "[recommended headline]",
  "headlineReason": "[why this angle converts — 1 sentence]",
  "headlineVariants": [
    { "text": "...", "angle": "Loss Aversion", "reason": "...", "recommended": true },
    { "text": "...", "angle": "Benefit-First", "reason": "...", "recommended": false },
    { "text": "...", "angle": "Curiosity", "reason": "...", "recommended": false }
  ],
  "subheadline": "...",
  "subheadlineReason": "...",
  "cta": "...",
  "features": [
    { "title": "...", "description": "...", "reason": "..." },
    { "title": "...", "description": "...", "reason": "..." },
    { "title": "...", "description": "...", "reason": "..." }
  ],
  "steps": [
    { "title": "...", "description": "..." },
    { "title": "...", "description": "..." },
    { "title": "...", "description": "..." }
  ],
  "finalCta": "...",
  "finalCtaReason": "...",
  "seo": {
    "metaTitle": "... (≤60 chars)",
    "metaDescription": "... (≤155 chars)",
    "ogTitle": "...",
    "ogDescription": "..."
  },
  "layout": {
    "sections": ["Hero", "Features", "How It Works", "CTA"],
    "reasoning": "... (1-2 sentences explaining why this order for this audience)"
  }
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_tokens: 2000,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }

  const lpContent = JSON.parse(content) as LPContent;
  return NextResponse.json(lpContent);
}
