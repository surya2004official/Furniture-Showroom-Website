import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { FloatingAiAssistant } from './components/ai/FloatingAiAssistant';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AIRoomDesignerPage } from './pages/AIRoomDesignerPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { VirtualShowroomPage } from './pages/VirtualShowroomPage';
import { CustomDesignerPage } from './pages/CustomDesignerPage';
import { InspirationPage } from './pages/InspirationPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { ShowroomBookingPage } from './pages/ShowroomBookingPage';
import { StyleFinderPage } from './pages/StyleFinderPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { ComparePage } from './pages/ComparePage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <RecentlyViewedProvider>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-charcoal font-sans selection:bg-gold selection:text-charcoal-900">
                {/* Global Sticky Navigation */}
                <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

                {/* Main Content View */}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    
                    {/* AI & Spatial Features */}
                    <Route path="/ai-room-designer" element={<AIRoomDesignerPage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    <Route path="/virtual-showroom" element={<VirtualShowroomPage />} />
                    <Route path="/custom-designer" element={<CustomDesignerPage />} />
                    <Route path="/inspiration" element={<InspirationPage />} />
                    <Route path="/style-finder" element={<StyleFinderPage />} />
                    <Route path="/budget-planner" element={<BudgetPlannerPage />} />

                    {/* Shopping & Utilities */}
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/compare" element={<ComparePage />} />

                    {/* Brand & Showroom */}
                    <Route path="/about" element={<Navigate to="/" replace />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/book-showroom" element={<ShowroomBookingPage />} />
                  </Routes>
                </main>

                {/* Global Footer */}
                <Footer />

                {/* Global Drawers & Modals */}
                <CartDrawer />
                <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                <FloatingAiAssistant />
                <FloatingWhatsApp />
              </div>
            </RecentlyViewedProvider>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
