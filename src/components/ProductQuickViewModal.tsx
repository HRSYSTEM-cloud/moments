import React, { useState } from 'react';
import { X, Star, ShoppingBag, Sparkles, Check, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenStudioForProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenStudioForProduct,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 bg-stone-100 flex flex-col justify-between">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs mb-4">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all"
              />
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-amber-800 ring-2 ring-amber-700/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="صورة إضافية" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums text-stone-900">
                    {product.rating > 0 ? product.rating.toFixed(1) : '5.0'}
                  </span>
                  <span className="text-stone-400 font-normal">
                    ({product.ratingCount || 48} تقييم)
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-stone-900">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
                  {(product.price * quantity).toFixed(2)}
                </span>
                <span className="text-xs font-medium text-stone-500">ر.س</span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through font-mono tabular-nums mr-2">
                    {(product.originalPrice * quantity).toFixed(2)} ر.س
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                {product.description}
              </p>

              {/* Features bullets */}
              <ul className="space-y-1.5 text-xs text-stone-600 pt-1">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Material & Dimensions */}
              {product.dimensions && (
                <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100 space-y-1">
                  <div><strong>المقاس:</strong> {product.dimensions}</div>
                  {product.material && <div><strong>الخامة:</strong> {product.material}</div>}
                </div>
              )}
            </div>

            {/* Customizer prompt if customizable */}
            {product.isCustomizable && (
              <button
                onClick={() => {
                  onClose();
                  onOpenStudioForProduct(product);
                }}
                className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100/70 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>ارفعي صورتكِ المخصصة لهذا المنتج في الاستوديو</span>
              </button>
            )}

            {/* Quantity Stepper & Add to Cart button */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-10 flex items-center justify-center bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold font-mono tabular-nums text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-10 flex items-center justify-center bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2D2A26] hover:bg-stone-950 text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>{justAdded ? 'تمت الإضافة بنجاح ✓' : 'أضف للسلة'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
                aria-label="المفضلة"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
