import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const SearchModal = ({ isOpen, onClose, query }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const cleanApiUrl = apiUrl.endsWith('/') ? apiUrl : apiUrl + '/';

      if (query.trim().length < 2) {
        try {
          const response = await fetch(`${cleanApiUrl}products/`);
          if (response.ok) {
            const data = await response.json();
            const items = Array.isArray(data) ? data : (data.results || []);
            setSuggestions(items.slice(0, 4));
          }
        } catch (error) {
          console.error('SearchModal: Error fetching defaults:', error);
        }
        return;
      }

      setLoading(true);
      try {
        const searchUrl = `${cleanApiUrl}products/?search=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl);
        if (response.ok) {
          const data = await response.json();
          const items = Array.isArray(data) ? data : (data.results || []);
          setSuggestions(items.slice(0, 4));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('SearchModal: Error fetching search results:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (isOpen) fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-30" onClick={onClose}></div>

      <div className="absolute top-[100%] left-0 w-full bg-white z-40 shadow-2xl py-10 px-4 md:px-10 border-t border-gray-200 max-h-[75vh] overflow-y-auto cursor-default transition-all duration-300 origin-top animate-fade-in">
        <div className="max-w-[1400px] mx-auto">
          {query.length < 2 ? (
            <h3 className="text-center font-bold text-lg tracking-widest uppercase mb-8">Тебе може зацікавити</h3>
          ) : (
            <h3 className="text-center font-bold text-lg tracking-widest uppercase mb-8">
              {loading ? 'Шукаємо...' : `Результати за запитом: "${query}"`}
            </h3>
          )}

          {suggestions.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {suggestions.map(product => (
                <div key={product.id} onClick={onClose}>
                   <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : !loading && (
            <p className="text-center text-gray-500 py-10">Нічого не знайдено</p>
          )}

          {query.length >= 2 && !loading && (
            <div className="mt-10 pt-6 border-t border-gray-100 text-center">
               <p className="text-gray-400 text-sm">Натисніть Enter, щоб побачити всі результати</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
