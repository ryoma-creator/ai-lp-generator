import { createClient } from "@/lib/supabase/server";
import { MainPageClient } from "@/app/MainPageClient";
import { Sparkles, History } from "lucide-react";
import Link from "next/link";

// メインページ（Server Component）
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-gray-900">AI LP Generator</span>
          </div>
          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/history" className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600">
                  <History className="w-4 h-4" />
                  履歴
                </Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-sm text-gray-500 hover:text-red-600">
                    ログアウト
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            AI Landing Page Generator
          </h1>
          <p className="text-gray-500">
            プロダクト情報を入力 → AIがLP用テキストを即座に生成
          </p>
        </div>

        <MainPageClient isLoggedIn={!!user} userId={user?.id ?? null} />
      </main>
    </div>
  );
}
