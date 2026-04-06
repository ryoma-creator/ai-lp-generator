import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HistoryList } from "@/components/history/HistoryList";
import { Header } from "@/components/layout/Header";
import { HistoryPageHeading } from "@/components/history/HistoryPageHeading";
import type { Generation } from "@/types";

// 生成履歴ページ（Server Component）
export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: generations } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={true} />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <HistoryPageHeading />
        <HistoryList initialItems={(generations ?? []) as Generation[]} />
      </main>
    </div>
  );
}
