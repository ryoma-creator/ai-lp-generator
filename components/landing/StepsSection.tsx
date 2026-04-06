"use client";

import { useLang } from "@/lib/lang-context";
import type { Step } from "@/types";

interface StepsSectionProps {
  steps: Step[];
}

// ステップセクションコンポーネント
export function StepsSection({ steps }: StepsSectionProps) {
  const { t } = useLang();

  return (
    <section className="bg-transparent px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.stepsTitle}
        </h2>
        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-bold text-white">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
