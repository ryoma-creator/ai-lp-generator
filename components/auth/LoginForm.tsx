"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLang } from "@/lib/lang-context";

// ログイン・サインアップフォーム
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage(t.confirmationSent);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
      <div className="flex flex-col items-center gap-2 mb-8">
        <Sparkles className="w-8 h-8 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-900">AI LP Generator</h1>
        <p className="text-sm text-gray-500">{t.loginSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          label={t.emailLabel}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t.passwordLabel}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <Button type="submit" loading={loading} size="lg" className="w-full">
          {isSignUp ? t.createAccount : t.signIn}
        </Button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-indigo-600 hover:underline text-center"
        >
          {isSignUp ? t.haveAccount : t.noAccount}
        </button>
      </form>

      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-indigo-600 block text-center">
        {t.backToHome}
      </Link>
    </div>
  );
}
