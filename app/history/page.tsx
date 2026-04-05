import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HistoryList } from "@/components/history/HistoryList";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Generation } from "@/types";

// 生成履歴ページ（Server Component）
export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 未ログインはログインページへ
  if (!user) redirect("/login");

  const { data: generations } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-gray-900">AI LP Generator</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-gray-500 hover:text-indigo-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">生成履歴</h1>
        </div>

        <HistoryList initialItems={(generations ?? []) as Generation[]} />
      </main>
    </div>
  );
}
