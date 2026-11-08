import React from 'react';
import { VALUE_PROPS } from '../data/storeData';

export const ValueProps: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching exact user prompt */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-stone-500 text-sm font-semibold tracking-wider">
            <span>📷 Moments</span>
            <span>·</span>
            <span>لمسات مصنوعة بعناية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            كل ما يلزم لذكرى مميزة
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            كل تفصيلة تُخلّد لحظة تستحق أن تُروى
          </p>
        </div>

        {/* 6 Feature Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUE_PROPS.map((prop, idx) => (
            <div
              key={idx}
              className="group relative p-7 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-700/30 hover:bg-[#F6F2EB] transition-all duration-300 hover:shadow-md flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-white shadow-xs border border-stone-200 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {prop.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2.5">
                {prop.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed grow">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
