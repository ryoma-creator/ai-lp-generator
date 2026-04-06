import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { LPContent, Tone } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// トーンの説明文
const toneDescriptions: Record<Tone, string> = {
  professional: "authoritative and trustworthy, data-driven, formal",
  casual: "conversational and relatable, like talking to a friend",
  urgent: "time-sensitive, emphasize urgency and FOMO, strong action words",
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
    return NextResponse.json({ error: "入力が不足しています" }, { status: 400 });
  }

  const audienceText = targetAudience?.trim()
    ? targetAudience.trim()
    : "general audience — infer from product description";

  const prompt = `You are an expert marketing copywriter and conversion rate specialist. Generate high-converting landing page copy using proven psychological principles (social proof, loss aversion, specificity, benefit-focused messaging).

Product:
Name: ${productName}
Description: ${productDescription}
Target Audience: ${audienceText}
Tone: ${tone} — ${toneDescriptions[tone]}

Rules:
- Focus on BENEFITS over features
- Use specific, concrete language (avoid vague words like "powerful", "easy", "great")
- Apply psychological triggers appropriate for the tone and audience
- For each key copy element, include a 1-sentence explanation of WHY it converts

Return ONLY valid JSON in this exact format:

{
  "headline": "",
  "headlineReason": "Why this headline converts (e.g., 'Uses loss aversion — highlights what users miss without this')",
  "subheadline": "",
  "subheadlineReason": "Why this subheadline converts (1 sentence)",
  "cta": "",
  "features": [
    { "title": "", "description": "", "reason": "Why this resonates with the target audience (1 sentence)" },
    { "title": "", "description": "", "reason": "..." },
    { "title": "", "description": "", "reason": "..." }
  ],
  "steps": [
    { "title": "", "description": "" },
    { "title": "", "description": "" },
    { "title": "", "description": "" }
  ],
  "finalCta": "",
  "finalCtaReason": "Why this final CTA converts (1 sentence)"
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_tokens: 1500,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    return NextResponse.json({ error: "生成に失敗しました" }, { status: 500 });
  }

  const lpContent = JSON.parse(content) as LPContent;
  return NextResponse.json(lpContent);
}
