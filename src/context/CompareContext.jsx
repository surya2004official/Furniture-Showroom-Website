import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareIds, setCompareIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_compare');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-6'];
    } catch {
      return ['prod-1', 'prod-6'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_compare', JSON.stringify(compareIds));
    } catch (e) {
      console.error(e);
    }
  }, [compareIds]);

  const addToCompare = (productId) => {
    if (compareIds.includes(productId)) return true;
    if (compareIds.length >= 4) {
      return false; // Maximum 4 products
    }
    setCompareIds(prev => [...prev, productId]);
    return true;
  };

  const removeFromCompare = (productId) => {
    setCompareIds(prev => prev.filter(id => id !== productId));
  };

  const toggleCompare = (productId) => {
    if (compareIds.includes(productId)) {
      removeFromCompare(productId);
      return { added: false };
    } else {
      const success = addToCompare(productId);
      return { added: success, full: !success };
    }
  };

  const clearCompare = () => setCompareIds([]);

  const isInCompare = (productId) => compareIds.includes(productId);

  const compareProducts = compareIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <CompareContext.Provider value={{
      compareIds,
      compareProducts,
      compareCount: compareIds.length,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
      isInCompare
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
