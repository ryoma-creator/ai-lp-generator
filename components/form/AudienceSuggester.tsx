"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useLang } from "@/lib/lang-context";
import type { AudienceSuggestion } from "@/types";

interface AudienceSuggesterProps {
  productName: string;
  productDescription: string;
  onSelect: (audience: string) => void;
}

// AIによるターゲット層提案コンポーネント
export function AudienceSuggester({ productName, productDescription, onSelect }: AudienceSuggesterProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AudienceSuggestion[]>([]);
  const [error, setError] = useState("");
  const { consume } = useRateLimit();
  const { t } = useLang();

  const handleSuggest = async () => {
    if (!productName || !productDescription) {
      setError(t.suggestError);
      return;
    }
    const { ok, error: limitError } = consume();
    if (!ok) {
      setError(limitError ?? t.limitReached);
      return;
    }

    setLoading(true);
    setError("");
    setSuggestions([]);
    try {
      const res = await fetch("/api/suggest-audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productDescription }),
      });
      const data = await res.json() as { suggestions: AudienceSuggestion[]; error?: string };
      if (!res.ok) throw new Error(data.error);
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.suggestFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button type="button" variant="outline" size="sm" loading={loading} onClick={handleSuggest}>
        {t.suggestAudienceBtn}
      </Button>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {suggestions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-gray-500">{t.clickToSelect}</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(`${s.label} — ${s.description}`)}
                className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-1.5 hover:bg-indigo-100 transition-colors text-left"
              >
                <span className="font-semibold">{s.label}</span>: {s.description}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
