"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GeneratorForm } from "@/components/form/GeneratorForm";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { HeadlineVariants } from "@/components/result/HeadlineVariants";
import { SEOPack } from "@/components/result/SEOPack";
import { LayoutRec } from "@/components/result/LayoutRec";
import { HowItWorksModal } from "@/components/layout/HowItWorksModal";
import { useLang } from "@/lib/lang-context";
import { Copy, Check } from "lucide-react";
import type { LPContent } from "@/types";

interface MainPageClientProps {
  isLoggedIn: boolean;
  userId: string | null;
}

// "Copy Full Brief" クリップボード用フォーマット
function formatBrief(lp: LPContent, productName: string, audience: string, tone: string): string {
  const recommended = lp.headlineVariants?.find((v) => v.recommended);
  const alts = lp.headlineVariants?.filter((v) => !v.recommended) ?? [];

  const headlineBlock = recommended
    ? [
        `Headline: ${recommended.text}  ← RECOMMENDED (${recommended.angle})`,
        ...alts.map((v) => `Alt: ${v.text}  (${v.angle})`),
      ].join("\n")
    : `Headline: ${lp.headline}`;

  const features = lp.features.map((f, i) => `${i + 1}. ${f.title} — ${f.description}`).join("\n");
  const steps = lp.steps.map((s, i) => `${i + 1}. ${s.title} — ${s.description}`).join("\n");
  const layout = lp.layout
    ? `${lp.layout.sections.join(" → ")}\nWhy: ${lp.layout.reasoning}`
    : "";
  const seo = lp.seo
    ? [
        `Title: ${lp.seo.metaTitle}`,
        `Description: ${lp.seo.metaDescription}`,
        `OG Title: ${lp.seo.ogTitle}`,
        `OG Description: ${lp.seo.ogDescription}`,
      ].join("\n")
    : "";

  return [
    `# LP Brief: ${productName}`,
    `Audience: ${audience || "General"}  |  Tone: ${tone}`,
    "", "## Recommended Layout", layout,
    "", "## Hero", headlineBlock,
    "", `Subheadline: ${lp.subheadline}`, `CTA: ${lp.cta}`,
    "", "## Features", features,
    "", "## How It Works", steps,
    "", "## Final CTA", lp.finalCta,
    "", "## SEO", seo,
  ].join("\n").trim();
}

// メインページのクライアントコンポーネント
export function MainPageClient({ isLoggedIn, userId }: MainPageClientProps) {
  const [lpContent, setLpContent] = useState<LPContent | null>(null);
  const [productName, setProductName] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [selectedHeadline, setSelectedHeadline] = useState("");
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  const handleGenerated = useCallback(
    async (data: LPContent, name: string, description: string, aud: string, tn: string) => {
      setLpContent(data);
      setProductName(name);
      setAudience(aud);
      setTone(tn);
      const rec = data.headlineVariants?.find((v) => v.recommended);
      setSelectedHeadline(rec?.text ?? data.headline);

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
    await navigator.clipboard.writeText(formatBrief(lpContent, productName, audience, tone));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [lpContent, productName, audience, tone]);

  return (
    <div className="flex flex-col gap-12">
      {/* タイトル */}
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
          {t.pageSubtitle}
        </p>
      </div>

      <HowItWorksModal />

      {/* 入力フォームカード */}
      <div className="rounded-3xl bg-white p-6 shadow-md sm:p-8">
        <GeneratorForm onGenerated={handleGenerated} isLoggedIn={isLoggedIn} />
      </div>

      {/* 生成結果 */}
      {lpContent && (
        <div className="flex flex-col gap-6">
          {lpContent.headlineVariants?.length > 0 && (
            <HeadlineVariants
              variants={lpContent.headlineVariants}
              selected={selectedHeadline}
              onSelect={setSelectedHeadline}
            />
          )}

          <div className="overflow-hidden rounded-3xl shadow-lg">
            {/* ブラウザバー */}
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 text-xs text-slate-300">
              <span className="h-3 w-3 flex-shrink-0 rounded-full bg-red-500" />
              <span className="h-3 w-3 flex-shrink-0 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 flex-shrink-0 rounded-full bg-green-500" />
              <span className="ml-2 flex-1 truncate text-slate-400">{productName}</span>
              <button
                onClick={handleCopy}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                {copied ? (
                  <><Check className="h-3 w-3 text-green-300" /><span className="text-green-300">{t.copied}</span></>
                ) : (
                  <><Copy className="h-3 w-3" /><span>{t.copyFullBrief}</span></>
                )}
              </button>
            </div>

            <HeroSection
              headline={selectedHeadline || lpContent.headline}
              headlineReason={lpContent.headlineReason}
              subheadline={lpContent.subheadline}
              subheadlineReason={lpContent.subheadlineReason}
              cta={lpContent.cta}
            />
            <FeaturesSection features={lpContent.features} />
            <StepsSection steps={lpContent.steps} />
            <CtaSection finalCta={lpContent.finalCta} finalCtaReason={lpContent.finalCtaReason} />
          </div>

          <div className="flex flex-col gap-2">
            {lpContent.layout && <LayoutRec layout={lpContent.layout} />}
            {lpContent.seo && <SEOPack seo={lpContent.seo} />}
          </div>
        </div>
      )}
    </div>
  );
}
