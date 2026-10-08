import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-7'];
    } catch {
      return ['prod-1', 'prod-7'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const clearWishlist = () => setWishlistIds([]);

  const wishlistProducts = wishlistIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <WishlistContext.Provider value={{
      wishlistIds,
      wishlistProducts,
      wishlistCount: wishlistIds.length,
      toggleWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
