"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import type { SEOPack as SEOPackType } from "@/types";

interface SEOPackProps {
  seo: SEOPackType;
}

// SEOフィールドの表示行
function SEORow({ label, value, limit }: { label: string; value: string; limit?: number }) {
  const over = limit ? value.length > limit : false;
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        {limit && (
          <span className={`text-xs ${over ? "text-red-500" : "text-gray-400"}`}>
            {value.length}/{limit}
          </span>
        )}
      </div>
      <p className="rounded-lg bg-gray-50 px-3 py-2 font-mono text-sm text-gray-800 leading-relaxed">
        {value}
      </p>
    </div>
  );
}

// SEOパックの折りたたみパネル
export function SEOPack({ seo }: SEOPackProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">{t.seoPackTitle}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4">
          <SEORow label="Title" value={seo.metaTitle} limit={60} />
          <SEORow label="Description" value={seo.metaDescription} limit={155} />
          <SEORow label="OG Title" value={seo.ogTitle} />
          <SEORow label="OG Description" value={seo.ogDescription} />
        </div>
      )}
    </div>
  );
}
