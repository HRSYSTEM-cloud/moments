import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Heart, Star, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كل المنتجات' },
    { id: 'magnets', label: 'صور مغناطيسية' },
    { id: 'gifts', label: 'هدايا وبوكسات' },
    { id: 'handmade', label: 'صُنع بحب' },
    { id: 'accessories', label: 'عدسات وتعليقات' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold text-amber-900 tracking-wider mb-2 flex items-center gap-1.5">
              <span>✦</span>
              <span>مجموعتنا المختارة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              كل المنتجات
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1">
              أجمل الهدايا والصور المغناطيسية المنفذة يدوياً بأعلى معايير الجودة
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search feedback if filtered */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-stone-100 rounded-xl text-xs text-stone-600 flex items-center justify-between">
            <span>
              نتائج البحث عن: <strong className="text-stone-900">"{searchQuery}"</strong> (
              {filteredProducts.length} منتج)
            </span>
          </div>
        )}

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
            <p className="text-base text-stone-600 font-medium">لم نجد أي منتجات تطابق بحثكِ.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              عرض كل المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isAdded = addedAnimationId === product.id;

              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl border border-stone-200/90 hover:border-amber-700/30 overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col"
                >
                  {/* Image Container with 4:3 / 1:1 Aspect Ratio */}
                  <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Subtle Badge */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-stone-200">
                        {product.badge}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isWishlisted
                          ? 'bg-red-50 text-red-600 shadow-xs'
                          : 'bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs'
                      }`}
                      aria-label="إضافة للمفضلة"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-600' : ''}`}
                      />
                    </button>

                    {/* Quick View Overlay Button */}
                    <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <button
                        onClick={() => onQuickView(product)}
                        className="pointer-events-auto bg-white/95 hover:bg-white text-stone-900 px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>نظرة سريعة</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col grow justify-between">
                    <div>
                      {/* Rating & Category */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span>{product.categoryLabel}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-mono tabular-nums text-stone-800">
                            {product.rating > 0 ? product.rating.toFixed(1) : '5.0'}
                          </span>
                        </div>
                      </div>

                      {/* Product Title matching prompt */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="text-base sm:text-lg font-bold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.title}
                      </h3>

                      {/* Subtitle / brief description */}
                      {product.subtitle && (
                        <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                          {product.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Price & Add to Cart button */}
                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-stone-900 font-mono tabular-nums">
                            {product.price.toFixed(2)}
                          </span>
                          <span className="text-xs font-medium text-stone-500">ر.س</span>
                        </div>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through font-mono tabular-nums block">
                            {product.originalPrice.toFixed(2)} ر.س
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#2D2A26] hover:bg-stone-950 text-white shadow-xs'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                        <span>{isAdded ? 'تمت الإضافة ✓' : 'أضف للسلة'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* "تحميل المزيد" button from prompt */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm rounded-xl border border-stone-300 shadow-xs transition-all hover:border-stone-400 active:scale-95 cursor-pointer"
            >
              <span>تحميل المزيد</span>
              <span className="text-xs text-stone-400">
                ({filteredProducts.length - visibleCount} منتج إضافي)
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
