import { createClient } from "@/lib/supabase/server";
import { MainPageClient } from "@/app/MainPageClient";
import { Header } from "@/components/layout/Header";

// メインページ（Server Component）
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-50">
      <Header user={!!user} />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
        <MainPageClient isLoggedIn={!!user} userId={user?.id ?? null} />
      </main>
    </div>
  );
}
