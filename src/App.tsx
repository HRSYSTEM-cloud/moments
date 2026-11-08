import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ValueProps } from './components/ValueProps';
import { ProductCatalog } from './components/ProductCatalog';
import { StatsSection } from './components/StatsSection';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomPhotoStudioModal } from './components/CustomPhotoStudioModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { PRODUCTS } from './data/storeData';
import { Product, CartItem } from './types';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('moments_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moments_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('moments_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('moments_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add standard product to cart
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && !item.customPhotoUrl
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          cartItemId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          product,
          quantity,
        },
      ];
    });
    showToast(`تمت إضافة "${product.title}" إلى السلة 🛍️`);
  };

  // Add customized photo from studio
  const handleAddCustomPhotoToCart = (
    product: Product,
    customPhotoUrl: string,
    customText: string,
    shape: 'square' | 'circle' | 'polaroid' | 'rectangle',
    finish: 'matte' | 'glossy' | 'wood'
  ) => {
    const newItem: CartItem = {
      cartItemId: `custom-${Date.now()}`,
      product,
      quantity: 1,
      customPhotoUrl,
      customText,
      customShape: shape,
      customFinish: finish,
    };
    setCart((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
    showToast('تم حفظ تصميمكِ المخصص وإضافته للسلة بنجاح ✨');
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('تم حذف المنتج من السلة');
  };

  // Coupon handling
  const handleApplyCoupon = (code: string): boolean => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (code === 'MOMENTS10') {
      const discount = subtotal * 0.1;
      setAppliedCoupon('MOMENTS10');
      setDiscountAmount(discount);
      showToast('تم تطبيق خصم 10% بنجاح! 🎉');
      return true;
    }
    if (code === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      setDiscountAmount(0);
      showToast('تم تفعيل الشحن المجاني! 🚚');
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    showToast('تم إلغاء كود الخصم');
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('تمت إزالة المنتج من المفضلة');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('تمت إضافة المنتج للمفضلة ❤️');
        return [...prev, productId];
      }
    });
  };

  // Smooth scroll
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'products-handmade') {
      const element = document.getElementById('products');
      element?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculation for Checkout
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 200 || appliedCoupon === 'FREESHIP';
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleOrderSuccess = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-amber-300/30 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Slideshow */}
        <HeroSlider
          onShopNow={() => handleNavigate('products')}
          onOpenStudio={() => setIsStudioOpen(true)}
        />

        {/* Value Propositions from Prompt */}
        <ValueProps />

        {/* Interactive Custom Photo Callout Banner */}
        <section className="bg-gradient-to-r from-[#FAF6F0] via-[#F3EFE9] to-[#FAF6F0] py-12 border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-right max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>ميزة حصرية في متجر مومنتس</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  اطبعي صورتكِ الآن وشاهديها مباشرة على ثلاجتكِ!
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  استخدمي استوديو الطباعة المباشر لرفع صورتكِ، اختيار الشكل الدائري أو المربع، وإضافة إهدائكِ الخاص بخط جميل.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={() => setIsStudioOpen(true)}
                  className="px-8 py-4 bg-[#2D2A26] hover:bg-stone-950 text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2.5"
                >
                  <span>فتح استوديو الطباعة 📷</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog matching prompt */}
        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onQuickView={(product) => setQuickViewProduct(product)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
          searchQuery={searchQuery}
        />

        {/* Statistics Section: MOMENTS بالأرقام */}
        <StatsSection />

        {/* How it Works: خطوات بسيطة */}
        <HowItWorks onOpenStudio={() => setIsStudioOpen(true)} />

        {/* Testimonials: ماذا قالت عميلاتنا؟ */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onOpenShop={() => handleNavigate('products')}
        appliedCoupon={appliedCoupon}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        discount={discountAmount}
        shipping={shippingFee}
        grandTotal={grandTotal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Custom Photo Studio Modal */}
      <CustomPhotoStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onAddToCart={handleAddCustomPhotoToCart}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onOpenStudioForProduct={() => setIsStudioOpen(true)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
}
