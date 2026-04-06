"use client";

import { useLang } from "@/lib/lang-context";
import type { Tone } from "@/types";

// トーン選択肢（ラベルは英語固定 — 国際的なマーケティング用語）
const TONES: { value: Tone; emoji: string }[] = [
  { value: "professional", emoji: "💼" },
  { value: "casual", emoji: "😊" },
  { value: "urgent", emoji: "⚡" },
  { value: "friendly", emoji: "🤝" },
  { value: "luxury", emoji: "✨" },
];

// トーン表示名（先頭大文字）
const TONE_LABELS: Record<Tone, string> = {
  professional: "Professional",
  casual: "Casual",
  urgent: "Urgent",
  friendly: "Friendly",
  luxury: "Luxury",
};

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

// トーン選択コンポーネント
export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{t.toneLabel}</label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onChange(tone.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              value === tone.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            <span>{tone.emoji}</span>
            <span>{TONE_LABELS[tone.value]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
