// 最終CTAセクションコンポーネント
interface CtaSectionProps {
  finalCta: string;
}

export function CtaSection({ finalCta }: CtaSectionProps) {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold">今すぐ始めよう</h2>
        <p className="text-indigo-100">{finalCta}</p>
        <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
}
