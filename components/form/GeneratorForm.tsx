"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ToneSelector } from "@/components/form/ToneSelector";
import { AudienceSuggester } from "@/components/form/AudienceSuggester";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useLang } from "@/lib/lang-context";
import type { LPContent, Tone } from "@/types";

interface GeneratorFormProps {
  onGenerated: (data: LPContent, name: string, desc: string, audience: string, tone: string) => void;
  isLoggedIn: boolean;
}

// LP生成フォーム
export function GeneratorForm({ onGenerated, isLoggedIn }: GeneratorFormProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { remaining, consume } = useRateLimit();
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isLoggedIn) { setError(t.loginRequired); return; }
    const { ok, error: limitError } = consume();
    if (!ok) { setError(limitError ?? t.limitReached); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productDescription, targetAudience, tone }),
      });
      if (!res.ok) {
        const data = await res.json() as { error: string };
        throw new Error(data.error);
      }
      const lpContent = await res.json() as LPContent;
      onGenerated(lpContent, productName, productDescription, targetAudience, tone);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* 商品名 + トーン */}
      <div className="grid grid-cols-3 gap-3">
        <input
          className="col-span-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          placeholder={t.productNamePlaceholder}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      {/* 説明 */}
      <textarea
        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
        placeholder={t.productDescPlaceholder}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        rows={3}
        required
      />

      {/* ターゲット層 */}
      <div className="flex flex-col gap-2">
        <input
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          placeholder={t.targetAudiencePlaceholder}
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
        />
        <AudienceSuggester
          productName={productName}
          productDescription={productDescription}
          onSelect={setTargetAudience}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* フッター */}
      <div className="flex items-center justify-between pt-1">
        {isLoggedIn && (
          <p className="text-xs text-gray-400">
            {t.generationsLeft.replace("{n}", String(remaining))}
          </p>
        )}
        {isLoggedIn ? (
          <Button type="submit" loading={loading} size="lg" className="ml-auto">
            {t.generateBtn}
          </Button>
        ) : (
          <a
            href="/login"
            className="ml-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {t.signInToGenerate}
          </a>
        )}
      </div>
    </form>
  );
}
