import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';
import CatalogSidebar from '../components/CatalogSidebar';
import CatalogFilterBar from '../components/CatalogFilterBar';
import CatalogPagination from '../components/CatalogPagination';

const categoriesMap = [
  { id: 'Tracksuits', label: 'Спортивні костюми' },
  { id: 'Pants', label: 'Штани' },
  { id: 'Shorts', label: 'Шорти' },
  { id: 'Socks', label: 'Шкарпетки' },
  { id: 'T-shirts & Polos', label: 'Футболки та поло' },
  { id: 'Shirts', label: 'Сорочки' },
  { id: 'Sweaters', label: 'Светри' },
  { id: 'Beachwear', label: 'Пляжний одяг' },
  { id: 'Suits & Blazers', label: 'Костюми та піджаки' },
  { id: 'Coats', label: 'Пальта' },
  { id: 'Outerwear', label: 'Верхній одяг' },
  { id: 'Hoodies & Sweatshirts', label: 'Худі та кофти' },
  { id: 'Sets', label: 'Комплекти' },
  { id: 'Jeans', label: 'Джинси' },
];

const Men = () => {
  const scrollDirection = useScrollDirection();
  const [activeCollection, setActiveCollection] = useState('all');
  // Read category from URL query parameters with Home page and set it as active category
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryQuery);
  const [isSalesActive, setIsSalesActive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const [sortOption, setSortOption] = useState('popular');
  const [sizeOption, setSizeOption] = useState([]);
  const [colorOption, setColorOption] = useState([]);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // Sync URL query without triggering cascading renders in useEffect and without reading refs during render
  const [prevCategoryQuery, setPrevCategoryQuery] = useState(categoryQuery);
  if (categoryQuery !== prevCategoryQuery) {
    setPrevCategoryQuery(categoryQuery);
    setActiveCategory(categoryQuery);
    setVisibleCount(9);
  }

  // Filter products specifically for men
  const menProducts = useMemo(() => productsData.filter(p => p.gender === 'men'), []);

  const newCategories = useMemo(() => {
    const newProds = menProducts.filter(p => p.collections?.includes('new'));
    const availableCategoryIds = [...new Set(newProds.map(p => p.category))];
    return categoriesMap.filter(c => availableCategoryIds.includes(c.id));
  }, [menProducts]);

  const summerCategories = useMemo(() => {
    const summerProds = menProducts.filter(p => p.collections?.includes('summer'));
    const availableCategoryIds = [...new Set(summerProds.map(p => p.category))];
    return categoriesMap.filter(c => availableCategoryIds.includes(c.id));
  }, [menProducts]);

  const filteredProducts = useFilteredProducts({
    products: menProducts,
    searchQuery,
    activeCollection,
    activeCategory,
    isSalesActive,
    sizeOption,
    colorOption,
    priceMin,
    priceMax,
    sortOption
  });

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setVisibleCount(9);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Slice only the visible products (for example, the first 9)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const { minCatalogPrice, maxCatalogPrice } = useMemo(() => {
    if (menProducts.length === 0) return { minCatalogPrice: 0, maxCatalogPrice: 99999 };

    const prices = menProducts.map(p => {
      const base = p.base_price || p.price || 0;
      const discount = p.discount_percent || (p.has_discount ? 20 : 0);
      return p.has_discount ? base - (base * (discount / 100)) : base;
    });

    return {
      minCatalogPrice: Math.floor(Math.min(...prices)),
      maxCatalogPrice: Math.ceil(Math.max(...prices))
    };
  }, [menProducts]);

  const getActiveTitle = () => {
    let title;
    if (activeCollection === 'new') title = 'Новинки';
    else if (activeCollection === 'summer') title = 'Сезонний одяг - Літо';
    else title = 'Всі товари';

    if (activeCategory !== 'all') {
      const cat = categoriesMap.find(c => c.id === activeCategory);
      if (cat) title += ` - ${cat.label}`;
    }
    return title;
  };

  const handleCollectionClick = (collectionId) => {
    setActiveCollection(collectionId);
    setActiveCategory('all');
    setVisibleCount(9);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleCount(9);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // FUNCTION: Add 9 more products to the visible products when "Load More" is clicked
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };

  return (
    <div className="max-w-[1700px] mx-auto px-4 md:px-10 py-10">
      <div className="flex flex-col md:flex-row gap-8">

        {/* SIDEBAR */}
        <CatalogSidebar
          scrollDirection={scrollDirection}
          activeCollection={activeCollection}
          activeCategory={activeCategory}
          onCollectionClick={handleCollectionClick}
          onCategoryClick={handleCategoryClick}
          categoriesMap={categoriesMap}
          newCategories={newCategories}
          summerCategories={summerCategories}
        />

        <main className="flex-1">
          {/* Title */}
          <div className="mb-4">
            <div className="flex items-baseline gap-4 mb-4">
              <h1 className="text-4xl md:text-[42px] font-black text-black tracking-tight">Чоловічий одяг</h1>
              <span className="text-sm font-bold text-black">
                Кількість вибраних товарів: {filteredProducts.length}
              </span>
            </div>
            <h2 className="text-[#a53b26] font-bold text-[22px] mb-4">{getActiveTitle()}</h2>
          </div>

          {/* FILTER BAR */}
          <CatalogFilterBar
            scrollDirection={scrollDirection}
            isSalesActive={isSalesActive}
            setIsSalesActive={handleFilterChange(setIsSalesActive)}
            sort={sortOption} setSort={handleFilterChange(setSortOption)}
            size={sizeOption} setSize={handleFilterChange(setSizeOption)}
            color={colorOption} setColor={handleFilterChange(setColorOption)}
            priceMin={priceMin} setPriceMin={handleFilterChange(setPriceMin)}
            priceMax={priceMax} setPriceMax={handleFilterChange(setPriceMax)}
            availableMinPrice={minCatalogPrice}
            availableMaxPrice={maxCatalogPrice}
          />

          {/* PRODUCT GRID */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 mb-12">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-bold text-gray-400">У цій категорії поки немає товарів :(</h3>
            </div>
          )}

          {/* PAGINATION */}
          {filteredProducts.length > 0 && (
            <CatalogPagination
              visibleCount={visibleCount}
              totalCount={filteredProducts.length}
              onLoadMore={handleLoadMore}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default Men;
