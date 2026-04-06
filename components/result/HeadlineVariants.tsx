"use client";

import { useLang } from "@/lib/lang-context";
import type { HeadlineVariant } from "@/types";

interface HeadlineVariantsProps {
  variants: HeadlineVariant[];
  selected: string;
  onSelect: (text: string) => void;
}

// ヘッドラインバリアント選択カード
export function HeadlineVariants({ variants, selected, onSelect }: HeadlineVariantsProps) {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {t.headlineVariantsTitle}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {variants.map((v, i) => {
          const isSelected = v.text === selected;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(v.text)}
              className={`group flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100"
                  : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {v.angle}
                </span>
                {v.recommended && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    {t.recommended}
                  </span>
                )}
              </div>
              <p className={`text-sm font-medium leading-snug ${
                isSelected ? "text-indigo-900" : "text-gray-800"
              }`}>
                {v.text}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
