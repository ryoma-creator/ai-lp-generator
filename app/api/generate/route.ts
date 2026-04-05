import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { LPContent } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// LP生成APIエンドポイント
export async function POST(req: NextRequest) {
  const { productName, productDescription } = await req.json() as {
    productName: string;
    productDescription: string;
  };

  if (!productName || !productDescription) {
    return NextResponse.json({ error: "入力が不足しています" }, { status: 400 });
  }

  const prompt = `You are a professional copywriter. Generate compelling landing page copy for the following product.

Product:
Name: ${productName}
Description: ${productDescription}

Return ONLY valid JSON in this exact format:

{
  "headline": "",
  "subheadline": "",
  "cta": "",
  "features": [
    { "title": "", "description": "" },
    { "title": "", "description": "" },
    { "title": "", "description": "" }
  ],
  "steps": [
    { "title": "", "description": "" },
    { "title": "", "description": "" },
    { "title": "", "description": "" }
  ],
  "finalCta": ""
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_tokens: 1000,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    return NextResponse.json({ error: "生成に失敗しました" }, { status: 500 });
  }

  const lpContent = JSON.parse(content) as LPContent;
  return NextResponse.json(lpContent);
}
