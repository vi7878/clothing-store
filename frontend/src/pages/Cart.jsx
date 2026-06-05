import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { colorOptions } from '../data/colors.js';
import { FiTrash2, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import RecommendedSlider from '../components/RecommendedSlider';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount, wishlistItems, toggleWishlist } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('upon_receipt');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartCount = getCartCount();
  const subtotal = getCartTotal();
  const deliveryFee = subtotal >= 3000 || subtotal === 0 ? 0 : 100;
  const finalTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

  const getTranslatedColorName = (hex) => {
    const translated = colorOptions.find(c => c.hex.toLowerCase() === hex.toLowerCase());
    return translated ? translated.label : hex;
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-10 pt-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black uppercase mb-4">Ваш кошик порожній</h1>
        <p className="text-gray-500 mb-8">Схоже, ви ще не додали жодного товару.</p>
        <Link to="/" className="bg-black text-white px-8 py-3 font-bold uppercase hover:bg-[#B2412E] transition-colors">
          Перейти до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-8 min-h-screen">
      <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-black text-black">Кошик</h1>
        <div className="w-8 h-8 rounded-full bg-[#B2412E] text-white flex items-center justify-center font-bold text-lg">
          {cartCount}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT COLUMN: PRODUCT LIST */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {cartItems.map((item, index) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;

            const finalPrice = product.has_discount
              ? Math.round(product.base_price * (1 - product.discount_percent / 100))
              : product.base_price;

            const isLiked = wishlistItems.includes(product.id);

            const currentVariant = product.variants.find(v => v.size === item.size && v.color_hex === item.color);
            const maxStock = currentVariant ? currentVariant.stock_quantity : 0;

            return (
              <div key={index} className="flex gap-4 md:gap-6 border-b border-gray-200 pb-6 relative">
                <div className="w-24 md:w-32 flex-shrink-0 bg-gray-50">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]?.image || product.images[0] || '/placeholder.jpg'} alt={product.name} className="w-full h-auto object-cover" />
                  </Link>
                </div>

                {/* Product Information */}
                <div className="flex flex-col flex-grow justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${product.id}`} className="font-medium text-gray-900 hover:underline">
                        {product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 capitalize">Колір: {getTranslatedColorName(item.color)}</p>
                      <p className="text-sm text-gray-500">Розмір: {item.size}</p>
                    </div>

                    {/* "Wishlist" and "Remove" Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-4 text-gray-400">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="group flex items-center justify-center transition-colors"
                      >
                        <FiHeart
                          className={`text-2xl transition-all duration-300 ${isLiked
                              ? 'fill-red-500 text-red-500 scale-125'
                              : 'text-gray-400 group-hover:scale-110 group-hover:text-red-500'
                            }`}
                        />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="flex items-center gap-1 hover:text-green-600 hover:underline transition-all"
                      >
                        <FiTrash2 className="text-xl" />
                        <span className="text-sm font-medium text-black hover:text-green-600">Видалити</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    {/* QUANTITY TRIGGERS (+ / -) */}
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 font-medium text-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300 font-medium text-sm w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className={`px-3 py-1 font-medium text-lg transition-colors ${item.quantity >= maxStock
                            ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'hover:bg-gray-100 text-black'
                          }`}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      {product.has_discount && (
                        <span className="text-sm text-gray-400 line-through mb-0.5 leading-none">
                          {product.base_price} {currency}
                        </span>
                      )}
                      <span className="font-bold text-lg text-black leading-none">{finalPrice} {currency}</span>
                    </div>
                  </div>

                  {/* "Wishlist" and "Remove" Buttons (Mobile) */}
                  <div className="flex md:hidden items-center gap-4 text-gray-400 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="group flex items-center justify-center transition-colors"
                    >
                      <FiHeart
                        className={`text-2xl transition-all duration-300 ${isLiked
                            ? 'fill-red-500 text-red-500 scale-125'
                            : 'text-gray-400 group-hover:scale-110 group-hover:text-red-500'
                          }`}
                      />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="flex items-center gap-1 hover:text-green-600 hover:underline transition-all"
                    >
                      <FiTrash2 className="text-lg" />
                      <span className="text-sm font-medium text-black hover:text-green-600">Видалити</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: PAYMENT AND SUBTOTAL */}
        <div className="lg:w-1/3">
          <div className="bg-[#f9f9f9] p-6 rounded-sm sticky top-[100px]">
            <h2 className="text-xl font-medium mb-6">Підсумок</h2>
            <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-md flex items-start gap-2">
              {deliveryFee === 0
                ? <span>Супер! Доставка вашого замовлення <strong>безкоштовна</strong>.</span>
                : <span>Додайте товарів ще на <strong>{3000 - subtotal} {currency}</strong> для безкоштовної доставки!</span>
              }
            </div>

            <div className="flex justify-between mb-3 text-[15px]">
              <span className="text-gray-600">Ціна товарів</span>
              <span className="font-medium">{subtotal} {currency}</span>
            </div>

            <div className="flex justify-between mb-6 text-[15px]">
              <span className="text-gray-600">Доставка</span>
              <span className="font-medium">{deliveryFee === 0 ? 'Безкоштовно' : `${deliveryFee} ${currency}`}</span>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-8 flex justify-between items-end">
              <span className="text-[17px] font-medium">Загальна сума з ПДВ</span>
              <span className="text-2xl font-black">{finalTotal} {currency}</span>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="mb-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="upon_receipt"
                  checked={paymentMethod === 'upon_receipt'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">Оплата при отриманні на пошті</span>
              </label>

              {/* <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="pay_now"
                  checked={paymentMethod === 'pay_now'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">Оплатити зараз (Картою онлайн)</span>
              </label> */}
            </div>

            <Link
              to="/checkout"
              className="w-full block text-center bg-[#1A1A1A] hover:bg-black text-white font-bold py-4 rounded-sm transition-colors text-[15px]"
            > Перейти до оформлення
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-white pb-20">
        <RecommendedSlider isHomePage={true} />
      </div>
    </div>
  )
}

export default Cart
