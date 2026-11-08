import React from 'react';
import { Camera, Heart, Mail, Phone, MapPin, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStudio }) => {
  return (
    <footer className="bg-[#24211E] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-2xl font-bold text-white">
              <span>📷</span>
              <span className="font-serif tracking-normal">Moments</span>
              <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                مومنتس
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              متجر سعودي متخصص في تخليد ذكرياتكم وصناعة الهدايا التذكارية الفريدة. نحرص على جودة الطباعة اليابانية الأرشيفية والتغليف اليدوي الفاخر لكل طلبية.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-amber-200/90 font-medium">
              <span>🇸🇦 صنع يدوي بكل حب في المملكة</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  كل المنتجات
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStudio}
                  className="hover:text-white transition-colors cursor-pointer text-amber-300 font-semibold"
                >
                  استوديو طباعة الصور
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products-handmade')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  هدايا صُنع بحب
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  كيف تصنعين هديتك؟
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  آراء وتجارب العميلات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الأسئلة الشائعة
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">خدمة العملاء</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>support@moments-gifts.sa</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="text-[11px] text-stone-500 pt-1">
                ساعات العمل: السبت - الخميس من 9 ص حتى 10 م
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Payment methods */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">طرق الدفع الآمنة</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1.5 bg-stone-800 rounded-lg border border-stone-700 text-stone-200 font-bold">
                مدى Mada
              </span>
              <span className="px-2.5 py-1.5 bg-stone-800 rounded-lg border border-stone-700 text-stone-200 font-bold">
                Apple Pay
              </span>
              <span className="px-2.5 py-1.5 bg-stone-800 rounded-lg border border-stone-700 text-stone-200 font-bold">
                Visa / Master
              </span>
              <span className="px-2.5 py-1.5 bg-stone-800 rounded-lg border border-stone-700 text-stone-200 font-bold">
                Tamara تمارا
              </span>
              <span className="px-2.5 py-1.5 bg-stone-800 rounded-lg border border-stone-700 text-stone-200 font-bold">
                Tabby تابي
              </span>
            </div>
            <div className="text-[11px] text-stone-400 leading-relaxed">
              جميع المعاملات المالية محمية بنظام تشفير SSL 256-bit المعتمد من مؤسسة النقد العربي السعودي.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Moments (مومنتس). جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>صُنع بحب وشغف</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
            <span>لتخليد ذكرياتكم السعيدة</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
