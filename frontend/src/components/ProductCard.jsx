import { useState, useContext } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, wishlistItems, toggleWishlist } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const uniqueSizes = [...new Set(product.variants?.map(variant => variant.size) || [])];
  const uniqueColors = [];
  const seenHexes = new Set();
  product.variants?.forEach(variant => {
    if (!seenHexes.has(variant.color_hex)) {
      seenHexes.add(variant.color_hex);
      uniqueColors.push({ name: variant.color_name, hex: variant.color_hex });
    }
  });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(uniqueColors.length > 0 ? uniqueColors[0].hex : null);
  const [showError, setShowError] = useState(false);

  const isSizeAvailable = (size) => {
    if (selectedColor) {
      return product.variants?.some(v => v.size === size && v.color_hex === selectedColor && v.stock_quantity > 0);
    }
    return product.variants?.some(v => v.size === size && v.stock_quantity > 0);
  };

  const isColorAvailable = (hex) => {
    if (selectedSize) {
      return product.variants?.some(v => v.color_hex === hex && v.size === selectedSize && v.stock_quantity > 0);
    }
    return product.variants?.some(v => v.color_hex === hex && v.stock_quantity > 0);
  };

  const isWishlisted = wishlistItems.includes(product.id);

const basePrice = Number(product.base_price || product.price || 0);
  const apiDiscountPrice = Number(product.discount_price || 0);
  const discountPercent = Number(product.discount_percent || 0);
  
  const hasDiscount = 
    product.has_discount === true || 
    product.has_discount === 'true' || 
    (apiDiscountPrice > 0 && apiDiscountPrice < basePrice) || 
    discountPercent > 0;
    
  let finalPrice = basePrice;
  if (hasDiscount) {
    if (apiDiscountPrice > 0) {
      finalPrice = apiDiscountPrice;
    } else {
      const pct = discountPercent > 0 ? discountPercent : 20; 
      finalPrice = Math.round(basePrice * (1 - pct / 100));
    }
  }

  const productRating = Number(product.rating || product.average_rating || 0);
  const productSku = product.sku || product.article || product.id || 'N/A';

  // Helper for images (API object vs static string)
  const getProductImage = (index) => {
    if (!product.images || product.images.length === 0) return '/placeholder.jpg';
    const img = product.images[index] || product.images[0];
    return typeof img === 'object' ? img.image : img;
  };

  const mainImg = getProductImage(0);
  const hoverImg = getProductImage(1);

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
    if (!user) {
      toast.error('Увійдіть в акаунт, щоб додати товар до улюблених');
      return;
    }
    toggleWishlist(product.id);
  };

  return (
<div
      className="w-full relative group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="relative aspect-[3/4] w-full overflow-hidden block cursor-pointer"
      >
        <img
          src={isHovered ? hoverImg : mainImg}
          alt={product.name || product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {product.collections && product.collections.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
            {product.collections.map((collection) => (
              <span
                key={collection}
                className={`text-[10px] font-bold uppercase px-2 py-1 tracking-wider text-white shadow-sm ${collection === 'new' ? 'bg-orange-500' :
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

        <div
          className="absolute top-4 right-4 z-20 cursor-pointer group/heart"
          onClick={handleToggleWishlist} 
        >
          <FiHeart
            className={`text-2xl drop-shadow-md transition-all duration-300 ${isWishlisted
              ? 'fill-red-500 text-red-500 scale-125'
              : 'text-white group-hover/heart:scale-110'
              }`}
          />
        </div>

        {isHovered && (
          <div className="absolute inset-0 z-10 bg-black/40 flex flex-col justify-end p-4 transition-opacity duration-300">
            {showError && (
              <p className="text-red-500 text-xs font-bold mb-2 drop-shadow-md">ОБЕРІТЬ РОЗМІР ТА КОЛІР!</p>
            )}

            <div className="flex justify-center gap-1 mb-4">
              {uniqueSizes.map((size) => {
                const isAvailable = isSizeAvailable(size);
                return (
                  <button
                    key={size}
                    onClick={(e) => isAvailable && handleSizeSelect(size, e)}
                    disabled={!isAvailable}
                    className={`relative border text-sm px-2 py-1 transition-colors overflow-hidden ${selectedSize === size
                      ? 'bg-[#B2412E] border-[#B2412E] text-white'
                      : isAvailable
                        ? 'border-white text-white hover:bg-white/20'
                        : 'border-white/30 text-white/30 cursor-not-allowed'
                      }`}
                  >
                    {size}
                    {!isAvailable && (
                      <div className="absolute top-1/2 left-1/2 w-[150%] h-[1px] bg-red-500/60 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 mb-4">
              {uniqueColors.map((color, index) => {
                const isAvailable = isColorAvailable(color.hex);
                return (
                  <button
                    key={index}
                    onClick={(e) => isAvailable && handleColorSelect(color.hex, e)}
                    disabled={!isAvailable}
                    className={`relative w-4 h-4 rounded-full border border-gray-100 transition-all ${selectedColor === color.hex
                      ? 'ring-2 ring-white ring-offset-1 ring-offset-black/40'
                      : ''
                      } ${!isAvailable ? 'opacity-20 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {!isAvailable && (
                      <div className="absolute top-1/2 left-1/2 w-[150%] h-[1px] bg-red-500 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleQuickBuy}
              className="w-full bg-[#f3f3f3] text-black font-bold py-2 hover:bg-[#0B0035] hover:text-white transition-colors duration-300" 
            >
              Швидка покупка
            </button>
          </div>
        )}
      </Link>

        <div className="bg-[#fafafa] p-1 flex flex-col mt-2">
        <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase leading-none select-text cursor-text">
          {product.name || product.title}
        </h3>
        
        <p className="text-[11px] text-gray-400 mb-0.5 mt-1 tracking-wide uppercase">
          Артикул: {productSku}
        </p>

        <div className="flex text-yellow-400 text-base leading-none mb-1.5 mt-1.5">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < Math.round(productRating) ? '★' : '☆'}</span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <p className="font-bold text-[#0B0035] leading-none">{finalPrice} UAH</p>
          {hasDiscount && (
            <p className="text-red-600 text-[13px] line-through leading-none">{basePrice} UAH</p>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default ProductCard;