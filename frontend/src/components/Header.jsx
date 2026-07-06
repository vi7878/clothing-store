import { useContext, useState } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiX, FiPackage, FiLogOut, FiMenu, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import wLogoImg from '../assets/logo/W_logo.png';
import { mobileMenuItems } from '../data/menuData';
import MobileNav from './MobileNav';

const Header = () => {
  const { getCartCount, getWishlistCount } = useContext(ShopContext);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const scrollDirection = useScrollDirection();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!user;
  const userName = user ? `${user.first_name || user.firstName} ${user.last_name || user.lastName || ''}`.trim() || "Користувач" : "Користувач";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#0B0035] font-bold"
      : "text-[#0B0035] font-bold hover:opacity-70 transition-opacity";

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-300 ease-in-out ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}>
        <div className="max-w-[1700px] mx-auto px-4 md:px-10">
          <div className="flex justify-between items-center py-4 gap-2 md:gap-4">

            <button className="md:hidden text-[#0B0035]" onClick={() => setMobileMenuOpen(true)}>
              <FiMenu className="text-[28px]" />
            </button>

            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                <img src={wLogoImg} alt="W Logo" className="w-8 h-8 md:w-10 md:h-10" />
                <span className="font-black text-xl md:text-2xl tracking-widest text-[#0B0035] uppercase">
                  Wearhouse
                </span>
              </Link>
            </div>

            {/* SEARCH BAR*/}
            <div className="hidden md:flex flex-1 justify-end pr-8">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                <div className="relative flex items-center w-full h-11 rounded-full border-[2px] border-[#0B0035] bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#0B0035]/20">
                  <button type="submit" className="grid place-items-center h-full w-14 text-[#0B0035]">
                    <FiSearch className="text-[22px] stroke-[2.5]" />
                  </button>
                  <input
                    className="peer h-full w-full outline-none text-[15px] text-[#0B0035] pr-10 bg-transparent placeholder-[#0B0035] font-semibold"
                    type="text"
                    placeholder="Пошук"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
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
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 text-[#0B0035]">

              {/* User */}
              <div className="relative group cursor-pointer items-center h-full pb-2 pt-2 -mb-2 -mt-2">
                <Link to={isAuthenticated ? '/account' : '/login'} className="animated-icon-link">
                  {isAuthenticated ? (
                    <HiOutlineUserCircle className="text-[34px] stroke-[2]" />
                  ) : (
                    <FiUser className="text-[28px] stroke-[2.5]" />
                  )}
                </Link>

                <div className="hidden md:block absolute right-[-20px] top-[55px] w-[320px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-md overflow-hidden">
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
                        <Link to="/account?tab=orders" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black">
                          <FiPackage className="text-xl stroke-[2]" />
                          <span className="text-[15px]">Мої замовлення</span>
                        </Link>
                        <Link to="/account?tab=profile" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black">
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
        <div className="max-w-[1700px] mx-auto px-4 md:px-10">
          <div className="w-full h-px bg-gray-200"></div>
        </div>

       <div className="md:hidden w-full px-4 pt-2 pb-3">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative flex items-center w-full h-11 rounded-full border-[2px] border-[#0B0035] bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#0B0035]/20">
                  <button type="submit" className="grid place-items-center h-full w-14 text-[#0B0035]">
                    <FiSearch className="text-[22px] stroke-[2.5]" />
                  </button>
                  <input
                    className="peer h-full w-full outline-none text-[15px] text-[#0B0035] pr-10 bg-transparent placeholder-[#0B0035] font-semibold"
                    type="text"
                    placeholder="Пошук"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
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

        {/* NAVIGATION TABS */}
        <nav className="hidden md:block w-full">
          <div className="max-w-7xl mx-auto px-8">
            <ul className="flex justify-start md:justify-center items-center gap-6 md:gap-12 py-4 md:py-5 text-[13px] md:text-[15px] uppercase tracking-wide overflow-x-auto whitespace-nowrap hide-scrollbar px-4 md:px-0">
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

      <div className="h-[110px] md:h-[140px] w-full"></div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />

          {/* Drawer*/}
          <div className="mobile-drawer relative z-10 w-[300px] h-full bg-white flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 transition-opacity hover:opacity-80">
                <img src={wLogoImg} alt="W Logo" className="w-7 h-7" />
                <span className="text-[22px] font-bold text-[#0B0035] tracking-widest uppercase mt-1">
                  WEARHOUSE
                </span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <FiX className="text-2xl text-[#0B0035]" />
              </button>
            </div>

            {/* Search*/}
            <div className="p-4 border-b">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative flex items-center w-full h-11 rounded-full border-[2px] border-[#0B0035] bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#0B0035]/20">
                  <button type="submit" className="grid place-items-center h-full w-14 text-[#0B0035]">
                    <FiSearch className="text-[22px] stroke-[2.5]" />
                  </button>
                  <input
                    className="peer h-full w-full outline-none text-[15px] text-[#0B0035] pr-10 bg-transparent placeholder-[#0B0035] font-semibold"
                    type="text"
                    placeholder="Пошук"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
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

            {/* Nav*/}
            <MobileNav setMobileMenuOpen={setMobileMenuOpen} />

            {/* Bottom*/}
            <div className="p-4 border-t">
              {isAuthenticated ? (
                <>
                  <p className="font-bold text-[#0B0035] mb-3">{userName}</p>
                  <Link to="/account?tab=orders" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-gray-700">
                    <FiPackage /> Мої замовлення
                  </Link>
                  <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-gray-700">
                    <FiHeart /> Улюблене ({getWishlistCount()})
                  </Link>
                  <Link to="/cart" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-gray-700">
                    <FiShoppingCart /> Кошик ({getCartCount()})
                  </Link>
                  <button onClick={() => { logout(); navigate('/'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 py-2 text-red-600 mt-2">
                    <FiLogOut /> Вийти
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="bg-[#0B0035] text-white text-center py-3 font-bold">
                    Увійти
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                    className="border-2 border-[#0B0035] text-[#0B0035] text-center py-3 font-bold">
                    Зареєструватись
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
