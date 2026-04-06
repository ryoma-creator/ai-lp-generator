"use client";

import type { LucideIcon } from "lucide-react";
import { Briefcase, Crown, Handshake, MessageCircle, Zap } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import type { Tone } from "@/types";

// トーン選択肢（ラベルは英語固定 — 国際的なマーケティング用語）
const TONES: { value: Tone; Icon: LucideIcon }[] = [
  { value: "professional", Icon: Briefcase },
  { value: "casual", Icon: MessageCircle },
  { value: "urgent", Icon: Zap },
  { value: "friendly", Icon: Handshake },
  { value: "luxury", Icon: Crown },
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
      {/* 3列で 3+2 に揃い、md以上で5列1行 — 5番目だけ段違いにならない */}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
        {TONES.map((tone) => {
          const Icon = tone.Icon;
          const selected = value === tone.value;
          return (
            <button
              key={tone.value}
              type="button"
              onClick={() => onChange(tone.value)}
              className={`group flex min-h-[2.75rem] flex-col items-center justify-center gap-0.5 rounded-xl border px-1.5 py-2 text-center text-xs transition-all sm:min-h-0 sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-3 sm:py-1.5 sm:text-sm ${
                selected
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border-gray-300 bg-white text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:h-[1.125rem] sm:w-[1.125rem] ${selected ? "text-white" : "text-indigo-500"}`}
                aria-hidden
              />
              <span className="leading-tight">{TONE_LABELS[tone.value]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
