"use client";

import { useState } from "react";
import { Trash2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/lib/lang-context";
import type { Generation } from "@/types";

interface HistoryListProps {
  initialItems: Generation[];
}

// 生成履歴リストコンポーネント
export function HistoryList({ initialItems }: HistoryListProps) {
  const [items, setItems] = useState(initialItems);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { t } = useLang();

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("generations").delete().eq("id", id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleting(null);
  };

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">{t.historyEmpty}</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-gray-200 bg-white p-4 flex items-start justify-between gap-4 hover:border-indigo-300 transition-colors"
        >
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{item.product_name}</h3>
            <p className="text-sm text-gray-500 truncate">{item.product_description}</p>
            <p className="text-xs text-gray-400">
              {new Date(item.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-indigo-700 font-medium mt-1 line-clamp-2">
              &ldquo;{item.generated_content.headline}&rdquo;
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={`/?preview=${item.id}`}
              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={deleting === item.id}
              className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
