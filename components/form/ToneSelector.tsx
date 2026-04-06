"use client";

import { useLang } from "@/lib/lang-context";
import type { Tone } from "@/types";

const TONES: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "casual",       label: "Casual" },
  { value: "urgent",       label: "Urgent" },
  { value: "friendly",     label: "Friendly" },
  { value: "luxury",       label: "Luxury" },
];

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

// トーン選択（selectドロップダウン）
export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{t.toneLabel}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Tone)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {TONES.map((tone) => (
          <option key={tone.value} value={tone.value}>
            {tone.label}
          </option>
        ))}
      </select>
    </div>
  );
}
