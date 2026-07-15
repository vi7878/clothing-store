import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const New = () => {
  const { products, loading } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const genderQuery = searchParams.get('gender');

  const currentTab = genderQuery === 'men' ? 'men' : 'women';

  const filteredProducts = products.filter(product =>
    product.gender === currentTab && (product.collections?.includes('new') || product.is_new)
  );

  const handleTabChange = (gender) => {
    setSearchParams({ gender });
  };

  return (
    <div className="max-w-[1700px] mx-auto w-full px-10 mt-10 mb-20">
      <h2 className="text-[30px] md:text-[40px] font-black text-black mb-6 tracking-tight">
        НОВІ НАДХОДЖЕННЯ
      </h2>

      <div className="flex gap-6 mb-8 border-b border-gray-200">
        <button
          onClick={() => handleTabChange('women')}
          className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
            currentTab === 'women' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
          }`}
        > Жінки
        </button>

        <button
          onClick={() => handleTabChange('men')}
          className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
            currentTab === 'men' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
          }`}
        > Чоловіки
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full aspect-[3/4] bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h3 className="text-xl font-bold text-gray-400">Наразі в цій категорії немає новинок :(</h3>
        </div>
      )}
    </div>
  )
}

export default New
