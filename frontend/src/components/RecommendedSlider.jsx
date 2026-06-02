import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { productsData } from '../data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// currentProduct - passed on the product page (to determine gender, category, and exclude the current product)
// isHomePage - passed on the home page (to enable tabs and limit the width)
const RecommendedSlider = ({ currentProduct, isHomePage = false }) => {
  const [activeTab, setActiveTab] = useState('women');

  const gender = isHomePage ? activeTab : (currentProduct?.gender || 'women');
  const category = currentProduct?.category || '';
  const currentId = currentProduct?.id || null;

  const relatedProducts = useMemo(() => {
    if (isHomePage) return [];
    return productsData
      .filter(p => p.gender === gender && p.category === category && p.id !== currentId)
      .slice(0, 10);
  }, [gender, category, currentId, isHomePage]);


  const randomProducts = useMemo(() => {
    return productsData
      .filter(p => p.gender === gender && p.id !== currentId)
      // eslint-disable-next-line react-hooks/purity
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
  }, [gender, currentId]);

  const arrowBtnClass = "absolute top-[40%] -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-[#eaf0f6] text-black rounded-full shadow-sm hover:bg-[#d5e0eb] transition-colors cursor-pointer disabled:hidden";
  const wrapperClass = isHomePage
    ? "max-w-[1700px] mx-auto w-full px-10 mt-20 relative group overflow-hidden"
    : "w-full mt-16 md:mt-24 flex flex-col gap-12 md:gap-20";

  return (
    <div className={wrapperClass}>

      {relatedProducts.length > 0 && !isHomePage && (
        <div className="relative group overflow-hidden">
          <h2 className="text-[22px] md:text-[28px] font-black text-black mb-6 tracking-tight uppercase">
            Також з цієї категорії
          </h2>

          <div className="relative">
            <button className={`related-prev left-2 md:left-4 ${arrowBtnClass}`}>
              <FiChevronLeft className="text-2xl" />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.related-prev',
                nextEl: '.related-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 10 },
                640: { slidesPerView: 2.5, spaceBetween: 10 },
                1024: { slidesPerView: 3.5, spaceBetween: 10 },
                1280: { slidesPerView: 4, spaceBetween: 10 },
              }}
              className="pb-6"
            >
              {relatedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className={`related-next right-2 md:right-4 ${arrowBtnClass}`}>
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      )}

      {randomProducts.length > 0 && (
        <div className="relative group overflow-hidden">
          <h2 className={`${isHomePage ? 'text-[30px] md:text-[40px]' : 'text-[22px] md:text-[28px] uppercase'} font-black text-black mb-6 tracking-tight`}>
            Вони можуть вам сподобатися
          </h2>
          {isHomePage && (
            <div className="flex gap-6 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('women')}
                className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
                  activeTab === 'women' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
                }`}
              > Жінки
              </button>
              <button
                onClick={() => setActiveTab('men')}
                className={`text-[15px] font-bold pb-1.5 animated-icon-link ${
                  activeTab === 'men' ? 'text-black after:scale-x-100' : 'text-gray-400 hover:text-black'
                }`}
              >Чоловіки
              </button>
            </div>
          )}

          <div className="relative">
            <button className={`recommended-prev left-2 md:left-4 ${arrowBtnClass}`}>
              <FiChevronLeft className="text-2xl" />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.recommended-prev',
                nextEl: '.recommended-next',
              }}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 10 },
                640: { slidesPerView: 2.5, spaceBetween: 10 },
                1024: { slidesPerView: 3.5, spaceBetween: 10 },
                1280: { slidesPerView: 4, spaceBetween: 10 },
              }}
              className="pb-6"
            >
              {randomProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className={`recommended-next right-2 md:right-4 ${arrowBtnClass}`}>
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecommendedSlider;
