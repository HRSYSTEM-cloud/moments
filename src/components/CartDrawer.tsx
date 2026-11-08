import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onOpenShop: () => void;
  appliedCoupon: string | null;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenShop,
  appliedCoupon,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP';
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError('كود الخصم غير صحيح (جربي: MOMENTS10)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-r border-stone-200">
        {/* Header */}
        <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            <h2 className="text-lg font-bold text-stone-900">سلة التسوق</h2>
            <span className="text-xs text-stone-500 font-medium">({items.length} منتجات)</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="p-4 bg-[#F2ECE3] border-b border-stone-200/80">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-800" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold">🎉 مبروك! حصلتِ على شحن مجاني</span>
              ) : (
                <span>
                  أضيفي <strong className="text-amber-900 font-mono tabular-nums">{remainingForFreeShipping.toFixed(0)} ر.س</strong> للشحن المجاني
                </span>
              )}
            </span>
            <span className="font-mono tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-300/80 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mx-auto mb-4 text-2xl">
                🛍️
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1">سلتكِ فارغة حالياً</h3>
              <p className="text-xs text-stone-500 mb-6">
                اختاري من منتجاتنا المميزة وصممي هديتكِ المفضلة
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenShop();
                }}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3 bg-white rounded-xl border border-stone-200 flex gap-3 relative shadow-xs"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100 relative">
                  <img
                    src={item.customPhotoUrl || item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                  {item.customPhotoUrl && (
                    <span className="absolute bottom-0 inset-x-0 bg-stone-900/70 text-white text-[9px] text-center py-0.5">
                      مخصص
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Custom note if present */}
                    {item.customText && (
                      <p className="text-[11px] text-amber-900 font-medium truncate mt-0.5">
                        العبارة: "{item.customText}"
                      </p>
                    )}

                    {item.customShape && (
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        الشكل: {item.customShape === 'circle' ? 'دائري' : 'مربع'} · السطح: {item.customFinish === 'wood' ? 'خشب' : 'مطفي'}
                      </p>
                    )}
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-stone-200 text-stone-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono tabular-nums text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-stone-200 text-stone-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono text-stone-900 tabular-nums">
                      {(item.product.price * item.quantity).toFixed(2)} ر.س
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-3">
            {/* Coupon Code input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3" />
                <input
                  type="text"
                  placeholder="كود الخصم (MOMENTS10)"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponError('');
                  }}
                  className="w-full pr-8 pl-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg uppercase tracking-wider text-stone-800 outline-none focus:border-amber-800"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                تطبيق
              </button>
            </form>

            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

            {appliedCoupon && (
              <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold">
                <span>تم تفعيل الكوبون ({appliedCoupon})</span>
                <button
                  type="button"
                  onClick={onRemoveCoupon}
                  className="text-emerald-700 hover:text-emerald-900 text-[11px] underline cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-mono tabular-nums">{subtotal.toFixed(2)} ر.س</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>الخصم:</span>
                  <span className="font-mono tabular-nums">-{discountAmount.toFixed(2)} ر.س</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>الشحن:</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">مجاني</span>
                  ) : (
                    `${shippingFee.toFixed(2)} ر.س`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                <span>الإجمالي النهائي:</span>
                <span className="font-mono tabular-nums text-amber-900">
                  {grandTotal.toFixed(2)} ر.س
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#2D2A26] hover:bg-stone-950 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>متابعة إتمام الطلب</span>
              <ArrowLeft className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
