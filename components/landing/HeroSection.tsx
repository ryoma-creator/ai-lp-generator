// ヒーローセクションコンポーネント
interface HeroSectionProps {
  headline: string;
  subheadline: string;
  cta: string;
}

export function HeroSection({ headline, subheadline, cta }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{headline}</h1>
        <p className="text-lg sm:text-xl text-indigo-100 max-w-xl">{subheadline}</p>
        <button className="mt-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors text-base sm:text-lg">
          {cta}
        </button>
      </div>
    </section>
  );
}
