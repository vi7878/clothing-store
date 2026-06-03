import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiX } from 'react-icons/fi';

const CartModal = () => {
  const { isCartModalOpen, setIsCartModalOpen } = useContext(ShopContext);

  if (!isCartModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="bg-white p-8 relative max-w-[400px] w-full flex flex-col items-center text-center shadow-2xl">
        <button
          onClick={() => setIsCartModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          <FiX className="text-2xl" />
        </button>

        <FiCheckCircle className="text-[#10B981] text-5xl mb-4" />
        <h3 className="text-xl font-bold mb-8 text-gray-900">Товар додано в кошик</h3>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => setIsCartModalOpen(false)}
            className="flex-1 border-2 border-black py-3 text-[13px] font-bold hover:bg-gray-50 uppercase"
          >Продовжити купування
          </button>
          <Link
            to="/cart"
            onClick={() => setIsCartModalOpen(false)}
            className="flex-1 bg-black text-white text-[13px] font-bold py-3 flex items-center justify-center hover:bg-[#B2412E] transition-colors uppercase"
          >
            Перейти у кошик
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartModal
