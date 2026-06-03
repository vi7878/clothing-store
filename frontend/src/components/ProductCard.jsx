import { useState, useContext } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { addToCart, wishlistItems, toggleWishlist } = useContext(ShopContext);

  const uniqueSizes = [...new Set(product.variants.map(variant => variant.size))];
  const uniqueColors = [];
  const seenHexes = new Set();
  product.variants.forEach(variant => {
    if (!seenHexes.has(variant.color_hex)) {
      seenHexes.add(variant.color_hex);
      uniqueColors.push({ name: variant.color_name, hex: variant.color_hex });
    }
  });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(uniqueColors.length > 0 ? uniqueColors[0].hex : null);
  const [showError, setShowError] = useState(false);

  const isWishlisted = wishlistItems.includes(product.id);
  // calculate discounted price
  const finalPrice = product.has_discount
    ? Math.round(product.base_price * (1 - product.discount_percent / 100))
    : product.base_price;

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSelectedSize(null);
    setSelectedColor(uniqueColors.length > 0 ? uniqueColors[0].hex : null);
    setShowError(false);
  };

  // "Quick Buy" button logic
  const handleQuickBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize || !selectedColor) {
      setShowError(true);
    } else {
      setShowError(false);
      addToCart(product.id, selectedSize, selectedColor);
    }
  };

  const handleSizeSelect = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    setShowError(false);
  };

  const handleColorSelect = (hex, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(hex);
    setShowError(false);
  };
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="w-full relative cursor-pointer group flex flex-col "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={isHovered ? product.images[1] : product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {product.collections && product.collections.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
            {product.collections.map((collection) => (
              <span
                key={collection}
                className={`text-[10px] font-bold uppercase px-2 py-1 tracking-wider text-white shadow-sm ${
                  collection === 'new' ? 'bg-orange-500' :
                  collection === 'summer' ? 'bg-indigo-300' :
                  'bg-gray-500'
                }`}
              >
                {collection === 'new' ? 'Новинка' :
                 collection === 'summer' ? 'Літо' :
                 collection}
              </span>
            ))}
          </div>
        )}

        {/* WISHLIST HEART */}
        <div
          className="absolute top-4 right-4 z-20 cursor-pointer group/heart"
          onClick={handleToggleWishlist} >
          <FiHeart
            className={`text-2xl drop-shadow-md transition-all duration-300 ${
              isWishlisted
                ? 'fill-red-500 text-red-500 scale-125'
                : 'text-white group-hover/heart:scale-110'
            }`}
          />
        </div>

        {/* HOVER MENU */}
        {isHovered && (
          <div className="absolute inset-0 z-10 bg-black/40 flex flex-col justify-end p-4 transition-opacity duration-300">

            {showError && (
              <p className="text-red-500 text-xs font-bold mb-2 drop-shadow-md">ОБЕРІТЬ РОЗМІР ТА КОЛІР!</p>
            )}

            <div className="flex justify-center gap-1 mb-4">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeSelect(size, e)}
                  className={`border border-white text-white text-sm px-2 py-1 transition-colors ${
                    selectedSize === size ? 'bg-[#B2412E] border-[#B2412E]' : 'hover:bg-white/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              {uniqueColors.map((color, index) => (
                <button
                  key={index}
                  onClick={(e) => handleColorSelect(color.hex, e)}
                  className={`w-4 h-4 rounded-full border border-gray-100 transition-all ${
                    selectedColor === color.hex ? 'ring-2 ring-white ring-offset-1 ring-offset-black/40' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>

            <button
              onClick={handleQuickBuy}
              className="w-full bg-[#f3f3f3] text-black font-bold py-2 hover:bg-[#0B0035] hover:text-white transition-colors duration-300" >
              Швидка покупка
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#fafafa] p-1 flex flex-col">
        <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase leading-none mb-1">{product.name}</h3>
        <div className="flex text-yellow-400 text-base leading-none mb-1.5">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.rating ? '★' : '☆'}</span>
          ))}
        </div>

        {/* Display discounted price alongside the original base price */}
        <div className="flex items-center gap-2">
          <p className="font-bold text-[#0B0035] leading-none">{finalPrice} UAH</p>
          {product.has_discount && (
            <p className="text-gray-400 text-xs line-through leading-none">{product.base_price} UAH</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
