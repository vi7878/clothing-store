import { useState, useContext } from 'react';
import { FiHeart, FiShoppingBag, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { productsData } from '../data/products';
import { createPortal } from 'react-dom';

const ProductCard = ({ product }) => {
  const { addToCart, wishlistItems, toggleWishlist, products: apiProducts } = useContext(ShopContext);
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

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

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

  const mockProduct = productsData.find(p => p.sku === product.sku || p.id === product.id) || {};

  const basePrice = Number(product.base_price || product.price || mockProduct.price || mockProduct.base_price || 0);
  const apiDiscountPrice = Number(product.discount_price || mockProduct.discount_price || 0);
  const discountPercent = Number(product.discount_percent || mockProduct.discount_percent || 0);

  const hasDiscount =
    product.has_discount === true ||
    product.has_discount === 'true' ||
    mockProduct.has_discount === true ||
    mockProduct.discount === true ||
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

  const productRating = Number(
    (product.average_rating > 0) ? product.average_rating : (product.rating || mockProduct.rating || 0)
  );

  const apiProduct = apiProducts?.find(p => p.id === product.id) || {};
  const productSku = product.sku || product.article || apiProduct.sku || mockProduct.sku || product.id || 'N/A';

  const collections = product.collections || mockProduct.collections || (product.tags ? product.tags.map(t => typeof t === 'object' ? t.name : t) : []);

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
      className="w-full relative group flex flex-col transition-transform duration-300 hover:-translate-y-1"
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

        {collections && collections.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
            {collections.map((collection) => (
              <span
                key={collection}
                className={`text-[8px] md:text-[10px] font-bold uppercase px-1.5 py-0.5 md:px-2 md:py-1 tracking-wider text-white shadow-sm ${collection === 'new' ? 'bg-orange-500' :
                  collection === 'summer' ? 'bg-indigo-300' : 'bg-gray-500'
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

        <div
          className="md:hidden absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-white/90 p-2.5 rounded-full shadow-md text-[#0B0035] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMobileModalOpen(true);
          }}
        >
          <FiShoppingBag size={20} />
        </div>

        <div className={`hidden md:flex absolute inset-0 z-10 bg-black/40 flex-col justify-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
      </Link>

      <div className="bg-[#fafafa] p-1 flex flex-col mt-2">
        <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase leading-none select-text cursor-text truncate title-ellipsis">
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

      {isMobileModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:hidden">
          <div
            className="absolute inset-0 bg-black/60 transition-opacity"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileModalOpen(false); }}
          />

          <div
            className="relative bg-white w-full rounded-t-3xl p-6 pb-8 animate-[fadeInUp_0.3s_ease_both] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileModalOpen(false); }}
              className="absolute top-5 right-5 text-[#0B0035] p-1"
            >
              <FiX size={26} />
            </button>

            <div className="flex gap-4 mb-5 pr-8">
              <img src={mainImg} alt="product" className="w-20 h-24 object-cover rounded-md shadow-sm" />
              <div className="flex flex-col justify-center pt-1">
                <h3 className="font-bold text-base text-[#0B0035] leading-tight mb-2">{product.name || product.title}</h3>
                <p className="font-bold text-[#B2412E] text-lg">{finalPrice} UAH</p>
              </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {showError && <p className="text-red-500 text-xs font-bold mb-3 text-center">БУДЬ ЛАСКА, ОБЕРІТЬ РОЗМІР ТА КОЛІР!</p>}

            <div className="mb-6">
              <p className="text-[12px] font-bold uppercase mb-4 text-gray-500 tracking-widest">Оберіть розмір</p>
              <div className="flex flex-wrap gap-3">
                {uniqueSizes.map(size => {
                  const isAvailable = isSizeAvailable(size);
                  return (
                    <button
                      key={size}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (isAvailable) handleSizeSelect(size, e); }}
                      disabled={!isAvailable}
                      className={`relative w-11 h-11 border flex items-center justify-center text-sm font-bold transition-all ${
                        selectedSize === size
                          ? 'border-[#0B0035] text-[#0B0035] bg-gray-50 ring-1 ring-[#0B0035]'
                          : isAvailable
                            ? 'border-gray-300 text-gray-700 hover:border-gray-400'
                            : 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'
                      }`}
                    >
                      {size}
                      {!isAvailable && <div className="absolute top-1/2 left-1/2 w-[120%] h-[1.5px] bg-red-500/60 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[12px] font-bold uppercase mb-4 text-gray-500 tracking-widest">Оберіть колір</p>
              <div className="flex flex-wrap gap-4">
                {uniqueColors.map((color, index) => {
                  const isAvailable = isColorAvailable(color.hex);
                  return (
                    <button
                      key={index}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (isAvailable) handleColorSelect(color.hex, e); }}
                      disabled={!isAvailable}
                      className={`relative w-10 h-10 rounded-full border border-gray-300 transition-all shadow-sm ${
                        selectedColor === color.hex ? 'ring-2 ring-[#0B0035] ring-offset-2' : ''
                      } ${!isAvailable ? 'opacity-30' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {!isAvailable && <div className="absolute top-1/2 left-1/2 w-[120%] h-[1px] bg-red-500 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={(e) => {
                  handleQuickBuy(e);
                  if (selectedSize && selectedColor) setIsMobileModalOpen(false);
                }}
                className="w-full bg-[#B2412E] text-white font-bold py-4 active:scale-95 transition-transform uppercase text-[14px] tracking-widest shadow-md"
              >
                Швидка покупка
              </button>

              <Link
                to={`/product/${product.id}`}
                className="w-full border-2 border-[#0B0035] text-[#0B0035] flex items-center justify-center font-bold py-3.5 active:scale-95 transition-transform uppercase text-[13px] tracking-widest"
              >
                Перейти до товару
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}

export default ProductCard;
