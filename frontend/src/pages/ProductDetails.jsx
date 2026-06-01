import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiHeart, FiChevronRight, FiChevronLeft, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { TbShoppingBagPlus } from 'react-icons/tb';
import RecommendedSlider from '../components/RecommendedSlider';
import { colorOptions } from '../data/colors';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const product = products?.find((p) => String(p.id) === String(id));

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMainImage(product.images[0]);
    }
    setSelectedSize('');
    setSelectedColor('');
    setIsWishlisted(false);
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-medium">Завантаження товару...</div>;
  }

  const finalPrice = product.has_discount
    ? Math.round(product.base_price * (1 - product.discount_percent / 100))
    : product.base_price;

  const allSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const uniqueColors = [];
  const seenHexes = new Set();
  product.variants?.forEach(variant => {
    if (!seenHexes.has(variant.color_hex)) {
      seenHexes.add(variant.color_hex);
      uniqueColors.push({ name: variant.color_name, hex: variant.color_hex });
    }
  });

  const isSizeAvailable = (size) => {
    return product.variants?.some(v => v.size === size && v.stock_quantity > 0);
  };

  const isColorAvailable = (hex) => {
    return product.variants?.some(v => v.color_hex === hex && v.stock_quantity > 0);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Будь ласка, оберіть розмір та колір!");
      return;
    }
    addToCart(product.id, selectedSize, selectedColor);
  };

  const getTranslatedColorName = (hex) => {
    if (!hex) return 'оберіть колір';
    const variantColor = uniqueColors.find(c => c.hex.toLowerCase() === hex.toLowerCase());
    if (variantColor) {
      const translated = colorOptions.find(c => c.id.toLowerCase() === variantColor.name.toLowerCase());
      return translated ? translated.label : variantColor.name;
    }
    return hex;
  };

  const handlePrevImage = () => {
    const currentIndex = product.images.indexOf(mainImage);
    const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
    setMainImage(product.images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = product.images.indexOf(mainImage);
    const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
    setMainImage(product.images[nextIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">

      {/* BREADCRUMBS */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-wide">
        <Link to="/" className="hover:text-black transition-colors">Головна</Link>
        <span>/</span>
        <Link to={`/catalog/${product.gender}`} className="hover:text-black transition-colors">
          {product.gender}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.category}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* LEFT COLUMN: IMAGE GALLERY */}
        <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-3/5">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar">
            {product.images.map((imgSrc, index) => (
              <img
                key={index}
                onClick={() => setMainImage(imgSrc)}
                src={imgSrc}
                alt={`${product.name} thumbnail ${index}`}
                className={`w-20 h-[100px] object-cover cursor-pointer border-2 transition-all flex-shrink-0 ${
                  mainImage === imgSrc ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 bg-gray-50 flex items-center justify-center relative group">
            {product.has_discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 uppercase z-10">
                -{product.discount_percent}%
              </div>
            )}

            {product.images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#eaf0f6] rounded-full flex items-center justify-center shadow-md hover:bg-[#d5e0eb] transition-colors z-10"
              >
                <FiChevronLeft className="text-2xl text-black pr-0.5" />
              </button>
            )}

            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto max-h-[700px] object-contain transition-opacity duration-300"
            />

            {product.images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#eaf0f6] rounded-full flex items-center justify-center shadow-md hover:bg-[#d5e0eb] transition-colors z-10"
              >
                <FiChevronRight className="text-2xl text-black pl-0.5" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT INFO */}
        <div className="lg:w-2/5 flex flex-col pt-4">

          <h1 className="text-2xl md:text-3xl font-medium mb-3 text-gray-900 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl font-medium text-black">
              {finalPrice} {currency || 'UAH'}
            </span>
            {product.has_discount && (
              <span className="text-lg text-gray-400 line-through">
                {product.base_price} {currency || 'UAH'}
              </span>
            )}
          </div>

          {/* COLOR SELECTOR */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">
              Колір - <span className="font-medium text-black capitalize">{getTranslatedColorName(selectedColor)}</span>
            </p>
            <div className="flex gap-2">
              {uniqueColors.map((color, index) => {
                const isAvailable = isColorAvailable(color.hex);
                return (
                  <button
                    key={index}
                    onClick={() => isAvailable && setSelectedColor(color.hex)}
                    disabled={!isAvailable}
                    className={`w-10 h-10 border-2 flex items-center justify-center p-0.5 relative overflow-hidden ${
                      selectedColor === color.hex ? 'border-black' : 'border-transparent hover:border-gray-300'
                    } ${!isAvailable ? 'cursor-not-allowed opacity-50' : ''}`}
                    title={color.name}
                  >
                    <div
                      className="w-full h-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    ></div>

                    {!isAvailable && (
                      <div className="absolute top-1/2 left-1/2 w-[150%] h-[2px] bg-red-500 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-10"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Оберіть розмір</p>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {allSizes.map((size) => {
                const isAvailable = isSizeAvailable(size);
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`py-3 text-sm font-medium border transition-colors relative overflow-hidden ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : isAvailable
                          ? 'border-gray-300 text-gray-900 hover:border-black'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                    }`}
                  >
                    {size}

                    {!isAvailable && (
                      <div className="absolute top-1/2 left-1/2 w-[150%] h-[1.5px] bg-red-500 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white font-bold py-3.5 px-6 flex items-center justify-center gap-2 border-2 border-black hover:border-[#B2412E] hover:bg-[#0B0035] transition-all duration-300 uppercase text-sm"
            >
              <TbShoppingBagPlus className="text-xl"/>
              Додати у кошик
            </button>

            {/* КНОПКА WISHLIST З РОЖЕВИМ СЕРДЕЧКОМ */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-14 border-2 border-black flex items-center justify-center bg-white group hover:bg-[#eaf0f6] hover:border-[#B2412E] transition-all duration-300"
            >
              <FiHeart
                className={`text-2xl transition-all duration-300 ${
                  isWishlisted
                    ? 'fill-red-500 text-red-500 scale-125'
                    : 'text-black group-hover:text-black'
                }`}
              />
            </button>
          </div>

          {/* DESCRIPTION ACCORDION */}
          <div className="mt-8 border border-gray-300">
            <button
              onClick={() => setIsDescOpen(!isDescOpen)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-bold uppercase text-sm tracking-wider">Опис</span>
              {isDescOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {isDescOpen && (
              <div className="p-4 text-sm text-gray-600 bg-gray-50 border-t border-gray-300">
                <p className="mb-2">ID: {product.id}</p>
                <p className="mb-4">{product.description}</p>
                <p><strong>Колекція:</strong> {product.collections?.join(', ') || '-'}</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <RecommendedSlider currentProduct={product} />

    </div>
  )
}

export default ProductDetails;
