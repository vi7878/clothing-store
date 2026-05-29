import { useEffect } from 'react';
import { productsData } from '../data/products';
import ProductCard from './ProductCard';

const SearchModal = ({ isOpen, onClose, query }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const suggestedProducts = productsData.slice(0, 4);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-30" onClick={onClose}></div>
      
      <div className="absolute top-[100%] left-0 w-full bg-white z-40 shadow-2xl py-10 px-4 md:px-10 border-t border-gray-200 max-h-[75vh] overflow-y-auto cursor-default">
        {query.length < 2 ? (
          <div className="max-w-[1400px] mx-auto">
            <h3 className="text-center font-bold text-lg tracking-widest uppercase mb-8">Тебе може зацікавити</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {suggestedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[800px] mx-auto text-center mt-10 mb-10">
            <p className="text-gray-500 text-lg mb-4">Натисніть Enter, щоб знайти всі товари за запитом:</p>
            <p className="text-3xl font-bold uppercase text-[#0B0035]">"{query}"</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchModal;