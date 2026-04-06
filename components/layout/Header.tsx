"use client";

import { Globe, History, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import type { Lang } from "@/lib/i18n";
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
          {/* 言語は1つのセレクトに集約 */}
          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 shrink-0 text-gray-500" aria-hidden />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              aria-label={t.languageAria}
              className="max-w-[5.5rem] cursor-pointer rounded-lg border border-gray-200 bg-white py-1.5 pl-2 pr-7 text-xs font-medium text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:max-w-none sm:pr-8"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
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
