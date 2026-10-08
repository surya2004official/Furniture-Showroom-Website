import { products } from '../data/products';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved).map(item => {
        const product = products.find(product => product.id === item.productId);
        return product && !item.customConfig ? { ...item, image: product.images[0] } : item;
      }) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [whiteGloveService, setWhiteGloveService] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedColor = null, customConfig = null) => {
    const colorName = selectedColor?.name || product.colors?.[0]?.name || 'Standard';
    const cartItemId = customConfig 
      ? `custom-${Date.now()}` 
      : `${product.id}-${colorName}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          price: customConfig ? customConfig.price : product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
          selectedColor: colorName,
          category: product.categoryName || product.category,
          quantity,
          customConfig: customConfig || null
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const addBundleToCart = (productsList) => {
    productsList.forEach(product => {
      addToCart(product, 1);
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    setPromoError('');

    if (cleanCode === 'LUXE10') {
      setAppliedPromo({ code: 'LUXE10', discountPercent: 10, label: '10% VIP Privilege Discount' });
      return { success: true, message: 'VIP Promo Code Applied: 10% Off' };
    } else if (cleanCode === 'VVIP15') {
      setAppliedPromo({ code: 'VVIP15', discountPercent: 15, label: '15% Private Collector Discount' });
      return { success: true, message: 'VVIP Promo Code Applied: 15% Off' };
    } else if (cleanCode === 'WELCOME5') {
      setAppliedPromo({ code: 'WELCOME5', discountPercent: 5, label: '5% Welcome Privilege' });
      return { success: true, message: 'Welcome Promo Applied: 5% Off' };
    } else {
      setPromoError('Invalid or expired privilege coupon code');
      return { success: false, message: 'Invalid code. Try LUXE10 or VVIP15' };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Delivery: Free for orders over ₹50,000
  const deliveryCharge = subtotal > 50000 || subtotal === 0 ? 0 : 3500;
  const whiteGloveCharge = whiteGloveService && subtotal > 0 ? 0 : 0; // Complimentary white glove delivery for all luxury orders

  const promoDiscountAmount = appliedPromo 
    ? Math.round(subtotal * (appliedPromo.discountPercent / 100))
    : 0;

  const total = Math.max(0, subtotal - promoDiscountAmount + deliveryCharge);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      addBundleToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      subtotal,
      totalItemCount,
      deliveryCharge,
      promoCode,
      setPromoCode,
      appliedPromo,
      promoError,
      promoDiscountAmount,
      applyPromo,
      removePromo,
      whiteGloveService,
      setWhiteGloveService,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
