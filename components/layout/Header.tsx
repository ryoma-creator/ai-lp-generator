"use client";

import { Sparkles, History } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { LANGUAGES } from "@/lib/i18n";

interface HeaderProps {
  user: boolean;
}

// 共通ヘッダー（言語切替付き）
export function Header({ user }: HeaderProps) {
  const { lang, setLang, t } = useLang();

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/75 px-4 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-sm font-bold text-transparent sm:text-base">
            AI LP Generator
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          {/* 言語切替ボタン */}
          <div className="flex items-center gap-0.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                  lang === l.code
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {user ? (
            <>
              <Link
                href="/history"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">{t.history}</span>
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  {t.logout}
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              {t.login}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
