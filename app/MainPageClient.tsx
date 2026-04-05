"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GeneratorForm } from "@/components/form/GeneratorForm";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import type { LPContent } from "@/types";

interface MainPageClientProps {
  isLoggedIn: boolean;
  userId: string | null;
}

// メインページのクライアントコンポーネント
export function MainPageClient({ isLoggedIn, userId }: MainPageClientProps) {
  const [lpContent, setLpContent] = useState<LPContent | null>(null);
  const [productName, setProductName] = useState("");

  const handleGenerated = useCallback(
    async (data: LPContent, name: string, description: string) => {
      setLpContent(data);
      setProductName(name);

      // ログイン済みの場合はSupabaseに保存
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

  return (
    <div className="flex flex-col gap-8">
      {/* 入力フォームカード */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <GeneratorForm onGenerated={handleGenerated} isLoggedIn={isLoggedIn} />
      </div>

      {/* 生成結果LP */}
      {lpContent && (
        <div className="flex flex-col gap-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 truncate">{productName} - Landing Page Preview</span>
          </div>
          <HeroSection
            headline={lpContent.headline}
            subheadline={lpContent.subheadline}
            cta={lpContent.cta}
          />
          <FeaturesSection features={lpContent.features} />
          <StepsSection steps={lpContent.steps} />
          <CtaSection finalCta={lpContent.finalCta} />
        </div>
      )}
    </div>
  );
}
