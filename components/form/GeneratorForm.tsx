"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useRateLimit } from "@/hooks/useRateLimit";
import type { LPContent } from "@/types";

interface GeneratorFormProps {
  onGenerated: (data: LPContent, productName: string, productDescription: string) => void;
  isLoggedIn: boolean;
}

// LP生成フォーム
export function GeneratorForm({ onGenerated, isLoggedIn }: GeneratorFormProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { remaining, consume } = useRateLimit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoggedIn) {
      setError("生成するにはログインが必要です。");
      return;
    }

    const { ok, error: limitError } = consume();
    if (!ok) {
      setError(limitError ?? "制限に達しました");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productDescription }),
      });

      if (!res.ok) {
        const data = await res.json() as { error: string };
        throw new Error(data.error);
      }

      const lpContent = await res.json() as LPContent;
      onGenerated(lpContent, productName, productDescription);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "生成に失敗しました";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="プロダクト名"
        placeholder="e.g., SupportAI"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <Textarea
        label="プロダクト説明"
        placeholder="e.g., AI-powered customer support inbox for small teams"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        rows={4}
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {isLoggedIn ? `今日あと ${remaining} 回生成できます` : "ログインして生成する"}
        </p>
        {isLoggedIn ? (
          <Button type="submit" loading={loading} size="lg">
            Generate Landing Page
          </Button>
        ) : (
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Sign in to generate
          </a>
        )}
      </div>
    </form>
  );
}
