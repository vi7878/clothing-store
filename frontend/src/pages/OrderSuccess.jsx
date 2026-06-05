import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const OrderSuccess = () => {
  const { setCartItems } = useContext(ShopContext);

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-6 text-green-500">✓</div>
      <h1 className="text-3xl font-black uppercase mb-4 text-[#0B0035]">Замовлення прийнято!</h1>
      <p className="text-gray-500 mb-10 max-w-md">
        Дякуємо за покупку. Ми надішлемо підтвердження на вашу електронну пошту.
      </p>
      <Link to="/" className="bg-[#0B0035] text-white px-10 py-4 font-bold uppercase hover:bg-[#1a0a4a] transition-colors">
        На головну
      </Link>
    </div>
  );
};

export default OrderSuccess;