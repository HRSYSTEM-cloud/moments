import React from 'react';
import { STATS } from '../data/storeData';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#2D2A26] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-amber-300 text-xs font-semibold tracking-wider flex items-center justify-center gap-2">
            <span>📷 Moments</span>
            <span>·</span>
            <span>ثقة وإتقان</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FAF8F5]">
            MOMENTS بالأرقام
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            فخورون بأننا جزء من أسعد لحظاتكم وذكرياتكم الثمينة
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-stone-800/60 border border-stone-700/60 text-center flex flex-col items-center justify-center hover:border-amber-400/40 transition-colors"
            >
              <span className="text-3xl sm:text-4xl mb-3">{stat.icon}</span>
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-300 tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base text-stone-300 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
