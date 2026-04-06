import { createClient } from "@/lib/supabase/server";
import { MainPageClient } from "@/app/MainPageClient";
import { Header } from "@/components/layout/Header";

// メインページ（Server Component）
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-transparent">
      <Header user={!!user} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <MainPageClient isLoggedIn={!!user} userId={user?.id ?? null} />
      </main>
    </div>
  );
}
