import { useMemo } from 'react';

export const useFilteredProducts = ({
  products,
  searchQuery,
  activeCollection,
  activeCategory,
  isSalesActive,
  sizeOption,
  colorOption,
  priceMin,
  priceMax,
  sortOption
}) => {
  return useMemo(() => {
    if (!products || products.length === 0) return [];

    let result = products.filter(p => {
      //GLOBAL SEARCH
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name?.toLowerCase().includes(query);
        const matchDesc = p.description?.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }

      //Collections and categories
      if (activeCollection === 'new' && !p.collections?.includes('new')) return false;
      if (activeCollection === 'summer' && !p.collections?.includes('summer')) return false;
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;

      //Discounts
      if (isSalesActive && !p.has_discount) return false;

      //Sizes
      if (sizeOption && sizeOption.length > 0) {
        const hasSize = p.variants?.some(v => {
          if (typeof v === 'string') {
            return sizeOption.some(s => s.toLowerCase() === v.toLowerCase());
          }
          const variantString = JSON.stringify(v).toLowerCase();
          return sizeOption.some(s => variantString.includes(`"${s.toLowerCase()}"`));
        });
        if (!hasSize) return false;
      }

      // Colors
      if (colorOption && colorOption.length > 0) {
        const hasColor = p.variants?.some(v => {
          const variantString = JSON.stringify(v).toLowerCase();
          return colorOption.some(c => variantString.includes(c.toLowerCase()));
        });
        if (!hasColor) return false;
      }

      // Prices
      const base = p.base_price || p.price || 0;
      const discount = p.discount_percent || (p.has_discount ? 20 : 0);
      const currentPrice = p.has_discount ? base - (base * (discount / 100)) : base;

      if (priceMin !== '' && currentPrice < Number(priceMin)) return false;
      if (priceMax !== '' && currentPrice > Number(priceMax)) return false;

      return true;
    });

    // SORTING
    result.sort((a, b) => {
      const getPrice = (item) => {
        const base = item.base_price || item.price || 0;
        const discount = item.discount_percent || (item.has_discount ? 20 : 0);
        return item.has_discount ? base - (base * (discount / 100)) : base;
      };

      if (sortOption === 'price-asc') return getPrice(a) - getPrice(b);
      if (sortOption === 'price-desc') return getPrice(b) - getPrice(a);
      if (sortOption === 'popular') return (b.rating || 0) - (a.rating || 0);
      if (sortOption === 'newest') return b.id - a.id;
      return 0;
    });

    return result;
  }, [
    products, activeCollection, activeCategory, isSalesActive,
    sortOption, sizeOption, colorOption, priceMin, priceMax, searchQuery
  ]);
};
