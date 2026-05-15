import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [showError, setShowError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSelectedSize(null);
    setSelectedColor(product.colors[0]);
    setShowError(false);
  };

  // "Quick Buy" button logic
  const handleQuickBuy = (e) => {
    e.stopPropagation(); 
    
    if (!selectedSize || !selectedColor) {
      setShowError(true); 
    } else {
      setShowError(false);

    }
  };

  const handleSizeSelect = (size, e) => {
    e.stopPropagation();
    setSelectedSize(size);
    setShowError(false);
  };

  const handleColorSelect = (color, e) => {
    e.stopPropagation();
    setSelectedColor(color);
    setShowError(false);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation(); 
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className="w-full relative cursor-pointer group flex flex-col " 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img 
          src={isHovered ? product.images[1] : product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* WISHLIST HEART */}
        <div 
          className="absolute top-4 right-4 z-10 cursor-pointer"
          onClick={toggleWishlist}
        >
          {isWishlisted ? (
            <AiFillHeart 
              className="text-red-500 text-2xl drop-shadow-md transition-transform duration-300 hover:scale-110" 
            />
          ) : (
            <FiHeart 
              className="text-white text-2xl drop-shadow-md transition-transform duration-300 hover:scale-110" 
            />
          )}
        </div>

        {/* HOVER MENU */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 transition-opacity duration-300">
            
            {showError && (
              <p className="text-red-500 text-xs font-bold mb-2 drop-shadow-md">ОБЕРІТЬ РОЗМІР ТА КОЛІР!</p>
            )}

            <div className="flex justify-center gap-1 mb-4">
              {product.sizes.map((size) => (
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
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={(e) => handleColorSelect(color, e)}
                  className={`w-4 h-4 rounded-full border border-gray-100 transition-all ${
                    selectedColor === color ? 'ring-2 ring-white ring-offset-1 ring-offset-black/40' : ''
                  }`}
                  style={{ backgroundColor: color }}
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
        <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase leading-none mb-1">{product.title}</h3>
        <div className="flex text-yellow-400 text-base leading-none mb-1.5">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.rating ? '★' : '☆'}</span>
          ))}
        </div>
        <p className="font-bold text-[#0B0035] leading-none">{product.price} UAH</p>
      </div>
    </div>
  )
}

export default ProductCard