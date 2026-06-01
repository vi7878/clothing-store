import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';

const allCategoriesMap = [
  { id: 'Tracksuits', label: 'Спортивні костюми' },
  { id: 'Pants', label: 'Штани' },
  { id: 'Pants & Leggings', label: 'Штани та легінси' },
  { id: 'Shorts', label: 'Шорти' },
  { id: 'Socks', label: 'Шкарпетки' },
  { id: 'T-shirts & Polos', label: 'Футболки та поло' },
  { id: 'T-shirts & Tank Tops', label: 'Футболки і майки' },
  { id: 'Shirts', label: 'Сорочки' },
  { id: 'Blouses & Shirts', label: 'Блузки та сорочки' },
  { id: 'Sweaters', label: 'Светри' },
  { id: 'Sweaters & Cardigans', label: 'Светри та кардигани' },
  { id: 'Beachwear', label: 'Пляжний одяг' },
  { id: 'Suits & Blazers', label: 'Костюми та піджаки' },
  { id: 'Jackets & Vests', label: 'Піджаки та жилетки' },
  { id: 'Coats', label: 'Пальта' },
  { id: 'Outerwear', label: 'Верхній одяг' },
  { id: 'Hoodies & Sweatshirts', label: 'Кофти' },
  { id: 'Hoodies & Sweatshirts', label: 'Худі та кофти' },
  { id: 'Sets', label: 'Комплекти' },
  { id: 'Co-ords', label: 'Комплекти' },
  { id: 'Jumpsuits', label: 'Комбінезони' },
  { id: 'Jeans', label: 'Джинси' },
  { id: 'Dresses', label: 'Сукні' },
  { id: 'Skirts', label: 'Спідниці' }
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [genderFilter, setGenderFilter] = useState('all');

  const searchResults = useMemo(() => {
    if (!query) return [];

    const lowerQuery = query.toLowerCase().trim();
    // trimming the ending for flexibility (e.g., "спідниця" -> "спідниц")
    const baseQuery = lowerQuery.length > 4 ? lowerQuery.slice(0, -2) : lowerQuery;

    return productsData.filter(p => {
      //searching for matches only in the name (description removed to avoid "junk" results)
      const matchName = p.name?.toLowerCase().includes(baseQuery);

      const cat = allCategoriesMap.find(c => c.id === p.category);
      const matchCategory = cat ? cat.label.toLowerCase().includes(baseQuery) : false;

      if (!matchName && !matchCategory) return false;

      if (genderFilter !== 'all' && p.gender !== genderFilter) return false;

      return true;
    });
  }, [query, genderFilter]);

  return (
    <div className="max-w-[1700px] mx-auto px-4 md:px-10 py-10 min-h-[60vh]">

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-4 uppercase">
          Результати пошуку
        </h1>
        <p className="text-lg text-gray-600">
          За запитом <span className="font-bold text-black">"{query}"</span> знайдено {searchResults.length} товарів
        </p>
      </div>

      {query && (
        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            onClick={() => setGenderFilter('all')}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-colors ${
              genderFilter === 'all' ? 'bg-[#0B0035] text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Усі
          </button>
          <button
            onClick={() => setGenderFilter('women')}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-colors ${
              genderFilter === 'women' ? 'bg-[#0B0035] text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Жінки
          </button>
          <button
            onClick={() => setGenderFilter('men')}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-colors ${
              genderFilter === 'men' ? 'bg-[#0B0035] text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          > Чоловіки
          </button>
        </div>
      )}

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mb-12">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h3 className="text-2xl font-bold text-gray-400 mb-4">На жаль, ми нічого не знайшли :(</h3>
          <p className="text-gray-500">Спробуйте змінити запит або пошукати щось інше</p>
        </div>
      )}

    </div>
  );
};

export default SearchPage;
