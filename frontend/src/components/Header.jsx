import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { ShopContext } from '../context/ShopContext';
import wLogoImg from '../assets/logo/W_logo.png'; 

const Header = () => {
  const { user, getCartCount, setShowUserLogin } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const getWishlistCount = () => 0; 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  <Link to={'/account'} className="animated-icon-link">
    <FiUser className="text-[28px] stroke-[2.5]" />
  </Link>

  const navLinkStyle = ({ isActive }) => 
    isActive 
      ? "text-[#0B0035] font-bold" 
      : "text-[#0B0035] font-bold hover:opacity-70 transition-opacity";

  return (
    <header className="w-full bg-white min-w-[1024px]">
      <div className="max-w-[1700px] mx-auto px-10">
        <div className="flex justify-between items-center py-6 gap-6">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link to={'/'} className="flex items-center gap-3">
              <img src={wLogoImg} alt="W" className="h-12 w-auto" />
              <span className="text-[32px] font-bold text-[#0B0035] tracking-widest uppercase mt-1">
                Wearhouse
              </span>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="flex flex-1 justify-end pr-8">
            <form onSubmit={handleSearch} className="w-full max-w-[300px]">
              <div className="relative flex items-center w-full h-11 rounded-full border-[2px] border-[#0B0035] bg-white overflow-hidden">
                <button type="submit" className="grid place-items-center h-full w-14 text-[#0B0035]">
                  <FiSearch className="text-[22px] stroke-[2.5]" />
                </button>
                <input
                  className="peer h-full w-full outline-none text-[15px] text-[#0B0035] pr-4 bg-transparent placeholder-[#0B0035] font-semibold"
                  type="text"
                  placeholder="Пошук"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* USER, WISHLIST, CART ICONS */}
          <div className="flex items-end gap-6 text-[#0B0035]">
            
            {/* User */}
           <Link to={'/account'} className="animated-icon-link">
             <FiUser className="text-[28px] stroke-[2.5]" />
           </Link>

            {/* Wishlist */}
            <Link to={'/wishlist'} className="animated-icon-link">
              <FiHeart className="text-[28px] stroke-[2.5]" />
              <span className="absolute top-[-4px] right-[-6px] bg-[#B2412E] text-white text-[10px] font-bold flex items-center justify-center w-[18px] h-[18px] rounded-full">
                {getWishlistCount()}
              </span>
            </Link>

            {/* Cart */}
            <Link to={'/cart'} className="animated-icon-link">
              <FiShoppingCart className="text-[28px] stroke-[2.5]" />
              <span className="absolute top-[-4px] right-[-6px] bg-[#B2412E] text-white text-[10px] font-bold flex items-center justify-center w-[18px] h-[18px] rounded-full">
                {getCartCount()}
              </span>
            </Link>

          </div>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <div className="max-w-[1700px] mx-auto px-10">
        <div className="w-full h-px bg-gray-200"></div>
      </div>

      {/* NAVIGATION TABS */}
      <nav className="w-full">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex justify-center items-center gap-12 py-5 text-[15px] uppercase tracking-wide">
            <li>
              <NavLink to="/shop/sale" className={({ isActive }) => isActive ? "text-[#B2412E] font-bold" : "text-[#B2412E] font-bold hover:opacity-70 transition-opacity"}>
                -20% на товари
              </NavLink>
            </li>
            <li><NavLink to="/shop/summer" className={navLinkStyle}>Summer</NavLink></li>
            <li><NavLink to="/shop/women" className={navLinkStyle}>Жінки</NavLink></li>
            <li><NavLink to="/shop/men" className={navLinkStyle}>Чоловіки</NavLink></li>
            <li><NavLink to="/shop/new" className={navLinkStyle}>Новинки</NavLink></li>
            <li><NavLink to="/about" className={navLinkStyle}>Про нас</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;