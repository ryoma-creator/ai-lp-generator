import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// サインアウト処理
export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
