import { useSearchParams } from 'react-router-dom';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';

const Sale = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genderQuery = searchParams.get('gender');

  const currentTab = genderQuery === 'men' ? 'men' : 'women';

  const filteredProducts = productsData.filter(product =>
    product.gender === currentTab && product.has_discount
  );

  const handleTabChange = (gender) => {
    setSearchParams({ gender });
  };

  return (
    <div className="max-w-[1700px] mx-auto w-full px-10 mt-10 mb-20">
      <h2 className="text-[30px] md:text-[40px] font-black text-[#B2412E] mb-6 tracking-tight uppercase">
        -20% НА ТОВАРИ
      </h2>

      <div className="flex gap-6 mb-8 border-b border-gray-200">
        <button
          onClick={() => handleTabChange('women')}
          className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
            currentTab === 'women' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
          }`}
        >
          Жінки
        </button>

        <button
          onClick={() => handleTabChange('men')}
          className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
            currentTab === 'men' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
          }`}
        >
          Чоловіки
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h3 className="text-xl font-bold text-gray-400">Наразі в цій категорії немає товарів зі знижкою :(</h3>
        </div>
      )}
    </div>
  )
}

export default Sale
