import { LoginForm } from "@/components/auth/LoginForm";
import { Sparkles } from "lucide-react";
import Link from "next/link";

// ログインページ
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">AI LP Generator</h1>
          <p className="text-sm text-gray-500">ログインして生成を始めよう</p>
        </div>
        <LoginForm />
      </div>
      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-indigo-600">
        ← ホームに戻る
      </Link>
    </div>
  );
}
