import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Check, ShoppingBag, RotateCcw, ZoomIn } from 'lucide-react';
import { SAMPLE_PRESET_PHOTOS, PRODUCTS } from '../data/storeData';
import { Product } from '../types';

interface CustomPhotoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    customPhotoUrl: string,
    customText: string,
    shape: 'square' | 'circle' | 'polaroid' | 'rectangle',
    finish: 'matte' | 'glossy' | 'wood'
  ) => void;
}

export const CustomPhotoStudioModal: React.FC<CustomPhotoStudioModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(SAMPLE_PRESET_PHOTOS[0].url);
  const [customText, setCustomText] = useState<string>('لحظات لا تُنسى 🤍 2024');
  const [shape, setShape] = useState<'square' | 'circle' | 'polaroid' | 'rectangle'>('square');
  const [finish, setFinish] = useState<'matte' | 'glossy' | 'wood'>('matte');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedPhoto(url);
    }
  };

  const getTargetProduct = (): Product => {
    if (shape === 'circle') {
      return PRODUCTS.find((p) => p.id === 'prod-round-magnet-50') || PRODUCTS[1];
    }
    return PRODUCTS.find((p) => p.id === 'prod-square-magnet-150') || PRODUCTS[0];
  };

  const currentProduct = getTargetProduct();

  const handleSaveAndAdd = () => {
    onAddToCart(currentProduct, selectedPhoto, customText, shape, finish);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                استوديو طباعة الصور المغناطيسية
              </h2>
              <p className="text-xs text-stone-500">
                ارفعي صورتكِ وشاهدي معاينة حية فورية لمغناطيس الثلاجة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Live Preview Stage (Fridge surface) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 p-8 rounded-2xl border border-stone-300/80 shadow-inner relative min-h-[380px]">
            {/* Stainless steel fridge effect */}
            <div className="absolute top-3 right-4 text-[11px] font-mono text-stone-600 tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              معاينة واقعية على سطح الثلاجة
            </div>

            {/* Simulated Magnet on Fridge */}
            <div className="relative group transition-all duration-300 shadow-2xl">
              {/* Magnet Drop Shadow */}
              <div
                className={`relative bg-white overflow-hidden transition-all duration-300 border-4 ${
                  finish === 'wood'
                    ? 'border-[#8B5E3C] ring-4 ring-[#6B4423]/40'
                    : 'border-white'
                } ${
                  shape === 'circle'
                    ? 'rounded-full w-56 h-56'
                    : shape === 'polaroid'
                    ? 'rounded-md w-56 pb-12'
                    : 'rounded-xl w-56 h-56'
                } flex flex-col items-center justify-center`}
              >
                <div
                  className={`w-full h-full overflow-hidden ${
                    shape === 'polaroid' ? 'h-48' : ''
                  }`}
                >
                  <img
                    src={selectedPhoto}
                    alt="معاينة الصورة"
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  />
                </div>

                {/* Caption / Polaroid Note */}
                {customText && (
                  <div
                    className={`${
                      shape === 'polaroid'
                        ? 'absolute bottom-2 inset-x-0 text-center font-serif text-xs text-stone-800 px-2'
                        : 'absolute bottom-2 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full'
                    }`}
                  >
                    {customText}
                  </div>
                )}
              </div>

              {/* Realistic Fridge Magnet pin in corner */}
              <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white">
                🧲
              </div>
            </div>

            {/* Zoom / Control Slider */}
            <div className="mt-6 flex items-center gap-3 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl border border-stone-200 shadow-sm text-xs text-stone-700">
              <ZoomIn className="w-4 h-4 text-stone-500" />
              <span>تكبير:</span>
              <input
                type="range"
                min="100"
                max="160"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-24 accent-amber-800 cursor-pointer"
              />
              <span className="font-mono tabular-nums">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(100)}
                className="text-stone-400 hover:text-stone-700 p-1"
                title="إعادة التعيين"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Configuration Form Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* 1. Upload or preset photo */}
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-2">
                1. اختاري صورتكِ
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 border-2 border-dashed border-stone-300 hover:border-amber-700 rounded-xl bg-white hover:bg-amber-50/40 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-amber-800" />
                <span>ارفعي صورة من جهازكِ أو جوالكِ</span>
              </button>

              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[11px] text-stone-500">أو نماذج جاهزة:</span>
                <div className="flex gap-2">
                  {SAMPLE_PRESET_PHOTOS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPhoto(preset.url)}
                      className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPhoto === preset.url
                          ? 'border-amber-800 ring-2 ring-amber-700/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      title={preset.title}
                    >
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Shape Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-2">
                2. شكل المغناطيس
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setShape('square')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    shape === 'square'
                      ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  ⬛ مربع 7×7
                </button>
                <button
                  onClick={() => setShape('circle')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    shape === 'circle'
                      ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  ⚪ دائري 7.5 سم
                </button>
                <button
                  onClick={() => setShape('polaroid')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    shape === 'polaroid'
                      ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  📷 بولارويد كلاسيك
                </button>
              </div>
            </div>

            {/* 3. Text Dedication */}
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-1.5">
                3. كتابة خاصة / تاريخ (اختياري)
              </label>
              <input
                type="text"
                placeholder="مثال: ذكرى تخرج سارة 🎓 2024"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={45}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-800"
              />
            </div>

            {/* 4. Finish */}
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-1.5">
                4. نوع السطح والإطار
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setFinish('matte')}
                  className={`py-2 rounded-xl border text-center ${
                    finish === 'matte'
                      ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  مطفي فاخر
                </button>
                <button
                  onClick={() => setFinish('glossy')}
                  className={`py-2 rounded-xl border text-center ${
                    finish === 'glossy'
                      ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  كريستال لامع
                </button>
                <button
                  onClick={() => setFinish('wood')}
                  className={`py-2 rounded-xl border text-center ${
                    finish === 'wood'
                      ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  إطار خشب طبيعي
                </button>
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-stone-500 block">السعر:</span>
                <span className="text-xl font-black text-stone-900 tabular-nums">
                  {currentProduct.price.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-stone-500">ر.س</span>
                </span>
              </div>
              <button
                onClick={handleSaveAndAdd}
                className="flex items-center gap-2 bg-[#2D2A26] hover:bg-stone-950 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>أضف للطلب الآن</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
