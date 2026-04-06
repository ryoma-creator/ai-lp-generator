import { Lightbulb } from "lucide-react";

// ヒーローセクションコンポーネント
interface HeroSectionProps {
  headline: string;
  headlineReason?: string;
  subheadline: string;
  subheadlineReason?: string;
  cta: string;
}

export function HeroSection({ headline, headlineReason, subheadline, subheadlineReason, cta }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600 text-white px-6 py-20">
      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <div className="flex flex-col items-start gap-5 text-left">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide">
            AI COPY STUDIO
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{headline}</h1>
          {headlineReason && (
            <p className="flex items-start gap-1.5 rounded-lg border border-white/15 bg-black/15 px-3 py-1 text-xs italic text-indigo-100">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-200/90" aria-hidden />
              <span>{headlineReason}</span>
            </p>
          )}
          <p className="max-w-xl text-lg text-indigo-100 sm:text-xl">{subheadline}</p>
          {subheadlineReason && (
            <p className="flex items-start gap-1.5 rounded-lg border border-white/15 bg-black/15 px-3 py-1 text-xs italic text-indigo-100">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-200/90" aria-hidden />
              <span>{subheadlineReason}</span>
            </p>
          )}
          <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-indigo-700 shadow-lg shadow-indigo-950/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-50 sm:text-lg">
            <span>{cta}</span>
            <span aria-hidden>→</span>
          </button>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/15 p-4 backdrop-blur md:ml-auto md:max-w-sm">
          <div className="rounded-xl bg-slate-900/70 p-4 shadow-2xl">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-2 text-sm text-indigo-100/90">
              <p className="rounded bg-white/10 px-2 py-1">Headline: conversion oriented</p>
              <p className="rounded bg-white/10 px-2 py-1">Features: clear value bullets</p>
              <p className="rounded bg-white/10 px-2 py-1">CTA: action-first messaging</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
