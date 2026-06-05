import { useContext, useState } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiX, FiPackage, FiLogOut } from "react-icons/fi";
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import wLogoImg from '../assets/logo/W_logo.png';
import SearchModal from './SearchModal';

const Header = () => {
  const { getCartCount, getWishlistCount } = useContext(ShopContext);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const scrollDirection = useScrollDirection();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const isAuthenticated = !!user;
  const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() || "Користувач" : "Користувач";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchModalOpen(false);
      setSearchQuery('');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchModalOpen(false);
  };
  // <Link to={'/account'} className="animated-icon-link">
  //   <FiUser className="text-[28px] stroke-[2.5]" />
  // </Link>
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#0B0035] font-bold"
      : "text-[#0B0035] font-bold hover:opacity-70 transition-opacity";

  return (
    <>
    <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-300 ease-in-out ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}>
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
              <form onSubmit={handleSearchSubmit} className="w-full max-w-[300px]">
                <div className={`relative flex items-center w-full h-11 rounded-full border-[2px] border-[#0B0035] bg-white overflow-hidden transition-all ${isSearchModalOpen ? 'ring-2 ring-[#0B0035]/20' : ''}`}>
                  <button type="submit" className="grid place-items-center h-full w-14 text-[#0B0035]">
                    <FiSearch className="text-[22px] stroke-[2.5]" />
                  </button>
                  <input
                    className="peer h-full w-full outline-none text-[15px] text-[#0B0035] pr-10 bg-transparent placeholder-[#0B0035] font-semibold"
                    type="text"
                    placeholder="Пошук"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchModalOpen(true)}
                  />
                  {isSearchModalOpen && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B0035] hover:text-red-600 transition-colors"
                    >
                      <FiX className="text-xl stroke-[3]" />
                    </button>
                  )}
                </div>
              </form>
            </div>

          {/* USER, WISHLIST, CART ICONS */}
          <div className="flex items-end gap-6 text-[#0B0035]">

            {/* User */}
          <div className="relative group cursor-pointer flex items-center h-full pb-2 pt-2 -mb-2 -mt-2">
              <Link to={isAuthenticated ? '/account' : '/login'} className="animated-icon-link">
                <FiUser className="text-[28px] stroke-[2.5]" />
              </Link>

              <div className="absolute right-[-20px] top-[55px] w-[320px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-md overflow-hidden">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

                {!isAuthenticated ? (
                  <div>
                    <div className="bg-[#eef6fc] p-6 text-center">
                      <h3 className="font-bold text-[17px] text-[#0B0035] mb-4">Ви зареєстровані?</h3>
                      <Link
                        to="/login"
                        className="block w-full bg-[#0B0035] text-white py-2.5 font-semibold hover:bg-black transition-colors"
                      >
                        Увійти
                      </Link>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-[17px] text-[#0B0035] mb-2">Вперше на сайті?</h3>
                      <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                        Після швидкої реєстрації ви отримаєте доступ до багатьох функцій
                      </p>
                      <Link
                        to="/register"
                        className="block w-full border-2 border-black bg-white text-black py-2.5 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Зареєструватись
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <h3 className="font-bold text-xl mb-4 pl-2 text-[#0B0035]">{userName}</h3>
                    <nav className="flex flex-col space-y-1">
                      <Link to="/account" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black">
                        <FiPackage className="text-xl stroke-[2]" />
                        <span className="text-[15px]">Мої замовлення</span>
                      </Link>
                      <Link to="/account" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black">
                        <FiUser className="text-xl stroke-[2]" />
                        <span className="text-[15px]">Мої дані адреси</span>
                      </Link>
                    </nav>
                    <hr className="my-2 border-gray-100" />
                    <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-2 py-3 w-full text-left hover:bg-gray-50 transition-colors text-gray-700 hover:text-red-600">
                      <FiLogOut className="text-xl stroke-[2]" />
                      <span className="text-[15px]">Вийти</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

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
                SALE: ВІД 10% ДО 20%
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
    <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        query={searchQuery}
      />
    <div className="h-[160px] w-full"></div>
    </>
  );
};

export default Header;
