"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GeneratorForm } from "@/components/form/GeneratorForm";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { useLang } from "@/lib/lang-context";
import { Copy, Check } from "lucide-react";
import type { LPContent } from "@/types";

interface MainPageClientProps {
  isLoggedIn: boolean;
  userId: string | null;
}

// クリップボード用フォーマット生成
function formatForAI(lp: LPContent): string {
  const features = lp.features
    .map((f, i) => `${i + 1}. ${f.title}: ${f.description}`)
    .join("\n");
  const steps = lp.steps
    .map((s, i) => `${i + 1}. ${s.title}: ${s.description}`)
    .join("\n");

  return `Landing Page Copy:

[Hero]
Headline: ${lp.headline}
Subheadline: ${lp.subheadline}
CTA: ${lp.cta}

[Features]
${features}

[How It Works]
${steps}

[Final CTA]
${lp.finalCta}`;
}

// メインページのクライアントコンポーネント
export function MainPageClient({ isLoggedIn, userId }: MainPageClientProps) {
  const [lpContent, setLpContent] = useState<LPContent | null>(null);
  const [productName, setProductName] = useState("");
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  const handleGenerated = useCallback(
    async (data: LPContent, name: string, description: string) => {
      setLpContent(data);
      setProductName(name);

      if (isLoggedIn && userId) {
        const supabase = createClient();
        await supabase.from("generations").insert({
          user_id: userId,
          product_name: name,
          product_description: description,
          generated_content: data,
        });
      }
    },
    [isLoggedIn, userId]
  );

  const handleCopy = useCallback(async () => {
    if (!lpContent) return;
    await navigator.clipboard.writeText(formatForAI(lpContent));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [lpContent]);

  return (
    <div className="flex flex-col gap-10">
      {/* タイトル */}
      <div className="text-center">
        <h1 className="mb-3 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">{t.pageSubtitle}</p>
      </div>

      {/* 入力フォームカード */}
      <div className="rounded-2xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
        <GeneratorForm onGenerated={handleGenerated} isLoggedIn={isLoggedIn} />
      </div>

      {/* 生成結果LP */}
      {lpContent && (
        <div className="overflow-hidden rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-100/60">
          {/* ブラウザバー + Copyボタン */}
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 text-xs text-slate-300">
            <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
            <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
            <span className="ml-2 flex-1 truncate">{productName} — Landing Page Preview</span>
            <button
              onClick={handleCopy}
              className="flex flex-shrink-0 items-center gap-1.5 rounded bg-slate-700 px-3 py-1 text-xs font-medium transition-colors hover:bg-slate-600"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{t.copyForAI}</span>
                </>
              )}
            </button>
          </div>

          <HeroSection
            headline={lpContent.headline}
            headlineReason={lpContent.headlineReason}
            subheadline={lpContent.subheadline}
            subheadlineReason={lpContent.subheadlineReason}
            cta={lpContent.cta}
          />
          <FeaturesSection features={lpContent.features} />
          <StepsSection steps={lpContent.steps} />
          <CtaSection finalCta={lpContent.finalCta} finalCtaReason={lpContent.finalCtaReason} />
        </div>
      )}
    </div>
  );
}
