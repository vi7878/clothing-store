import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { productsData } from '../data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState('women');

  const filteredProducts = productsData.filter(product => product.gender === activeTab);

  return (
    <div className="max-w-[1700px] mx-auto w-full px-10 mt-10 relative group overflow-hidden">
      <h2 className="text-[30px] md:text-[40px] font-black text-black mb-6 tracking-tight">
        НОВІ НАДХОДЖЕННЯ
      </h2>

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
        > Чоловіки
        </button>
      </div>

      <div className="relative">
        <button className="custom-prev absolute left-2 md:left-4 top-[40%] -translate-y-1/2 z-20 flex items-center 
        justify-center w-10 h-10 bg-white text-black rounded-full shadow-md hover:bg-gray-100 
        transition-colors cursor-pointer disabled:hidden">
          <FiChevronLeft className="text-2xl" />
        </button>

        {/* SWIPER*/}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.custom-prev', 
            nextEl: '.custom-next', 
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          className="pb-10"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-next absolute right-2 md:right-4 top-[40%] -translate-y-1/2 z-20 flex items-center justify-center 
        w-10 h-10 bg-white text-black rounded-full shadow-md hover:bg-gray-100 
        transition-colors cursor-pointer disabled:hidden">
          <FiChevronRight className="text-2xl" />
        </button>    
      </div>
    </div>
  )
}

export default NewArrivals