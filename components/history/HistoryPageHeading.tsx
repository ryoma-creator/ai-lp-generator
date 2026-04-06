"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";

// 履歴ページのヘッディング（翻訳対応）
export function HistoryPageHeading() {
  const { t } = useLang();

  return (
    <div className="flex items-center gap-3 mb-6">
      <Link href="/" className="text-gray-500 hover:text-indigo-600">
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-xl font-bold text-gray-900">{t.historyTitle}</h1>
    </div>
  );
}
