"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import type { LayoutRecommendation } from "@/types";

interface LayoutRecProps {
  layout: LayoutRecommendation;
}

// レイアウト推薦の折りたたみパネル
export function LayoutRec({ layout }: LayoutRecProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">{t.layoutTitle}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4">
          {/* セクション順序 */}
          <div className="flex flex-wrap items-center gap-1.5">
            {layout.sections.map((section, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-medium text-indigo-700">
                  {section}
                </span>
                {i < layout.sections.length - 1 && (
                  <span className="text-gray-400 text-xs">→</span>
                )}
              </span>
            ))}
          </div>
          {/* 理由 */}
          <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-indigo-200 pl-3">
            {layout.reasoning}
          </p>
        </div>
      )}
    </div>
  );
}
