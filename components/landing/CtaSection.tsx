"use client";

import { useLang } from "@/lib/lang-context";

interface CtaSectionProps {
  finalCta: string;
  finalCtaReason?: string;
}

// 最終CTAセクションコンポーネント
export function CtaSection({ finalCta, finalCtaReason }: CtaSectionProps) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-16 text-center text-white">
      <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-44 w-44 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.ctaTitle}</h2>
        <p className="max-w-2xl text-indigo-100">{finalCta}</p>
        {finalCtaReason && (
          <p className="rounded-md border border-white/15 bg-black/15 px-3 py-1 text-xs italic text-indigo-100">
            💡 {finalCtaReason}
          </p>
        )}
        <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-indigo-700 shadow-lg shadow-indigo-950/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-50">
          <span>{t.ctaButton}</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
