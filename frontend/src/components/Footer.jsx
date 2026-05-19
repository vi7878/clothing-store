import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiClock, FiMapPin, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0B0035] text-white py-12 mt-20">
      <div className="max-w-[1700px] mx-auto px-10 flex flex-col items-center gap-8 text-center">
        <div className="text-3xl font-black tracking-widest uppercase">
          Wearhouse
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-bold uppercase tracking-wider">
          <Link to="/shop/sale" className="text-[#B2412E] hover:opacity-80 transition-opacity">
            -20% НА ТОВАРИ
          </Link>
          <Link to="/shop/summer" className="text-gray-300 hover:text-white transition-colors">
            SUMMER
          </Link>
          <Link to="/shop/women" className="text-gray-300 hover:text-white transition-colors">
            ЖІНКИ
          </Link>
          <Link to="/shop/men" className="text-gray-300 hover:text-white transition-colors">
            ЧОЛОВІКИ
          </Link>
          <Link to="/shop/new" className="text-gray-300 hover:text-white transition-colors">
            НОВИНКИ
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
            ПРО НАС
          </Link>
        </div>

        {/*Shipping Information*/}
        <div className="flex flex-col items-center gap-2 max-w-2xl mt-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#B2412E]">
            Інформація про доставку
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Безкоштовна доставка замовлень від <span className="text-white font-semibold">3000 UAH</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-10 w-full mt-2">
          <div className="flex items-center justify-center gap-3 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
            <FiPhone className="text-[#B2412E] text-xl flex-shrink-0" />
            <span>+38 (0123) 45-67-89</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
            <FiMail className="text-[#B2412E] text-xl flex-shrink-0" />
            <span>support@wearhouse.com.ua</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-300 text-sm">
            <FiClock className="text-[#B2412E] text-xl flex-shrink-0" />
            <span>Пн-Нд: 9:00 - 19:00</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
            <FiMapPin className="text-[#B2412E] text-xl flex-shrink-0" />
            <span>бул. Шевченка, 00, м. Черкаси</span>
          </div>
        </div>

        <div className="flex gap-6 text-xl text-gray-400 mt-2">
          <a href="#" className="hover:text-white hover:text-[#B2412E] transition-colors"><FiInstagram /></a>
          <a href="#" className="hover:text-white hover:text-[#B2412E] transition-colors"><FiFacebook /></a>
          <a href="#" className="hover:text-white hover:text-[#B2412E] transition-colors"><FiYoutube /></a>
        </div>

        <hr className="w-full border-t border-gray-600/60" />
        <p className="text-gray-500 text-xs tracking-wide">
          © 2026 WEARHOUSE
        </p>

      </div>
    </footer>
  )
}

export default Footer
