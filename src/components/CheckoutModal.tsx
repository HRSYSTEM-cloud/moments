import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  grandTotal: number;
  onOrderSuccess: () => void;
}

const SAUDI_CITIES = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الظهران',
  'أبها',
  'خميس مشيط',
  'تبوك',
  'الطائف',
  'بريدة',
  'عنيزة',
  'حائل',
  'جازان',
  'نجران',
  'الجبيل',
  'الهفوف (الأحساء)',
  'مدينة أخرى / دول الخليج',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  grandTotal,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(SAUDI_CITIES[0]);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple_pay' | 'tamara' | 'tabby' | 'cod'>('mada');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrder = `MOM-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setStep('success');
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {step === 'form' ? 'إتمام الطلب والدفع الآمن' : 'تم تأكيد طلبكِ بنجاح'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Quick Order Mini-Summary */}
            <div className="p-4 bg-stone-100/70 rounded-2xl border border-stone-200/70 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-500">عدد المنتجات: </span>
                <strong className="text-stone-900">{items.length} قطع</strong>
              </div>
              <div>
                <span className="text-stone-500">المجموع المطلوب: </span>
                <strong className="text-base font-bold text-amber-900 font-mono tabular-nums">
                  {grandTotal.toFixed(2)} ر.س
                </strong>
              </div>
            </div>

            {/* Step 1: Customer Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <span>بيانات المستلم وعنوان التوصيل</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: ريم العتيبي"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    رقم الجوال (واتساب) *
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 text-left outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    المدينة *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:border-amber-800 cursor-pointer"
                  >
                    {SAUDI_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    الحي واسم الشارع *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: حي النرجس، شارع أنس بن مالك"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ملاحظات الطلب أو عبارة إضافية (اختياري)
                </label>
                <input
                  type="text"
                  placeholder="مثال: يرجى وضع كرت إهداء خاص باسم نورة"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:border-amber-800"
                />
              </div>
            </div>

            {/* Step 2: Payment Methods */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <span>وسيلة الدفع المفضلة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <label
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'mada'
                      ? 'border-amber-800 bg-amber-50/60 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'mada'}
                    onChange={() => setPaymentMethod('mada')}
                    className="accent-amber-800"
                  />
                  <span>💳 مدى / البطاقة الائتمانية</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-amber-800 bg-amber-50/60 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'apple_pay'}
                    onChange={() => setPaymentMethod('apple_pay')}
                    className="accent-amber-800"
                  />
                  <span> Apple Pay (دفع سريع)</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'tamara'
                      ? 'border-amber-800 bg-amber-50/60 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'tamara'}
                    onChange={() => setPaymentMethod('tamara')}
                    className="accent-amber-800"
                  />
                  <span>✨ تمارا (قسّميها على 4 دفعات)</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-800 bg-amber-50/60 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-amber-800"
                  />
                  <span>📦 الدفع عند الاستلام</span>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                🔒 دفع مشفر وآمن 100% مع ضمان استرجاع ذهبي
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-[#2D2A26] hover:bg-stone-950 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>جاري تأكيد الطلب...</span>
                ) : (
                  <>
                    <span>تأكيد الطلب الآن</span>
                    <span className="font-mono tabular-nums">({grandTotal.toFixed(2)} ر.س)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Order Confirmation Receipt */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-stone-900">
                شكراً لكِ، تم استلام طلبكِ بنجاح!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                رقم طلبكِ هو <strong className="font-mono text-stone-900 text-base">{orderNumber}</strong>. سنبدأ بتجهيزه وطباعته يدوياً بكل عناية.
              </p>
            </div>

            {/* Summary card */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 max-w-md mx-auto text-right text-xs space-y-2.5">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">اسم العميل:</span>
                <span className="font-bold text-stone-900">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">المدينة والعنوان:</span>
                <span className="font-bold text-stone-900">{city} - {address}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">مدة التوصيل المتوقعة:</span>
                <span className="font-bold text-emerald-700">2 إلى 4 أيام عمل</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>المبلغ الإجمالي:</span>
                <span className="font-mono text-amber-900">{grandTotal.toFixed(2)} ر.س</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#2D2A26] hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              العودة إلى المتجر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
