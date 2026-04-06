"use client";

import type { LucideIcon } from "lucide-react";
import { ClipboardList, PenLine, Target, Zap } from "lucide-react";
import { useLang } from "@/lib/lang-context";

interface StepContent {
  title: string;
  body: string;
  Icon: LucideIcon;
}

// How it works の各ステップ（翻訳対応）
const STEPS: Record<string, StepContent[]> = {
  en: [
    { title: "Describe your product", body: "Enter name + what it does. 1–2 sentences is enough.", Icon: PenLine },
    { title: "Set audience & tone", body: "Pick a tone. Don't know your audience? Let AI suggest it.", Icon: Target },
    { title: "Generate", body: "Get headlines, features, steps, SEO pack, and a layout recommendation.", Icon: Zap },
    { title: "Copy Full Brief", body: "One click - paste directly into Cursor, Framer, v0, or ChatGPT.", Icon: ClipboardList },
  ],
  ja: [
    { title: "プロダクトを入力", body: "名前と概要を1〜2文で入力するだけ。", Icon: PenLine },
    { title: "ターゲット & トーンを設定", body: "トーンを選択。ターゲット層はAIに診断してもらえる。", Icon: Target },
    { title: "生成", body: "ヘッドライン・機能・手順・SEO・レイアウト提案をまとめて生成。", Icon: Zap },
    { title: "ブリーフをコピー", body: "1クリックでCursor・Framer・v0・ChatGPTに貼り付け。", Icon: ClipboardList },
  ],
  it: [
    { title: "Descrivi il prodotto", body: "Inserisci nome e descrizione. 1-2 frasi bastano.", Icon: PenLine },
    { title: "Audience & tono", body: "Scegli un tono. Non conosci il pubblico? L'AI lo suggerisce.", Icon: Target },
    { title: "Genera", body: "Ottieni headline, feature, step, SEO pack e layout consigliato.", Icon: Zap },
    { title: "Copia il Brief", body: "Un clic - incolla in Cursor, Framer, v0 o ChatGPT.", Icon: ClipboardList },
  ],
  es: [
    { title: "Describe tu producto", body: "Ingresa nombre y descripción. 1-2 frases son suficientes.", Icon: PenLine },
    { title: "Audiencia & tono", body: "Elige un tono. ¿No conoces tu audiencia? La IA la sugiere.", Icon: Target },
    { title: "Genera", body: "Obtén titulares, features, pasos, SEO pack y recomendación de layout.", Icon: Zap },
    { title: "Copia el Brief", body: "Un clic - pégalo en Cursor, Framer, v0 o ChatGPT.", Icon: ClipboardList },
  ],
  da: [
    { title: "Beskriv dit produkt", body: "Indtast navn og beskrivelse. 1-2 sætninger er nok.", Icon: PenLine },
    { title: "Målgruppe & tone", body: "Vælg en tone. Kender du ikke målgruppen? AI foreslår den.", Icon: Target },
    { title: "Generer", body: "Få overskrifter, features, trin, SEO pack og layout-anbefaling.", Icon: Zap },
    { title: "Kopier Brief", body: "Et klik - indsæt i Cursor, Framer, v0 eller ChatGPT.", Icon: ClipboardList },
  ],
};

// How it works ガイド
export function HowItWorksModal() {
  const { lang } = useLang();
  const steps = STEPS[lang] ?? STEPS.en;

  return (
    <section className="rounded-3xl border border-indigo-100 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
      <h2 className="text-base font-bold text-gray-900 sm:text-lg">How it works</h2>
      <p className="mt-1 text-sm text-gray-600">3-4 steps. No setup needed.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {steps.map((step, i) => (
          <article key={step.title} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <step.Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-indigo-600">STEP {i + 1}</p>
                <h3 className="mt-0.5 text-sm font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{step.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
