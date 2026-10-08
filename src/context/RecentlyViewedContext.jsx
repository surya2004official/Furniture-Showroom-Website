import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentIds, setRecentIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_recently_viewed');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2', 'prod-7', 'prod-11'];
    } catch {
      return ['prod-1', 'prod-2', 'prod-7', 'prod-11'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_recently_viewed', JSON.stringify(recentIds));
    } catch (e) {
      console.error(e);
    }
  }, [recentIds]);

  const addRecentlyViewed = (productId) => {
    setRecentIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 8); // Keep last 8 viewed
    });
  };

  const recentlyViewedProducts = recentIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <RecentlyViewedContext.Provider value={{
      recentIds,
      recentlyViewedProducts,
      addRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
