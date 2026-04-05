import type { Step } from "@/types";

interface StepsSectionProps {
  steps: Step[];
}

// ステップセクションコンポーネント
export function StepsSection({ steps }: StepsSectionProps) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          使い方
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
