"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ToneSelector } from "@/components/form/ToneSelector";
import { AudienceSuggester } from "@/components/form/AudienceSuggester";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useLang } from "@/lib/lang-context";
import type { LPContent, Tone } from "@/types";

interface GeneratorFormProps {
  onGenerated: (data: LPContent, productName: string, productDescription: string) => void;
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

    if (!isLoggedIn) {
      setError(t.loginRequired);
      return;
    }

    const { ok, error: limitError } = consume();
    if (!ok) {
      setError(limitError ?? t.limitReached);
      return;
    }

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
      onGenerated(lpContent, productName, productDescription);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.productName}
          placeholder={t.productNamePlaceholder}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      <Textarea
        label={t.productDescription}
        placeholder={t.productDescPlaceholder}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        rows={3}
        required
      />

      <div className="flex flex-col gap-2">
        <Textarea
          label={t.targetAudienceOptional}
          placeholder={t.targetAudiencePlaceholder}
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          rows={2}
        />
        <AudienceSuggester
          productName={productName}
          productDescription={productDescription}
          onSelect={setTargetAudience}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-gray-400">
          {isLoggedIn
            ? t.generationsLeft.replace("{n}", String(remaining))
            : t.signInToGenerate}
        </p>
        {isLoggedIn ? (
          <Button type="submit" loading={loading} size="lg">
            {t.generateBtn}
          </Button>
        ) : (
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {t.signInToGenerate}
          </a>
        )}
      </div>
    </form>
  );
}
