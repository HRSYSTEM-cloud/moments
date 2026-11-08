import React from 'react';
import { TESTIMONIALS } from '../data/storeData';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="text-amber-800 text-xs font-bold tracking-wider">
            ✦ تجارب حقيقية
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            ماذا قالت عميلاتنا؟
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            سعادتكم هي أكبر دافع لنا للاستمرار في تقديم كل ما هو مميز ومصنوع بحب
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Quote from prompt */}
                <p className="text-stone-700 text-sm leading-relaxed mb-6 font-medium">
                  "{t.text}"
                </p>
              </div>

              {/* Author & Verified purchase badge */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{t.author}</h4>
                  <span className="text-[11px] text-stone-500">{t.city}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>شراء مؤكد</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
