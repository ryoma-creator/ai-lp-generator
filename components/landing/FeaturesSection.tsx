"use client";

import { Zap, Shield, Star } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import type { Feature } from "@/types";

interface FeaturesSectionProps {
  features: Feature[];
}

const icons = [Zap, Shield, Star];

// フィーチャーセクションコンポーネント
export function FeaturesSection({ features }: FeaturesSectionProps) {
  const { t } = useLang();

  return (
    <section className="bg-transparent px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="group rounded-2xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-200">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                {feature.reason && (
                  <p className="mt-3 rounded-md border border-amber-100 bg-amber-50 px-2 py-1 text-xs italic text-amber-700">
                    💡 {feature.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
