import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';

const Summer = () => {
  const [searchParams] = useSearchParams();
  const genderQuery = searchParams.get('gender');

  const [activeTab, setActiveTab] = useState(() => {
    if (genderQuery === 'men' || genderQuery === 'women') {
      return genderQuery;
    }
    return 'women';
  });

  const currentTab = (genderQuery === 'men' || genderQuery === 'women') ? genderQuery : activeTab;

  const filteredProducts = productsData.filter(product =>
    product.gender === currentTab && product.collections?.includes('summer')
  );

  return (
    <div className="max-w-[1700px] mx-auto w-full px-10 mt-10 mb-20">
      <h2 className="text-[30px] md:text-[40px] font-black text-black mb-6 tracking-tight">
        ЛІТНІЙ СЕЗОН 2026
      </h2>

      <div className="flex gap-6 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('women')}
          className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
            currentTab === 'women' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
          }`}
        > Жінки
        </button>

        <button
          onClick={() => setActiveTab('men')}
          className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
            currentTab === 'men' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
          }`}
        > Чоловіки
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Summer;
