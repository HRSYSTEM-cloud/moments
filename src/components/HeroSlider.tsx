import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';

interface HeroSliderProps {
  onShopNow: () => void;
  onOpenStudio: () => void;
}

interface Slide {
  id: number;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  ctaText: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: '📷 صور مغناطيسية تخلّد ذكرياتكم',
    title: 'حوّلي كل لحظة جميلة إلى',
    highlight: 'قطعة ديكور يومية تُسعدك',
    description: 'طباعة فوتوغرافية أرشيفية عالية الدقة على ورق مخملي محمي بطبقة ضد الخدوش، تثبت بقوة على الثلاجة والمكاتب لترافق يومكِ بحب.',
    image: '/images/hero_moments_polaroids.jpg',
    ctaText: 'تسوق الآن',
  },
  {
    id: 2,
    tag: '🎁 هدايا مميزة صنع يدوي بحب',
    title: 'بوكسات فاخرة وتغليف راقٍ',
    highlight: 'يليق بأغلى من تحبين',
    description: 'صناديق كرافت مقواة ومحبوكة بخيوط الخيش وأغصان اللافندر الطبيعية وختم الشمع الملكي، جاهزة للإهداء المباشر دون عناء.',
    image: '/images/product_luxury_box.jpg',
    ctaText: 'استكشفي البوكسات',
  },
  {
    id: 3,
    tag: '🧸 تعليقات ودباديب تلمس القلب',
    title: 'رفقاء ناعمون ورسائل دافئة',
    highlight: 'تترك بصمة في الوجدان',
    description: 'دباديب فائقة النعومة مع بطاقات إهداء شخصية محفورة أو مكتوبة بخط يد أنيق، بالإضافة لتعليقات السيارات الأكريليكية المخصصة.',
    image: '/images/product_teddy_gift.jpg',
    ctaText: 'شاهدي التشكيلة',
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopNow, onOpenStudio }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5] py-8 sm:py-12 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">
          {/* Left Text / Info Column (in RTL, Right text column) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 self-start text-xs font-semibold text-amber-900 bg-[#EFE5D9] px-3.5 py-1.5 rounded-full border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{slide.tag}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-[1.25] tracking-tight">
                {slide.title}{' '}
                <span className="text-[#8B5E3C] block sm:inline mt-1 sm:mt-0 font-serif underline decoration-amber-300 decoration-wavy decoration-2">
                  {slide.highlight}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                {slide.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center gap-3 bg-[#2D2A26] hover:bg-[#1A1817] text-[#FAF8F5] font-semibold text-base px-7 py-3.5 rounded-xl shadow-md transition-all hover:gap-4 active:scale-95 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowLeft className="w-5 h-5 text-amber-300" />
              </button>

              <button
                onClick={onOpenStudio}
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-base px-6 py-3.5 rounded-xl border border-stone-300 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>📸 إطبعي صورتكِ الآن</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-stone-300/60 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <span className="font-bold text-stone-900 block text-sm">🚚 توصيل سريع</span>
                <span>لكل مناطق المملكة والخليج</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 block text-sm">✨ جودة تدوم</span>
                <span>أحبار أصلية مقاومة للبهتان</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 block text-sm">🎁 تغليف فاخر</span>
                <span>جاهز للإهداء بختم شمعي</span>
              </div>
            </div>
          </div>

          {/* Right Image / Showcase Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-2xl bg-stone-900/5 aspect-4/3 sm:aspect-16/10 border-4 border-white">
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Float tag on image */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-stone-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-stone-800">
                  صنع يدوي بحب في المملكة
                </span>
              </div>

              {/* Arrows */}
              <div className="absolute inset-y-0 left-3 flex items-center">
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  aria-label="الشريحة التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  aria-label="الشريحة السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === currentSlide ? 'w-8 bg-[#8B5E3C]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`الانتقال للشريحة ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
