import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { AudienceSuggestion } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ターゲット層提案APIエンドポイント
export async function POST(req: NextRequest) {
  const { productName, productDescription } = await req.json() as {
    productName: string;
    productDescription: string;
  };

  if (!productName || !productDescription) {
    return NextResponse.json({ error: "入力が不足しています" }, { status: 400 });
  }

  const prompt = `You are a market research expert. Analyze this product and identify 4 distinct target audience segments that would benefit most from it — include both obvious and non-obvious markets.

Product:
Name: ${productName}
Description: ${productDescription}

For each segment provide:
- label: concise name (2-4 words, e.g., "Busy Entrepreneurs")
- description: why they need this product (max 12 words, benefit-focused)

Return ONLY valid JSON:
{
  "suggestions": [
    { "label": "Busy Entrepreneurs", "description": "Need results without hiring a full team" },
    { "label": "...", "description": "..." },
    { "label": "...", "description": "..." },
    { "label": "...", "description": "..." }
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_tokens: 400,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    return NextResponse.json({ error: "提案の取得に失敗しました" }, { status: 500 });
  }

  const { suggestions } = JSON.parse(content) as { suggestions: AudienceSuggestion[] };
  return NextResponse.json({ suggestions });
}
