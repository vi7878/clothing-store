import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [genderFilter, setGenderFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || `${window.location.origin}/api`;
        let url = `${apiUrl}/products/?search=${encodeURIComponent(query)}`;
        if (genderFilter !== 'all') {
          url += `&gender=${genderFilter}`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProducts(Array.isArray(data) ? data : (data.results || []));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, genderFilter]);

  return (
    <div className="max-w-[1700px] mx-auto px-4 md:px-10 py-10 min-h-[60vh]">

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-4 uppercase">
          Результати пошуку
        </h1>
        <p className="text-lg text-gray-600">
          За запитом <span className="font-bold text-black">"{query}"</span> знайдено {products.length} товарів
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

      {loading ? (
        <div className="py-20 text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B0035] mx-auto"></div>
           <p className="mt-4 text-gray-500">Шукаємо найкращі пропозиції...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mb-12">
          {products.map(product => (
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
