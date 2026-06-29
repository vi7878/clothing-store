import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import CatalogPagination from '../components/CatalogPagination';
import RecommendedSlider from '../components/RecommendedSlider';
import { Link } from 'react-router-dom';

const Wishlist = () => {
const { products, wishlistItems, getWishlistCount } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(12);

  const favoriteProducts = wishlistItems
  .map(id => products.find(p => p.id === id))
  .filter(product => product !== undefined);
  const totalCount = favoriteProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  if (totalCount === 0) {
    return (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 pb-10 pt-32 text-center min-h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black uppercase mb-4">Список бажань порожній</h1>
          <p className="text-gray-500 mb-8">Ви ще не додали жодного товару до улюблених.</p>
          <Link to="/" className="bg-black text-white px-8 py-3 font-bold uppercase hover:bg-[#B2412E] transition-colors">
            Перейти до каталогу
          </Link>
        </div>
        <RecommendedSlider isHomePage={true} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 pb-10 pt-8 min-h-screen">
        <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-black text-black">Кошик <span className="text-gray-400 text-2xl">/ Улюблене</span></h1>
          <div className="w-8 h-8 rounded-full bg-[#B2412E] text-white flex items-center justify-center font-bold text-lg">
            {getWishlistCount()}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favoriteProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalCount > 12 && (
          <CatalogPagination
            visibleCount={visibleCount}
            totalCount={totalCount}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>

      <div className="w-full bg-white pb-20">
        <RecommendedSlider isHomePage={true} />
      </div>
    </div>
  )
}

export default Wishlist
