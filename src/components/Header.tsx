import React, { useState } from 'react';
import { TICKER_MESSAGES, SUB_TICKER_MESSAGES } from '../data/storeData';
import { ShoppingBag, Search, Heart, Camera, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenStudio: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenStudio,
  searchQuery,
  onSearchChange,
  onNavigate,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Marquee Announcement Ticker */}
      <div className="bg-[#2D2A26] text-[#F3EFEA] text-xs font-medium py-2 overflow-hidden border-b border-[#3D3833]">
        <div className="animate-marquee-rtl flex items-center whitespace-nowrap">
          {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, idx) => (
            <span key={idx} className="mx-6 flex items-center gap-2">
              <span>{msg}</span>
              <span className="text-amber-300/40 select-none">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Sub announcement bar with warm greeting */}
      <div className="bg-[#EFE8DF] text-stone-700 text-xs py-1.5 px-4 text-center border-b border-stone-300/60 hidden sm:flex items-center justify-center gap-6">
        {SUB_TICKER_MESSAGES.map((sub, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span>{sub}</span>
            {idx < SUB_TICKER_MESSAGES.length - 1 && <span className="text-stone-400">|</span>}
          </span>
        ))}
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 hover:opacity-90 transition-opacity"
            aria-label="Moments الرئيسية"
          >
            <span className="text-2xl">📷</span>
            <span className="font-serif tracking-normal">Moments</span>
            <span className="text-xs font-sans font-light px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-600">
              مومنتس
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => onNavigate('products')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-stone-800"
          >
            كل المنتجات
          </button>
          <button
            onClick={onOpenStudio}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 flex items-center gap-1.5 text-amber-900 font-semibold"
          >
            <Camera className="w-4 h-4 text-amber-800" />
            <span>إطبعي صورة</span>
          </button>
          <button
            onClick={() => onNavigate('products-handmade')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-stone-800"
          >
            صُنع بحب
          </button>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-stone-800"
          >
            كيف نصنع هديتك؟
          </button>
          <button
            onClick={() => onNavigate('testimonials')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-stone-800"
          >
            آراء العميلات
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-stone-800"
          >
            الأسئلة الشائعة
          </button>
        </nav>

        {/* Zone 3: Search, Studio CTA & Cart */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 shadow-xs w-48 sm:w-60 transition-all">
                <Search className="w-4 h-4 text-stone-400 shrink-0 ml-1.5" />
                <input
                  type="text"
                  placeholder="ابحثي عن منتج..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-full text-xs text-stone-800 outline-none bg-transparent placeholder:text-stone-400"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-600 mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors"
                title="بحث"
                aria-label="فتح شريط البحث"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist count (quiet display) */}
          <button
            onClick={() => onNavigate('products')}
            className="relative p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors hidden sm:block"
            title="المفضلة"
            aria-label="المفضلة"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Print Photo Studio Button */}
          <button
            onClick={onOpenStudio}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-[#E8DDD4] hover:bg-[#DCCEC2] rounded-lg transition-colors border border-[#D5C6BA]"
          >
            <span>✨ استوديو الطباعة</span>
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#2D2A26] hover:bg-[#1E1C1A] text-[#FAF8F5] px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-semibold hidden sm:inline">السلة</span>
            <span className="bg-amber-400 text-stone-950 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
