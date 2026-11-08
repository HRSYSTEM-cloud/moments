import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HowItWorksProps {
  onOpenStudio: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenStudio }) => {
  const steps = [
    {
      step: '01',
      icon: '📤',
      title: 'ارفعي صورتك',
      description: 'اختاري أجمل لحظاتك لتحويلها لهدية مميزة.',
    },
    {
      step: '02',
      icon: '🖨️',
      title: 'نطبعها بعناية',
      description: 'جودة طباعة عالية تحافظ على كل تفصيلة فيها.',
    },
    {
      step: '03',
      icon: '🎁',
      title: 'تصلك جاهزة',
      description: 'تغليف أنيق يليق بذكرياتك الجميلة أينما كنتِ.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-amber-800 text-xs font-bold tracking-wider">
            ✦ خطوات بسيطة
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            كيف تصنعين هديتك؟
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            ثلاث خطوات سهلة تفصلكِ عن تحويل صوركِ المفضلة إلى قطع تذكارية فاخرة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-700/30 transition-all hover:shadow-md flex flex-col items-center text-center group"
            >
              {/* Step counter */}
              <span className="absolute top-4 left-4 text-xs font-mono font-bold text-stone-400 group-hover:text-amber-800 transition-colors">
                {item.step}
              </span>

              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-stone-200 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA banner below steps */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenStudio}
            className="inline-flex items-center gap-2.5 bg-[#2D2A26] hover:bg-stone-950 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>ابدئي الآن واطبعي صورتك</span>
            <ArrowLeft className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
